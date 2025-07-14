"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState, PropsWithChildren } from "react"
import { useForm } from "react-hook-form"                                     // Le hook useForm est utilisé pour gérer les formulaires dans React. Il fournit des méthodes pour enregistrer les champs du formulaire, valider les données et gérer l'état du formulaire.
import { zodResolver } from "@hookform/resolvers/zod"                         // ZodResolver est un résolveur pour React Hook Form qui permet d'utiliser Zod pour la validation des schémas de formulaire. En effet, il permet de valider les données du formulaire en utilisant des schémas définis avec Zod.
import { z } from "zod"                                                       // Zod est une bibliothèque de validation de schémas pour JavaScript et TypeScript. Elle est utilisée pour définir des schémas de validation pour les données, ce qui permet de s'assurer que les données respectent certaines règles avant d'être utilisées dans l'application.
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { Modal } from "@/components/ui/modal"                               // Le composant Modal est utilisé pour afficher une fenêtre modale, qui est une fenêtre superposée à l'interface utilisateur principale. Elle est souvent utilisée pour afficher des informations supplémentaires ou pour demander une action à l'utilisateur.
import { Label } from "@/components/ui/label"                               // Le composant Label est utilisé pour étiqueter les champs de formulaire. Il améliore l'accessibilité et l'expérience utilisateur en fournissant des descriptions claires des champs.
import { Input } from "@/components/ui/input"                               // Le composant Input est utilisé pour créer des champs de saisie dans les formulaires. Il permet à l'utilisateur de saisir des données, comme du texte ou des nombres.

const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR, // Le schéma de validation pour une catégorie d'événement. Il s'assure que le nom de la catégorie n'est pas vide, qu'il contient au moins un caractère, et qu'il ne contient que des lettres, des chiffres et des tirets.
    color: z
    .string()
    .min(1, "Color is required.")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."), // Le schéma de validation pour la couleur d'une catégorie
    emoji: z.string().emoji("Invalid emoji").optional(), // Le schéma de validation pour l'emoji d'une catégorie
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR> // Le type EventCategoryForm est dérivé du schéma de validation EVENT_CATEGORY_VALIDATOR. Il représente la forme des données d'une catégorie d'événement, avec les propriétés name, color et emoji.

export const CreateEventCategoryModal = ({ children } : PropsWithChildren) => {  // Le composant CreateEventCategoryModal est utilisé pour créer une catégorie d'événement. Il utilise le hook useState pour gérer l'état d'ouverture du modal et useQueryClient pour interagir avec le cache des requêtes.
    const [isOpen, setIsOpen] = useState(false)                                  // Le hook useState est utilisé pour gérer l'état d'ouverture du modal. Il initialise isOpen à false, ce qui signifie que le modal est fermé par défaut.
    const queryClient = useQueryClient()                                         // Le hook useQueryClient est utilisé pour accéder au client de requête, qui permet d'interagir avec le cache des requêtes et de déclencher des mises à jour.

    const { register, handleSubmit } = useForm<EventCategoryForm>({
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
    })

    const onSubmit = (data: EventCategoryForm) => {

    }
    return (
    <> 
    <div onClick={() => setIsOpen(true)}>{children}</div>

    <Modal className="max-w-xl p-8" 
           showModal={isOpen} 
           setShowModal={setIsOpen}
           >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                    New Event Category
                </h2>
                <p className="text-sm/6 text-gray-600">
                    Create a new category to organize your events.
                </p>
            </div>

            <div className="space-y-5">
             <div>
               <Label htmlFor="name">Name</Label>
               <Input 
               autoFocus 
               id="name" 
               {...register("name")} 
               placeholder="e.e. user-signup"
               className="w-full"
               />
             </div>
            </div>
        </form>
    </Modal>
    </>
    )
}