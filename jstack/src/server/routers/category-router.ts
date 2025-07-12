import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";    
import { startOfMonth } from "date-fns"; // Import de la fonction startOfMonth pour manipuler les dates               

export const categoryRouter = router({                               // Ici on crée un routeur pour les catégories
    getEventCategories: privateProcedure.query(async({ c, ctx}) => { // Ici, on crée une procédure privée qui permet de récupérer les catégories d'événements de l'utilisateur. Cette procédure est accessible uniquement aux utilisateurs authentifiés grâce au middleware d'authentification utilisé dans privateProcedure. "c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données. privateProcedure.query est une méthode de Prisma qui permet de créer une requête pour récupérer des données dans la base de données. Cette méthode est utilisée pour créer des requêtes de type GET, c'est-à-dire des requêtes qui récupèrent des données sans les modifier. Elle prend en paramètre une fonction asynchrone qui reçoit le contexte de la requête et le contexte de l'application. Cette fonction doit retourner un objet JSON contenant les données à renvoyer au client.
       const categories = await db.eventCategory.findMany({         // On utilise la méthode findMany de Prisma pour récupérer toutes les catégories d'événements de l'utilisateur. Cette méthode renvoie un tableau d'objets EventCategory.
        where: {userId: ctx.user.id},                                 // On filtre les catégories d'événements en fonction de l'ID de l'utilisateur authentifié. ctx.user.id est l'ID de l'utilisateur récupéré par le middleware d'authentification.
        select: {
          id: true,                                                   // On sélectionne uniquement les champs id et name des catégories d
            name: true,                                                 // d'événements. Cela permet de ne pas renvoyer des données inutiles au client et d'optimiser les performances de l'application.       
            emoji: true,                                               // On sélectionne également le champ emoji pour afficher l'emoji associé à chaque catégorie.
            color: true,                                               // On sélectionne le champ color pour afficher la couleur associée à chaque catégorie.   
            updatedAt: true,                                         // On sélectionne le champ updatedAt pour afficher la date de dernière mise à jour de chaque catégorie.    
            createdAt: true,                                       // On sélectionne le champ createdAt pour afficher la date de création de chaque catégorie.      
        },
       orderBy: { updatedAt: "desc" },                        // On trie les catégories d'événements par date de dernière mise à jour, de la plus récente à la plus ancienne. Cela permet d'afficher les catégories les plus récentes en premier dans la liste.
    })

     const categoriesWithCounts = await Promise.all(categories.map(async (category) => { // On utilise la méthode map pour parcourir chaque catégorie d'événements et récupérer le nombre d'événements associés à chaque catégorie. On utilise Promise.all pour attendre que toutes les promesses soient résolues avant de renvoyer la réponse au client.
        const now = new Date(); // On récupère la date actuelle pour filtrer les événements futurs.
        const firstDayOfMonth = startOfMonth(now)
       
        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([  // On utilise Promise.all pour exécuter plusieurs requêtes en parallèle et attendre que toutes les promesses soient résolues avant de renvoyer la réponse au client.
            db.event.findMany({
                where: { EventCategory: { id: category.id }, 
                createdAt: { gte: firstDayOfMonth } }, // On filtre les événements en fonction de la catégorie et de la date de création. On récupère uniquement les événements créés à partir du premier jour du mois en cours.
                select: { fields: true }, // On sélectionne tous les champs des événements pour les renvoyer au client. 
                distinct: ["fields"], // On utilise distinct pour ne pas renvoyer les événements en double.     
            })
            .then((events)=> {
                const fieldNames = new Set<string>()
                events.forEach((event) => {
                    Object.keys(event.fields as object).forEach((fieldName) => {
                        fieldNames.add(fieldName)
                    })
                })

                return fieldNames.size // On renvoie le nombre de champs distincts pour chaque catégorie d'événements.  
            }),
               db.event.count({
                where: {
                    EventCategory: { id: category.id }, // On filtre les événements en fonction de la catégorie.
                    createdAt: { gte: firstDayOfMonth }, // On récupère uniquement les événements créés à partir du premier jour du mois en cours.
                },
            }),
            db.event.findFirst({
                where: { EventCategory: { id: category.id } }, // On filtre les événements en fonction de la catégorie.
                orderBy: { createdAt: "desc" }, // On trie les événements par date de création, de la plus récente à la plus ancienne.
                select: { createdAt: true }, // On sélectionne uniquement le champ createdAt pour afficher la date de création du dernier événement.
            }),
            ])

        return {
            ...category, // On renvoie tous les champs de la catégorie d'événements.    
            uniqueFieldCount, // On ajoute le nombre de champs distincts pour chaque catégorie d'événements.
            eventsCount, // On ajoute le nombre d'événements associés à chaque catégorie d'événements.
            lastPing: lastPing?.createdAt || null, // On ajoute la date de création du dernier événement associé à chaque catégorie d'événements. Si aucun événement n'est trouvé, on renvoie null.
        }
    })
    )
        return c.superjson({categories: categoriesWithCounts}) // On renvoie la liste des catégories d'événements avec le nombre d'événements associés à chaque catégorie, le nombre de champs distincts et la date de création du dernier événement. On utilise superjson pour sérialiser les données avant de les renvoyer au client. En effet, superjson permet de sérialiser des données complexes, comme les dates, en JSON, ce qui permet de les envoyer au client sans perdre d'informations. Cela permet également de gérer les types de données de manière plus efficace et de réduire la taille des données envoyées au client. Contrairement à JSON.stringify, superjson gère les types de données complexes comme les dates, les Map, les Set, etc. Cela permet d'envoyer des données plus riches et plus complexes au client sans perdre d'informations.
  }),
})