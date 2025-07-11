import { db } from "@/db"
import { j } from "./__internals/j"
import { currentUser } from "@clerk/nextjs/server"
import { HTTPException } from "hono/http-exception"

const authMiddleware = j.middleware(async ({ c, next }) => {               // Ici, on crée un middleware d'authentification qui sera utilisé pour vérifier si l'utilisateur est authentifié avant d'accéder aux routes privées de l'application. Ce middleware est une fonction asynchrone qui prend en paramètre le contexte de la requête (c) et la fonction next() qui permet de passer au middleware ou à la route suivante.
  const authHeader = c.req.header("Authorization")

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1] // bearer <API_KEY>

    const user = await db.user.findUnique({
      where: { apiKey },
    })

    if (user) return next({ user })
  }

  const auth = await currentUser()

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  return next({ user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = publicProcedure.use(authMiddleware)