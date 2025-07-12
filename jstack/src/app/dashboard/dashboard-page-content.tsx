"use client" // Ici on indique que ce fichier est un composant client, ce qui signifie qu'il sera rendu côté client plutôt que côté serveur. Cela est nécessaire pour les composants qui utilisent des fonctionnalités spécifiques au client, comme les hooks React ou les interactions avec le DOM. Par exemple, si le composant utilise des hooks comme useState ou useEffect, il doit être un composant client.

import { LoadingSpinner } from "@/components/loading-spinner";
import { client } from "@/lib/client";  // Importation du client API pour effectuer des requêtes vers l'API de l'application. Ce client est utilisé pour interagir avec les routes définies dans le routeur de l'application, comme la récupération des catégories d'événements de l'utilisateur.
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns"; // Importation de la fonction format de date-fns pour formater les dates. Cette fonction est utilisée pour afficher les dates dans un format lisible par l'utilisateur, comme "MMM d, yyyy" (par exemple, "Jan 1, 2023"). Cela permet d'améliorer l'expérience utilisateur en affichant les dates de manière claire et compréhensible.

export const DashboardPageContent = () => {                // Ici, on crée un composant DashboardPageContent qui sera utilisé pour afficher le contenu de la page de tableau de bord. Ce composant est une fonction fléchée qui ne prend pas de paramètres. Il sera utilisé pour encapsuler le contenu principal de la page de tableau de bord, comme les statistiques, les graphiques, les listes d'éléments, etc.
    const { data:categories, isPending: isEventCategoriesLoading } = useQuery({                                 // Ici, on utilise le hook useQuery de React Query pour effectuer une requête asynchrone. Ce hook est utilisé pour récupérer des données depuis une API ou une base de données et les mettre en cache pour une utilisation ultérieure. Il prend un objet en paramètre qui contient les options de la requête.
          queryKey: ["user-event-categories"],             // Ici, on définit la clé de la requête, qui est un tableau contenant une chaîne de caractères. Cette clé est utilisée pour identifier la requête dans le cache de React Query. Dans ce cas, la clé est "user-event-categories", ce qui signifie que cette requête est liée aux catégories d'événements de l'utilisateur.
            queryFn: async () => {                         
                const res = await client.category.getEventCategories.$get()  // Ici, on effectue une requête GET vers l'API pour récupérer les catégories d'événements de l'utilisateur. Le client API est utilisé pour envoyer la requête à l'API définie dans le routeur de l'application. La méthode $get() est utilisée pour effectuer une requête GET vers la route getEventCategories du routeur categoryRouter.
                const {categories} = await res.json()  // Ici, on attend que la réponse de l'API soit reçue et on la convertit en JSON. La méthode json() est utilisée pour parser la réponse JSON renvoyée par l'API. Cette méthode est asynchrone, donc on utilise await pour attendre que la réponse soit complètement reçue avant de continuer.
                return categories 
        },
    })

    if (isEventCategoriesLoading) {  
      return (
        <div className="flex items-center justify-center flex-1 h-full w-full">
          <LoadingSpinner /> 
        </div>
      )
   }

   if(!categories || categories.length === 0) {  // Ici, on vérifie si la variable categories est définie et si elle contient des catégories. Si categories est undefined ou si sa longueur est égale à 0, cela signifie qu'il n'y a pas de catégories d'événements à afficher.
      return <div>empty state</div>
   }

   return ( 
    <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {categories.map((category) => (
         <li 
         key={category.id} className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5">
          <div className="absolute z-0 inset-px rounded-lg bg-white"/> {/* Ici, on crée un élément div qui sert de fond pour chaque catégorie. Il est positionné absolument et prend toute la largeur et la hauteur de l'élément parent. La classe rounded-lg ajoute des coins arrondis au fond. */}

          <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5"> {/* Ici, on crée un élément div qui sert de bordure pour chaque catégorie. Il est positionné absolument et prend toute la largeur et la hauteur de l'élément parent. La classe shadow-sm ajoute une ombre légère autour de l'élément. La classe group-hover:shadow-md ajoute une ombre plus prononcée lorsque l'utilisateur survole l'élément. */}
           <div className="relative p-6 z-10">
           <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-full" style={{ backgroundColor: category.color ? `#${category.color.toString(16).padStart(6, "0")}`: "#f3f4f6",  }} />  {/* Ici, on crée un élément div qui sert d'icône pour chaque catégorie. Il est de taille 12 (3rem) et a des coins arrondis grâce à la classe rounded-full. La couleur de fond est définie dynamiquement en fonction de la couleur de la catégorie. Si category.color est défini, on utilise cette couleur, sinon on utilise une couleur par défaut (#f3f4f6). */}
            <div>
              <h3 className="text-lg/7 font-medium tracking-tight text-gray-950">
              {category.emoji || "📁"} {category.name} 
              </h3>
              <p className="text-sm/6 text-gray-600">
              {format(category.createdAt, "MMM d, yyyy")} 
              </p>
            </div>
           </div>
         </div>
         </div>
         </li>
    ))}
   </ul>
   )
}