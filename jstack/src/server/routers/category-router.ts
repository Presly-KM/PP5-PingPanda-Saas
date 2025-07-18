import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";    
import { startOfMonth } from "date-fns"; // Import de la fonction startOfMonth pour manipuler les dates       
import { z } from "zod"; // Import de la bibliothèque zod pour la validation des schémas de données        
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { parseColor } from "@/utils"; // Import de la fonction parseColor pour convertir les couleurs en entiers
import { HTTPException } from "hono/http-exception";

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

  deleteCategory: privateProcedure           
  .input(z.object({ name: z.string() }))    // On définit un schéma d'entrée zod pour valider les données d'entrée de la requête. C'est à dire, on s'assure que l'entrée de la requête contient un champ name de type string. Cela permet de valider les données d'entrée avant de les utiliser dans la requête. Si les données d'entrée ne correspondent pas au schéma, une erreur sera renvoyée au client. z est une bibliothèque de validation de schémas de données qui permet de définir des schémas de validation pour les données d'entrée. C'est à dire qu'il permet de définir des règles de validation pour les données d'entrée de la requête. Ainsi, on s'assure que les données d'entrée sont valides avant de les utiliser dans la requête. z.object est une méthode de zod qui permet de définir un schéma d'objet. On utilise cette méthode pour définir un schéma d'objet qui contient un champ name de type string. 
  .mutation(async ({ c, input, ctx }) => {  // Ici, on crée une procédure privée qui permet de supprimer une catégorie d'événements de l'utilisateur. Cette procédure est accessible uniquement aux utilisateurs authentifiés grâce au middleware d'authentification utilisé dans privateProcedure. "c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données. privateProcedure.mutation est une méthode de Prisma qui permet de créer une mutation pour modifier des données dans la base de données. Cette méthode est utilisée pour créer des requêtes de type POST, PUT ou DELETE, c'est-à-dire des requêtes qui modifient des données dans la base de données. Elle prend en paramètre un schéma d'entrée zod pour valider les données d'entrée et une fonction asynchrone qui reçoit le contexte de la requête et le contexte de l'application. Cette fonction doit retourner un objet JSON contenant les données à renvoyer au client.
    const { name } = input  // On extrait/récupère le nom de la catégorie à supprimer à partir de l'entrée de la requête. L'entrée est validée par le schéma zod défini dans la méthode input.
   
    await db.eventCategory.delete({ // On utilise la méthode delete de Prisma pour supprimer la catégorie d'événements de l'utilisateur. Cette méthode supprime un enregistrement de la base de données en fonction des critères spécifiés dans l'objet where.
        where: { name_userId: { name, userId: ctx.user.id } }, // On filtre la catégorie à supprimer en fonction du nom et de l'ID de l'utilisateur authentifié. Cela permet de s'assurer que l'utilisateur ne peut supprimer que ses propres catégories d'événements. where est un objet qui contient les critères de filtrage pour la suppression. Dans ce cas, on filtre par le nom de la catégorie et l'ID de l'utilisateur authentifié. "{ name_userId: { name, userId: ctx.user.id } } " est un objet qui contient les critères de filtrage pour la suppression. On utilise le nom de la catégorie et l'ID de l'utilisateur authentifié pour s'assurer que l'utilisateur ne peut supprimer que ses propres catégories d'événements.   "
    })
    
    return c.json({ success: true}) // On renvoie une réponse JSON indiquant que la suppression a réussi.
  }),

  createEventCategory: privateProcedure.input(
    z.object({  // On définit un schéma d'entrée zod pour valider les données d'entrée de la requête. C'est à dire, on s'assure que l'entrée de la requête contient un champ name de type string, un champ color de type string et un champ emoji de type string. Cela permet de valider les données d'entrée avant de les utiliser dans la requête. Si les données d'entrée ne correspondent pas au schéma, une erreur sera renvoyée au client.
    name: CATEGORY_NAME_VALIDATOR, // On utilise le schéma de validation CATEGORY_NAME_VALIDATOR importé depuis le fichier category-validator.ts pour valider le nom de la catégorie. Ce schéma s'assure que le nom n'est pas vide, qu'il contient au moins un caractère, et qu'il ne contient que des lettres, des chiffres et des tirets.
    color: z
     .string() // On définit un champ color de type string pour la couleur de la catégorie. Ce champ est utilisé pour stocker la couleur associée à la catégorie d'événements.
     .min(1, "Color is required.") // On ajoute une validation pour s'assurer que le champ color n'est pas vide. Si le champ est vide, une erreur sera renvoyée au client avec le message "Color is required.".
     .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."), // On ajoute une validation pour s'assurer que le champ color est au format hexadécimal. Si le champ ne correspond pas au format, une erreur sera renvoyée au client avec le message "Invalid color format.".
    emoji: z.string().emoji("Invalid emoji").optional(), // On définit un champ emoji de type string pour l'emoji de la catégorie. Ce champ est optionnel, c'est-à-dire qu'il peut être vide. On ajoute une validation pour s'assurer que le champ emoji est un emoji valide. Si le champ ne correspond pas à un emoji valide, une erreur sera renvoyée au client avec le message "Invalid emoji".
  })
)
.mutation(async ({ c, ctx, input }) => {   // Ici, on crée une procédure privée qui permet de créer une nouvelle catégorie d'événements pour l'utilisateur. Cette procédure est accessible uniquement aux utilisateurs authentifiés grâce au middleware d'authentification utilisé dans privateProcedure. "c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données. privateProcedure.mutation est une méthode de Prisma qui permet de créer une mutation pour modifier des données dans la base de données. Cette méthode est utilisée pour créer des requêtes de type POST, PUT ou DELETE, c'est-à-dire des requêtes qui modifient des données dans la base de données. Elle prend en paramètre un schéma d'entrée zod pour valider les données d'entrée et une fonction asynchrone qui reçoit le contexte de la requête et le contexte de l'application. Cette fonction doit retourner un objet JSON contenant les données à renvoyer au client.
    const { user } = ctx // On récupère l'utilisateur authentifié à partir du contexte de l'application. ctx.user est l'utilisateur authentifié récupéré par le middleware d'authentification.
    const { color, name, emoji } = input // On extrait les champs color, name et emoji de l'entrée de la requête. L'entrée est validée par le schéma zod défini dans la méthode input.  

     // TODO : ADD PAID PLAN LOGIC   

     const eventCategory = await db.eventCategory.create({ // On utilise la méthode create de Prisma pour créer une nouvelle catégorie d'événements pour l'utilisateur. Cette méthode crée un nouvel enregistrement dans la base de données en fonction des données fournies dans l'objet data.
        data: {                       // On définit les données de la nouvelle catégorie d'événements à créer. 
            name: name.toLowerCase(), // On convertit le nom de la catégorie en minuscules pour éviter les doublons et assurer une cohérence dans la base de données. Cela permet également de faciliter la recherche et le filtrage des catégories d'événements.
            color: parseColor(color), // On utilise la fonction parseColor importée depuis utils.ts pour convertir la couleur en un entier. Cette fonction prend une chaîne de caractères représentant une couleur au format hexadécimal et la convertit en un entier. Cela permet de stocker la couleur dans la base de données sous forme d'entier, ce qui est plus efficace en termes de stockage et de performances.
            emoji,
            userId: user.id, // On associe la catégorie d'événements à l'utilisateur authentifié en utilisant son ID. Cela permet de s'assurer que chaque utilisateur ne peut accéder qu'à ses propres catégories d'événements.
     },
     })

    return c.json({ eventCategory}) // On renvoie une réponse JSON indiquant que la création de la catégorie a réussi.
}),

