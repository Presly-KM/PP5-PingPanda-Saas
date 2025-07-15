"use client" // Ici on indique que ce fichier est un composant client, ce qui signifie qu'il sera rendu côté client plutôt que côté serveur. Cela est nécessaire pour les composants qui utilisent des fonctionnalités spécifiques au client, comme les hooks React ou les interactions avec le DOM. Par exemple, si le composant utilise des hooks comme useState ou useEffect, il doit être un composant client.
import { useState } from "react" // Importation du hook useState de React pour gérer l'état local du composant. Ce hook est utilisé pour créer des variables d'état qui peuvent être modifiées au fil du temps, par exemple pour stocker les catégories d'événements de l'utilisateur ou l'état de chargement des données.
import { LoadingSpinner } from "@/components/loading-spinner";
import { buttonVariants } from "@/components/ui/button";
import { client } from "@/lib/client";  // Importation du client API pour effectuer des requêtes vers l'API de l'application. Ce client est utilisé pour interagir avec les routes définies dans le routeur de l'application, comme la récupération des catégories d'événements de l'utilisateur.
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns"; // Importation de la fonction format de date-fns pour formater les dates. Cette fonction est utilisée pour afficher les dates dans un format lisible par l'utilisateur, comme "MMM d, yyyy" (par exemple, "Jan 1, 2023"). Cela permet d'améliorer l'expérience utilisateur en affichant les dates de manière claire et compréhensible.
import { BarChart2, Database } from "lucide-react";
import { Clock } from "lucide-react"; // Importation de l'icône d'horloge de la bibliothèque lucide-react. Cette icône est utilisée pour indiquer la date de création de la catégorie d'événements dans l'interface utilisateur.
import { ArrowRight, Trash2 } from "lucide-react"; // Importation des icônes flèche droite et poubelle de la bibliothèque lucide-react. Ces icônes sont utilisées pour indiquer les actions de navigation vers la page de détails de la catégorie et de suppression de la catégorie, respectivement.
import Link from "next/link"; // Importation du composant Link de Next.js pour créer
import { Button } from "@/components/ui/button"; // Importation du composant Button de l'interface utilisateur pour créer des boutons stylisés dans l'application. Ce composant est utilisé pour créer des boutons d'action dans l'interface utilisateur, comme le bouton "View all" pour afficher tous les événements d'une catégorie ou le bouton de suppression d'une catégorie.
import { Modal } from "@/components/ui/modal"; // Importation du composant Modal de l'interface utilisateur pour créer des fenêtres modales dans l'application. Ce composant est utilisé pour afficher des dialogues ou des confirmations, comme la confirmation de suppression d'une catégorie d'événements.
import { useQueryClient } from "@tanstack/react-query"; // Importation du hook useQueryClient de React Query pour accéder au client de requêtes. Ce hook est utilisé pour interagir avec le cache des requêtes et effectuer des opérations comme l'invalidation des données mises en cache ou la mise à jour des données après une mutation.
import { DashboardEmptyState } from "./dashboard-empty-state";

