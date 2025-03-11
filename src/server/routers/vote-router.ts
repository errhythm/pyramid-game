import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { Prisma, PrismaClient } from "@prisma/client"


export const voteRouter = j.router({
  // Get votes by game ID
  getByGameId: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const votes = await ctx.prisma.vote.findMany({
        where: { gameId: input.gameId },
        include: {
          fromUser: {
            select: {
              id: true,
              name: true,
            },
          },
          toUser: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      return c.superjson(votes)
    }),

  // Get votes by user ID
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string(), gameId: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const votes = await ctx.prisma.vote.findMany({
        where: {
          fromUserId: input.userId,
          gameId: input.gameId,
        },
        include: {
          toUser: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      return c.superjson(votes)
    }),

  // Cast a vote
  castVote: publicProcedure
    .input(
      z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      // Create the vote in a transaction to ensure atomicity
      const result = await ctx.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Create the vote
        const vote = await tx.vote.create({
          data: {
            fromUserId: input.fromUserId,
            toUserId: input.toUserId,
            gameId: input.gameId,
          },
        })

        // Increment the vote count for the participant
        await tx.participant.update({
          where: {
            userId_gameId: {
              userId: input.toUserId,
              gameId: input.gameId,
            },
          },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        })

        return vote
      })

      return c.superjson(result)
    }),

  // Remove a vote
  removeVote: publicProcedure
    .input(
      z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      // Remove the vote in a transaction to ensure atomicity
      const result = await ctx.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Find the vote
        const vote = await tx.vote.findUnique({
          where: {
            fromUserId_toUserId_gameId: {
              fromUserId: input.fromUserId,
              toUserId: input.toUserId,
              gameId: input.gameId,
            },
          },
        })

        if (!vote) {
          throw new Error("Vote not found")
        }

        // Delete the vote
        await tx.vote.delete({
          where: {
            fromUserId_toUserId_gameId: {
              fromUserId: input.fromUserId,
              toUserId: input.toUserId,
              gameId: input.gameId,
            },
          },
        })

        // Decrement the vote count for the participant
        await tx.participant.update({
          where: {
            userId_gameId: {
              userId: input.toUserId,
              gameId: input.gameId,
            },
          },
          data: {
            voteCount: {
              decrement: 1,
            },
          },
        })

        return vote
      })

      return c.superjson(result)
    }),
}) 