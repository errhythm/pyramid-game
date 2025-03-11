import { jstack } from "jstack"
import { prisma } from "../lib/prisma"

interface Env {
  Bindings: {}
}

export const j = jstack.init<Env>()

// Add Prisma to the context
export const createContext = () => {
  return {
    prisma,
  }
}

// Type for the context
export type Context = ReturnType<typeof createContext>

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(({ next }) => {
  const ctx = createContext()
  return next(ctx)
})
