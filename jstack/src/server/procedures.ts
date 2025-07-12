import { db } from "@/db"
import { j } from "./__internals/j"
import { currentUser } from "@clerk/nextjs/server"
import { HTTPException } from "hono/http-exception"

const authMiddleware = j.middleware(async ({ c, next }) => {               // Ici, on crée un middleware d'authentification qui sera utilisé pour vérifier si l'utilisateur est authentifié avant d'accéder aux routes privées de l'application. Ce middleware est une fonction asynchrone qui prend en paramètre le contexte de la requête (c) et la fonction next() qui permet de passer au middleware ou à la route suivante.
  const authHeader = c.req.header("Authorization")                         // On récupère l'en-tête Authorization de la requête HTTP. Cet en-tête est utilisé pour envoyer des informations d'authentification, comme une clé API ou un jeton d'accès, pour authentifier l'utilisateur.

  if (authHeader) {                                                        // Si l'en-tête Authorization est présent dans la requête HTTP, cela signifie que l'utilisateur utilise une clé API pour s'authentifier.
    const apiKey = authHeader.split(" ")[1] // bearer <API_KEY>            // Ici, on récupère l'en-tête Authorization de la requête HTTP. Cet en-tête contient la clé API de l'utilisateur authentifié. On utilise la méthode split pour séparer le mot "bearer" de la clé API. La clé API est ensuite stockée dans la variable apiKey.

    const user = await db.user.findUnique({
      where: { apiKey },
    })

    if (user) return next({ user })                                        // Si l'utilisateur est trouvé dans la base de données avec la clé API, on passe au middleware ou à la route suivante en lui passant l'utilisateur.
  }

  const auth = await currentUser()

  if (!auth) {                                                            // Si l'en-tête Authorization n'est pas présent dans la requête HTTP, on utilise Clerk pour vérifier si l'utilisateur est authentifié. currentUser() est une fonction de Clerk qui permet de récupérer les informations de l'utilisateur authentifié.
    throw new HTTPException(401, { message: "Unauthorized" })              // Si l'utilisateur n'est pas authentifié, on lance une exception HTTP 401 (Unauthorized) avec un message d'erreur.
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })             // Si l'utilisateur n'est pas trouvé dans la base de données avec l'ID externe récupéré par Clerk, on lance une exception HTTP 401 (Unauthorized) avec un message d'erreur.
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