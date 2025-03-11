import { z } from "zod"
import { j, publicProcedure } from "../jstack"

export const userRouter = j.router({
  // Get all users
  getAll: publicProcedure.query(async ({ ctx, c }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })
    return c.superjson(users)
  }),

  // Get user by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })
      return c.superjson(user)
    }),

  // Create a new user
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password, // In a real app, you would hash this password
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })
      return c.superjson(user)
    }),
}) 