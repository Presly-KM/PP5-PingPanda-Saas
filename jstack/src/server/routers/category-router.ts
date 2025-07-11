import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";                   

export const categoryRouter = router({                               // Ici on crée un routeur pour les catégories
    getEventCategories: privateProcedure.query(async({ c, ctx}) => { // Ici, on crée une procédure privée qui permet de récupérer les catégories d'événements de l'utilisateur. Cette procédure est accessible uniquement aux utilisateurs authentifiés grâce au middleware d'authentification utilisé dans privateProcedure. "c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données. privateProcedure.query est une méthode de Prisma qui permet de créer une requête pour récupérer des données dans la base de données. Cette méthode est utilisée pour créer des requêtes de type GET, c'est-à-dire des requêtes qui récupèrent des données sans les modifier. Elle prend en paramètre une fonction asynchrone qui reçoit le contexte de la requête et le contexte de l'application. Cette fonction doit retourner un objet JSON contenant les données à renvoyer au client.
       const categories = await db.eventCategory.findMany({         // On utilise la méthode findMany de Prisma pour récupérer toutes les catégories d'événements de l'utilisateur. Cette méthode renvoie un tableau d'objets EventCategory.
        where: {userId: ctx.user.id},                                 // On filtre les catégories d'événements en fonction de l'ID de l'utilisateur authentifié. ctx.user.id est l'ID de l'utilisateur récupéré par le middleware d'authentification.
       })

        return c.json({})
}),
})