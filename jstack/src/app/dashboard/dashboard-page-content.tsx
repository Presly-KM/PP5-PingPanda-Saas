import { useQuery } from "@tanstack/react-query";

export const DashboardPageContent = () => {                // Ici, on crée un composant DashboardPageContent qui sera utilisé pour afficher le contenu de la page de tableau de bord. Ce composant est une fonction fléchée qui ne prend pas de paramètres. Il sera utilisé pour encapsuler le contenu principal de la page de tableau de bord, comme les statistiques, les graphiques, les listes d'éléments, etc.
    const {} = useQuery ({                                 // Ici, on utilise le hook useQuery de React Query pour effectuer une requête asynchrone. Ce hook est utilisé pour récupérer des données depuis une API ou une base de données et les mettre en cache pour une utilisation ultérieure. Il prend un objet en paramètre qui contient les options de la requête.
          queryKey: ["user-event-categories"],             // Ici, on définit la clé de la requête, qui est un tableau contenant une chaîne de caractères. Cette clé est utilisée pour identifier la requête dans le cache de React Query. Dans ce cas, la clé est "user-event-categories", ce qui signifie que cette requête est liée aux catégories d'événements de l'utilisateur.
            queryFn: async () => {                         
                
            }
    })
}