import { z } from "zod"
import { j, publicProcedure } from "../jstack"

export const participantRouter = j.router({
  // Get participants by game ID
  getByGameId: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const participants = await ctx.prisma.participant.findMany({
        where: { gameId: input.gameId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          voteCount: "desc",
        },
      })
      return c.superjson(participants)
    }),

  // Join a game
  joinGame: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      // Check if the user is already a participant
      const existingParticipant = await ctx.prisma.participant.findUnique({
        where: {
          userId_gameId: {
            userId: input.userId,
            gameId: input.gameId,
          },
        },
      })

      if (existingParticipant) {
        return c.superjson(existingParticipant)
      }

      // Create a new participant
      const participant = await ctx.prisma.participant.create({
        data: {
          userId: input.userId,
          gameId: input.gameId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          game: true,
        },
      })
      return c.superjson(participant)
    }),

  // Update participant's vote status
  updateVoteStatus: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        gameId: z.string(),
        hasVoted: z.boolean(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const participant = await ctx.prisma.participant.update({
        where: {
          userId_gameId: {
            userId: input.userId,
            gameId: input.gameId,
          },
        },
        data: {
          hasVoted: input.hasVoted,
        },
      })
      return c.superjson(participant)
    }),

  // Update participant ranks after voting is complete
  updateRanks: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      // Get all participants for the game with their vote counts
      const participants = await ctx.prisma.participant.findMany({
        where: { gameId: input.gameId },
        orderBy: { voteCount: "desc" },
      })

      const totalParticipants = participants.length
      
      // Calculate thresholds for ranks
      const rankUpdates = participants.map((participant, index) => {
        let rank: "A" | "B" | "C" | "D" | "F" = "F"
        
        // The participant with no votes gets F
        if (participant.voteCount === 0) {
          rank = "F"
        } 
        // A is more than 75% votes
        else if (participant.voteCount >= totalParticipants * 0.75) {
          rank = "A"
        } 
        // B should receive at least 15% votes
        else if (participant.voteCount >= totalParticipants * 0.15) {
          rank = "B"
        } 
        // C should receive at least 5% votes
        else if (participant.voteCount >= totalParticipants * 0.05) {
          rank = "C"
        } 
        // D is everyone else with at least one vote
        else {
          rank = "D"
        }

        return ctx.prisma.participant.update({
          where: { id: participant.id },
          data: { rank },
        })
      })

      // Execute all updates in a transaction
      const updatedParticipants = await ctx.prisma.$transaction(rankUpdates)
      return c.superjson(updatedParticipants)
    }),
}) 