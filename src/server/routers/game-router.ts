import { z } from "zod"
import { j, publicProcedure } from "../jstack"

export const gameRouter = j.router({
  // Get all games
  getAll: publicProcedure.query(async ({ ctx, c }) => {
    const games = await ctx.prisma.game.findMany({
      include: {
        host: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    })
    return c.superjson(games)
  }),

  // Get game by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const game = await ctx.prisma.game.findUnique({
        where: { id: input.id },
        include: {
          host: {
            select: {
              id: true,
              name: true,
            },
          },
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })
      return c.superjson(game)
    }),

  // Get game by secret code
  getBySecretCode: publicProcedure
    .input(z.object({ secretCode: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const game = await ctx.prisma.game.findUnique({
        where: { secretCode: input.secretCode },
        include: {
          host: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      return c.superjson(game)
    }),

  // Create a new game
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        secretCode: z.string().min(4),
        votingTimeLimit: z.number().min(1),
        hostId: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const game = await ctx.prisma.game.create({
        data: {
          title: input.title,
          description: input.description,
          secretCode: input.secretCode,
          votingTimeLimit: input.votingTimeLimit,
          hostId: input.hostId,
          status: "CREATED",
        },
        include: {
          host: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      return c.superjson(game)
    }),

  // Update game status
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["CREATED", "WAITING_FOR_PLAYERS", "VOTING", "COMPLETED"]),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const game = await ctx.prisma.game.update({
        where: { id: input.id },
        data: {
          status: input.status,
          ...(input.status === "VOTING" && { startedAt: new Date() }),
          ...(input.status === "COMPLETED" && { endedAt: new Date() }),
        },
      })
      return c.superjson(game)
    }),
}) 