insertQuickstartCategories: privateProcedure.mutation(async ({ ctx, c }) => { // Ici, on crée une procédure privée qui permet d'insérer des catégories d'événements de démarrage rapide pour l'utilisateur. Cette procédure est accessible uniquement aux utilisateurs authentifiés grâce au middleware d'authentification utilisé dans privateProcedure. "c" est le contexte de la requête c'est-à-dire les informations de la requête HTTP, par exemple les en-têtes, les paramètres de la requête, etc. par exemple, on peut utiliser c.req.query pour accéder aux paramètres de la requête. "ctx" est le contexte de l'application, c'est-à-dire les informations globales de l'application, par exemple, les variables d'environnement, les configurations, etc. On peut utiliser ctx.db pour accéder à la base de données. privateProcedure.mutation est une méthode de Prisma qui permet de créer une mutation pour modifier des données dans la base de données. Cette méthode est utilisée pour créer des requêtes de type POST, PUT ou DELETE, c'est-à-dire des requêtes qui modifient des données dans la base de données. Elle prend en paramètre une fonction asynchrone qui reçoit le contexte de la requête et le contexte de l'application. Cette fonction doit retourner un objet JSON contenant les données à renvoyer au client.
    const categories = await db.eventCategory.createMany({ // On utilise la méthode createMany de Prisma pour insérer plusieurs catégories d'événements de démarrage rapide pour l'utilisateur. Cette méthode crée plusieurs enregistrements dans la base de données en fonction des données fournies dans l'objet data.
        data: [
            { name: "bug", emoji: "🐛", color: 0xff6b6b},
            { name: "sale", emoji: "💰", color: 0xffeb3b},
            { name: "question", emoji: "🤔", color: 0x6c5ce7 },
        ].map((category) => ({           // On utilise la méthode map pour parcourir chaque catégorie d'événements de démarrage rapide et créer un objet contenant les données de la catégorie à insérer dans la base de données.
            ...category,                 // On utilise l'opérateur de décomposition pour copier les propriétés de la catégorie d'événements de démarrage rapide dans l'objet à insérer dans la base de données.
            userId: ctx.user.id,         // On associe la catégorie d'événements de démarrage rapide à l'utilisateur authentifié en utilisant son ID. Cela permet de s'assurer que chaque utilisateur ne peut accéder qu'à ses propres catégories d'événements.
        })),
    })

    return c.json({ success: true, count: categories.count }) // On renvoie une réponse JSON indiquant que l'insertion des catégories de démarrage rapide a réussi. On inclut également le nombre de catégories insérées dans la réponse pour informer le client du succès de l'opération.
}),

