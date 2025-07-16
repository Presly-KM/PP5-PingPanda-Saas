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
import { cn } from "@/utils"                                               // La fonction cn est utilisée pour combiner des classes CSS conditionnelles. Elle permet de gérer dynamiquement les classes CSS en fonction de l'état ou des propriétés du composant.
import { Button } from "@/components/ui/button"                             // Le composant Button est utilisé pour créer des boutons interactifs dans l'interface utilisateur. Il permet à l'utilisateur de déclencher des actions, comme soumettre un formulaire ou ouvrir une modale.
import { useMutation } from "@tanstack/react-query"                       // Le hook useMutation est utilisé pour effectuer des mutations de données, comme la création, la mise à jour ou la suppression d'éléments. Il est souvent utilisé pour envoyer des données au serveur et mettre à jour l'état de l'application en conséquence.
import { client } from "@/lib/client"                                   // Le client TRPC est utilisé pour interagir avec le serveur TRPC. Il permet d'envoyer des requêtes et de recevoir des réponses du serveur, facilitant ainsi la communication entre le client et le serveur.

const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR, // Le schéma de validation pour une catégorie d'événement. Il s'assure que le nom de la catégorie n'est pas vide, qu'il contient au moins un caractère, et qu'il ne contient que des lettres, des chiffres et des tirets.
    color: z
    .string()
    .min(1, "Color is required.")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."), // Le schéma de validation pour la couleur d'une catégorie
    emoji: z.string().emoji("Invalid emoji").optional(), // Le schéma de validation pour l'emoji d'une catégorie
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR> // Le type EventCategoryForm est dérivé du schéma de validation EVENT_CATEGORY_VALIDATOR. Il représente la forme des données d'une catégorie d'événement, avec les propriétés name, color et emoji.

const COLOR_OPTIONS = [                                             // Les options de couleur prédéfinies pour les catégories d'événements. Elles sont utilisées pour permettre à l'utilisateur de choisir une couleur pour la catégorie. Tailwind CSS ici va utiliser les classes de couleur pour styliser les boutons de couleur.
"#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
"#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
"#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
"#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
"#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
"#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
"#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
"#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
"#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
"#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [                                             // Les options d'emoji prédéfinies pour les catégories d'événements. Elles sont utilisées pour permettre à l'utilisateur de choisir un emoji pour la catégorie.
{ emoji: "💰", label: "Money (Sale)" },
{ emoji: "👤", label: "User (Sign-up)" },
{ emoji: "🎉", label: "Celebration" },
{ emoji: "📅", label: "Calendar" },
{ emoji: "🚀", label: "Launch" },
{ emoji: "📢", label: "Announcement" },
{ emoji: "🎓", label: "Graduation" },
{ emoji: "🏆", label: "Achievement" },
{ emoji: "💡", label: "Idea" },
{ emoji: "🔔", label: "Notification" },
]

interface CreateEventCategoryModal extends PropsWithChildren {  // Le composant CreateEventCategoryModal est utilisé pour créer une nouvelle catégorie d'événement. Il utilise le hook useState pour gérer l'état d'ouverture du modal et le hook useForm pour gérer le formulaire de création de catégorie.
    containerClassName?: string // La classe CSS optionnelle pour le conteneur du modal. Elle permet de personnaliser le style du conteneur du modal, par exemple en ajoutant des marges ou des bordures.
}

