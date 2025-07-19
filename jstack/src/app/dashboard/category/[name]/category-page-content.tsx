"use client"

import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"

interface CategoryPageContentProps {           // Ici on définit les props du composant
    hasEvents: boolean
    category: EventCategory
}

export const CategoryPageContent = ({          // Composant qui affiche le contenu de la page de catégorie
    hasEvents: initialHasEvents, 
    category,
 }: CategoryPageContentProps) => {
     const { data: pollingData } = useQuery({
         queryKey: ["category", category.name, "hasEvents"], 
         initialData: { hasEvents: initialHasEvents },   
     }) 

     if (!pollingData.hasEvents) {
        return <EmptyCategoryState categoryName={category.name} />
     }
}