pollCategory: privateProcedure
  .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
  .query(async ({c, ctx, input}) => {
   const { name } = input // On extrait le nom de la catégorie à partir de l'entrée de la requête. L'entrée est validée par le schéma zod défini dans la méthode input.
   const category = await db.eventCategory.findUnique({ // On utilise la méthode findUnique de Prisma pour récupérer une catégorie d'événements unique en fonction du nom et de l'ID de l'utilisateur authentifié. Cette méthode renvoie un seul enregistrement de la base de données correspondant aux critères spécifiés dans l'objet where.
        where: { name_userId: { name, userId: ctx.user.id } }, // On filtre la catégorie à récupérer en fonction du nom et de l'ID de l'utilisateur authentifié. Cela permet de s'assurer que l'utilisateur ne peut accéder qu'à ses propres catégories d'événements.
        include: {
            _count: {   
                select: { 
                    events: true, // On inclut le nombre d'événements associés à la catégorie dans la réponse. Cela permet de savoir combien d'événements sont associés à la catégorie sans avoir à effectuer une requête supplémentaire.
                },  
            },
        },
    })

    if (!category) { 
        throw new HTTPException(404, { 
            message: `Category "${name}" not found.`,   // On lance une exception HTTP 404 si la catégorie n'est pas trouvée. Cela permet de renvoyer une réponse d'erreur au client avec un message indiquant que la catégorie n'a pas été trouvée.        
        })
    }

    const hasEvents = category._count.events > 0 // On vérifie si la catégorie a des événements associés en comparant le nombre d'événements avec zéro. Si le nombre d'événements est supérieur à zéro, cela signifie que la catégorie a des événements associés.
    
    return c.json({ hasEvents })    
}), 
})