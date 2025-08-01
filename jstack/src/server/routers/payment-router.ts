import { createCheckoutSession } from "@/lib/stripe" // Ici on importe la fonction createCheckoutSession depuis le module stripe. Cette fonction est utilisée pour créer une session de paiement avec Stripe.
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"

export const paymentRouter = router({                // Ici on crée un routeur pour les paiements en utilisant le routeur interne de l'application.
    createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => { 
            const { user } = ctx

            const session = await createCheckoutSession({
                userEmail: user.email,
                userId: user.id,
            })

            return c.json({ url: session.url }) // Ici on retourne une réponse JSON avec une URL fictive pour la session de paiement. Cela doit être remplacé par la logique réelle de création de session de paiement.
        }),
 
        getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
            const { user } = ctx
            return c.json({ plan: user.plan }) // Ici on retourne le plan de l'utilisateur actuel dans une réponse JSON.
        }),

})