export const DashboardPageContent = () => {                // Ici, on crée un composant DashboardPageContent qui sera utilisé pour afficher le contenu de la page de tableau de bord. Ce composant est une fonction fléchée qui ne prend pas de paramètres. Il sera utilisé pour encapsuler le contenu principal de la page de tableau de bord, comme les statistiques, les graphiques, les listes d'éléments, etc.
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null); // Ici, on utilise le hook useState de React pour créer un état local pour stocker l'ID de la catégorie en cours de suppression. L'état est initialisé à null, ce qui signifie qu'aucune catégorie n'est en cours de suppression au départ. Lorsque l'utilisateur clique sur le bouton de suppression d'une catégorie, l'ID de cette catégorie sera stocké dans cet état pour pouvoir effectuer la suppression.
  const queryClient = useQueryClient() // Ici, on utilise le hook useQueryClient de React Query pour obtenir une instance du client de requêtes. Ce client est utilisé pour gérer les requêtes et les mutations dans l'application, comme la récupération des catégories d'événements de l'utilisateur ou la suppression d'une catégorie. Il permet également de mettre en cache les données et de gérer les états de chargement et d'erreur des requêtes.
  const { data:categories, isPending: isEventCategoriesLoading } = useQuery({                                 // Ici, on utilise le hook useQuery de React Query pour effectuer une requête asynchrone. Ce hook est utilisé pour récupérer des données depuis une API ou une base de données et les mettre en cache pour une utilisation ultérieure. Il prend un objet en paramètre qui contient les options de la requête.
          queryKey: ["user-event-categories"],             // Ici, on définit la clé de la requête, qui est un tableau contenant une chaîne de caractères. Cette clé est utilisée pour identifier la requête dans le cache de React Query. Dans ce cas, la clé est "user-event-categories", ce qui signifie que cette requête est liée aux catégories d'événements de l'utilisateur.
          queryFn: async () => {                         
            const res = await client.category.getEventCategories.$get()  // Ici, on effectue une requête GET vers l'API pour récupérer les catégories d'événements de l'utilisateur. Le client API est utilisé pour envoyer la requête à l'API définie dans le routeur de l'application. La méthode $get() est utilisée pour effectuer une requête GET vers la route getEventCategories du routeur categoryRouter.
            const { categories } = await res.json()  // Ici, on attend que la réponse de l'API soit reçue et on la convertit en JSON. La méthode json() est utilisée pour parser la réponse JSON renvoyée par l'API. Cette méthode est asynchrone, donc on utilise await pour attendre que la réponse soit complètement reçue avant de continuer.
            return categories 
        },
    })
  
    const {mutate: deleteCategory, isPending: isDeletingCategory} = useMutation({           // Ici, on utilise le hook useMutation de React Query pour créer une mutation asynchrone. Ce hook est utilisé pour effectuer des opérations qui modifient les données, comme la création, la mise à jour ou la suppression d'éléments. Il prend un objet en paramètre qui contient les options de la mutation.
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name }) // Ici, on effectue une requête POST vers l'API pour supprimer une catégorie d'événements. Le client API est utilisé pour envoyer la requête à l'API définie dans le routeur de l'application. La méthode $post() est utilisée pour effectuer une requête POST vers la route deleteCategory du routeur categoryRouter, en passant le nom de la catégorie à supprimer dans le corps de la requête.
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] }) // Ici, on utilise la méthode invalidateQueries du client de requêtes pour invalider le cache de la requête "user-event-categories". Cela signifie que les données mises en cache pour cette requête seront considérées comme obsolètes et devront être rechargées lors de la prochaine utilisation. Cela permet de s'assurer que les données affichées dans l'interface utilisateur sont toujours à jour après une mutation.
        setDeletingCategory(null) // Ici, on réinitialise l'état deletingCategory à null après la suppression de la catégorie. Cela permet de fermer la fenêtre modale de confirmation de suppression et de mettre à jour l'interface utilisateur pour refléter les changements. 
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
      return <DashboardEmptyState/>
   }

   return ( 
    <>
    <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {categories.map((category) => (
         <li 
         key={category.id} className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5">
          <div className="absolute z-0 inset-px rounded-lg bg-white"/> {/* Ici, on crée un élément div qui sert de fond pour chaque catégorie. Il est positionné absolument et prend toute la largeur et la hauteur de l'élément parent. La classe rounded-lg ajoute des coins arrondis au fond. */}

          <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5"/> {/* Ici, on crée un élément div qui sert de bordure pour chaque catégorie. Il est positionné absolument et prend toute la largeur et la hauteur de l'élément parent. La classe shadow-sm ajoute une ombre légère autour de l'élément. La classe group-hover:shadow-md ajoute une ombre plus prononcée lorsque l'utilisateur survole l'élément. */}
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

           <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm/5 text-gray-600">
            <Clock className="size-4 mr-2 text-brand-500" /> {/* Ici, on utilise une icône d'horloge pour indiquer la date de création de la catégorie. La classe size-4 définit la taille de l'icône à 1rem (16px) et la classe mr-2 ajoute une marge à droite de 0.5rem (8px). La classe text-brand-500 définit la couleur de l'icône. */}
            <span className="font-medium">Last ping:</span> 
            <span className="ml-1">
              {category.lastPing ? formatDistanceToNow(category.lastPing) + " ago" : "Never"} {/* Ici, on affiche la date du dernier ping de la catégorie. Si category.lastPing est défini, on utilise la fonction formatDistanceToNow pour afficher le temps écoulé depuis le dernier ping en format lisible par l'utilisateur (par exemple, "2 days ago"). Si category.lastPing n'est pas défini, on affiche "Never". */}
            </span>
            </div>
            <div className="flex items-center text-sm/5 text-gray-600">
            <Database className="size-4 mr-2 text-brand-500" /> {/* Ici, on utilise une icône de base de données pour indiquer le nombre d'événements associés à la catégorie. La classe size-4 définit la taille de l'icône à 1rem (16px) et la classe mr-2 ajoute une marge à droite de 0.5rem (8px). La classe text-brand-500 définit la couleur de l'icône. */}
            <span className="font-medium">Unique fields:</span>
            <span className="ml-1">
              {category.uniqueFieldCount || 0}</span> {/* Ici, on affiche le nombre de champs uniques associés à la catégorie. Si category.uniqueFieldCount est défini, on l'affiche, sinon on affiche "Never". */}
            </div>
            <div className="flex items-center text-sm/5 text-gray-600">
            <BarChart2 className="size-4 mr-2 text-brand-500" /> {/* Ici, on utilise une icône de base de données pour indiquer le nombre d'événements associés à la catégorie. La classe size-4 définit la taille de l'icône à 1rem (16px) et la classe mr-2 ajoute une marge à droite de 0.5rem (8px). La classe text-brand-500 définit la couleur de l'icône. */}
            <span className="font-medium">Events this month:</span>
            <span className="ml-1">{category.eventsCount || 0}</span> {/* Ici, on affiche le nombre de champs uniques associés à la catégorie. Si category.uniqueFieldCount est défini, on l'affiche, sinon on affiche "Never". */}
            </div>
           </div>

           <div className="flex items-center justify-between mt-4">
            <Link 
              href={`/dashboard/categories/${category.name}`} 
              className={buttonVariants({ 
                variant: "outline", 
                size: "sm", 
                className: "flex items-center gap-2 text-sm",       // Ici, on crée un lien vers la page de détails de la catégorie. Le lien utilise le composant Link de Next.js pour naviguer vers la page de détails de la catégorie. La classe buttonVariants est utilisée pour appliquer des styles au lien, comme le style "outline" et la taille "sm". La classe flex items-center gap-2 ajoute une disposition flexible avec un espacement entre les éléments.
            })}> 
               View all <ArrowRight className="size-4" />
            </Link>
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-red-600 transition-colors"
                aria-label={`Delete ${category.name} category`}    // Ici, on crée un bouton pour supprimer la catégorie. Le bouton est de type "ghost", ce qui signifie qu'il n'a pas de fond et est transparent par défaut. La classe text-gray-500 définit la couleur du texte du bouton, et la classe hover:text-red-600 change la couleur du texte en rouge lorsque l'utilisateur survole le bouton. La classe transition-colors ajoute une transition douce lors du changement de couleur.
                onClick={() => setDeletingCategory(category.name)} // Ici, on définit une fonction onClick qui sera appelée lorsque l'utilisateur cliquera sur le bouton de suppression. Cette fonction met à jour l'état deletingCategory avec le nom de la catégorie à supprimer. Cela permet de savoir quelle catégorie est en cours de suppression.
             > 
                <Trash2 className="size-5" />
              </Button>
           </div>
         </div>
      </li>
    ))}
   </ul>

    <Modal 
      showModal={!!deletingCategory} 
      setShowModal= {() => setDeletingCategory(null)}
      className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div> 
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              Delete Category
            </h2>
            <p className="text-sm/6 text-gray-600">
              Are you sure you want to delete the category "{deletingCategory}"? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" onClick={() => setDeletingCategory(null)}>   
                Cancel
           </Button>
           <Button variant="destructive" onClick={() => 
           deletingCategory && deleteCategory(deletingCategory)
           }
           disabled={isDeletingCategory}
          >
           {isDeletingCategory ? "Deleting..." : "Delete"}
           </Button>
          </div>
          </div>
      </Modal>
    </>
   )
}