import { currentUser } from "@clerk/nextjs/server"; // Importation de la fonction currentUser pour obtenir l'utilisateur actuel
import { router } from "../__internals/router";
import { privateProcedure, publicProcedure } from "../procedures";
import { db } from "@/db"; // Importation de la base de données
import { stat } from "fs";

export const authRouter = router({               // Ici on crée un routeur pour l'authentification
    getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {  // Cette procédure publique permet de vérifier l'état de synchronisation de la base de données. En effet, elle est accessible sans authentification."c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données.
        const auth = await currentUser()

        if (!auth) {                             // Si l'utilisateur n'est pas authentifié, on retourne une erreur 401
            return c.json({ isSynced: false })
        }

        const user = await db.user.findFirst({  
             where: { externalId: auth.id },        
        })

        if (!user) {                             // Si l'utilisateur n'existe pas dans la base de données, on retourne une erreur 401
            await db.user.create({         // Sinon, on crée un nouvel utilisateur dans la base de données
                data: {
                    quotaLimit: 100,           // On initialise la limite de quota à 1000
                    email: auth.emailAddresses[0].emailAddress, // On utilise le premier email de l'utilisateur
                    externalId: auth.id,       // On utilise l'ID externe de l'utilisateur  
                },
            })

        return c.json({ isSynced: true })   // On retourne un objet JSON avec le statut de succès
    }

        return c.json({ isSynced: true }) // Si l'utilisateur existe, on retourne un objet JSON avec le statut de succès et l'utilisateur
        }),
    })
    