export const CreateEventCategoryModal = ({ children, containerClassName,} : CreateEventCategoryModal) => {  // Le composant CreateEventCategoryModal prend en charge les enfants (children) qui seront affichés dans le conteneur du modal, ainsi qu'une classe CSS optionnelle pour le conteneur.
    const [isOpen, setIsOpen] = useState(false)                                  // Le hook useState est utilisé pour gérer l'état d'ouverture du modal. Il initialise isOpen à false, ce qui signifie que le modal est fermé par défaut.
    const queryClient = useQueryClient()                                         // Le hook useQueryClient est utilisé pour accéder au client de requête, qui permet d'interagir avec le cache des requêtes et de déclencher des mises à jour.

    const {mutate: createEventCategory, isPending } = useMutation({
        mutationFn: async (data: EventCategoryForm) => {
           await client.category.createEventCategory.$post(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-event-categories"] }) // La fonction onSuccess est appelée lorsque la mutation réussit. Elle invalide la requête "user-event-categories" pour forcer une nouvelle récupération des données, garantissant ainsi que l'interface utilisateur affiche les données les plus récentes.
            setIsOpen(false)  // Elle ferme le modal après la création réussie de la catégorie d'événement. 
        }
    })
            
    const { register, handleSubmit, watch, setValue, formState:{errors}, } = useForm<EventCategoryForm>({ // Le hook useForm est utilisé pour gérer le formulaire de création de catégorie d'événement. Il utilise le schéma de validation EVENT_CATEGORY_VALIDATOR pour valider les données du formulaire. register est utilisé pour enregistrer les champs du formulaire, handleSubmit est utilisé pour gérer la soumission du formulaire, et formState.errors est utilisé pour accéder aux erreurs de validation. formState errors contient les erreurs de validation pour chaque champ du formulaire, ainsi, si une erreur de validation se produit, elle sera affichée sous le champ correspondant.
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
    })

    const color = watch("color") // Le hook watch est utilisé pour surveiller les changements dans le champ "color" du formulaire. Il permet de récupérer la valeur actuelle de la couleur sélectionnée par l'utilisateur.
    const selectedEmoji = watch("emoji") // Le hook watch est utilisé pour surveiller les changements dans le champ "emoji" du formulaire. Il permet de récupérer la valeur actuelle de l'emoji sélectionné par l'utilisateur.
    
    const onSubmit = (data: EventCategoryForm) => {
         createEventCategory(data) // La fonction onSubmit est appelée lorsque le formulaire est soumis. Elle utilise la fonction createEventCategory pour créer une nouvelle catégorie d'événement avec les données du formulaire.
    }

    return (
    <> 
    <div className={containerClassName} onClick={() => setIsOpen(true)}>  {/* Le conteneur du modal est utilisé pour afficher le bouton ou le lien qui ouvre le modal. Il utilise la classe CSS optionnelle containerClassName pour personnaliser son style. Lorsqu'on clique sur ce conteneur, il appelle setIsOpen(true) pour ouvrir le modal. */}
        {children}
    </div>

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
               placeholder="e.g. user-signup"
               className="w-full"
               />
                {errors.name ?  (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                    </p>
                ) : null}
             </div>

             <div>
                <Label>Color</Label>
                <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map((premadeColor) => (
                        <button 
                        key={premadeColor}
                        type="button"
                        className={cn(
                            `bg-[${premadeColor}] `, 
                            "size-10 rounded-full ring-2 ring-offset-2 transition-all", 
                            color === premadeColor 
                            ? "ring-brand-700 scale-110" 
                            : "ring-transparent hover:scale-105"
                        )}
                        onClick={() => setValue("color", premadeColor)}
                        ></button>
                    ))}
               </div>

               {errors.color ? ( 
                  <p className="mt-1 text-sm text-red-500">
                {errors.color.message}               {/* Le champ "color" est utilisé pour sélectionner une couleur pour la catégorie d'événement. Il affiche des boutons de couleur prédéfinis et permet à l'utilisateur de choisir une couleur. Si une erreur de validation se produit, elle sera affichée sous le champ. */}
               </p>
             ) : null}
             </div>

             <div>
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-3">
                    {EMOJI_OPTIONS.map(({emoji, label}) => (
                     <button 
                        key={emoji}
                        type="button"
                        className={cn(
                            "size-10 flex items-center justify-center text-xl rounded-md transition-all", 
                            selectedEmoji === emoji
                            ? "bg-brand-100 ring-2 ring-brand-700 scale-110" 
                            : "bg-brand-100 hover:bg-brand-200"
                        )}
                        onClick={() => setValue("emoji", emoji)}
                        >
                        {emoji}
                        </button>
                    ))}
               </div>

               {errors.emoji ? ( 
                  <p className="mt-1 text-sm text-red-500">
                {errors.emoji.message}               {/* Le champ "color" est utilisé pour sélectionner une couleur pour la catégorie d'événement. Il affiche des boutons de couleur prédéfinis et permet à l'utilisateur de choisir une couleur. Si une erreur de validation se produit, elle sera affichée sous le champ. */}
               </p>
             ) : null}
             </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button disabled={isPending} type="submit">
                    {isPending ? "Creating..." : "Create Category"}{" "}
                </Button>
            </div>
        </form>
    </Modal>
    </>
    )
}