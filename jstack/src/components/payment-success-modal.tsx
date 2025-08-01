"use client"  // Indique que ce fichier est un composant React côté client, permettant l'utilisation de hooks et d'autres fonctionnalités React.

import { useQuery } from "@tanstack/react-query"  // Importation de useQuery pour effectuer des requêtes asynchrones.
import { useRouter } from "next/navigation"  // Importation du hook useRouter de Next.js pour la navigation.
import { useState } from "react"  // Importation de useState pour gérer l'état local du composant.
import { client } from "@/lib/client"  // Importation du client TRPC pour effectuer des appels à l'API.
import { Modal } from "@/components/ui/modal"  // Importation du composant Modal pour afficher des fenêtres modales.
import { LoadingSpinner } from "@/components/loading-spinner"  // Importation du composant LoadingSpinner pour afficher un indicateur de chargement. 
import { Button } from "@/components/ui/button"  // Importation du composant Button pour les boutons stylisés.
import { CheckIcon } from "lucide-react"  // Importation de l'icône CheckIcon de Lucide pour afficher une coche.


export const PaymentSuccessModal = () => {
    const router = useRouter()  // Utilisation du hook useRouter pour accéder aux fonctionnalités de navigation.
    const [isOpen, setIsOpen] = useState(false)  // Déclaration d'un état local isOpen pour contrôler l'ouverture du modal.
   
    const {data, isPending} = useQuery({ 
        queryKey: ["user-plan"],
        queryFn: async () => {
             const res = await client.payment.getUserPlan.$get()
             return await res.json()  // Appel à l'API pour obtenir le plan de l'utilisateur.
        },
        refetchInterval: (query) => {
            return query.state.data?.plan === "PRO" ? false : 1000  // Intervalle de rafraîchissement pour la requête. Si le plan de l'utilisateur est "PRO", la requête ne sera pas rafraîchie.
        },
    })

    const handleClose = () => {
        setIsOpen(false)  // Fonction pour fermer le modal en mettant isOpen à false.
        router.push("/dashboard")  // Redirection vers la page du tableau de bord après la fermeture du modal.
    }

    const isPaymentSuccessful = data?.plan === "PRO"  // Vérification si le plan de l'utilisateur est "PRO".

    return ( 
          <Modal 
            showModal={isOpen} 
            setShowModal={setIsOpen} 
            onClose={handleClose}
            className="px-6 pt-6"
            preventDefaultClose={!isPaymentSuccessful}  // Empêche la fermeture du modal si le paiement n'est pas réussi.
            >
            <div className="flex flex-col items-center">
                {isPending || !isPaymentSuccessful ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <LoadingSpinner className="mb-4" />  {/* Affichage d'un spinner de chargement pendant que la requête est en cours. */}
                        <p className="text-lg/7 font-medium text-gray-900">
                           Upgrading your account...
                        </p>
                        <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
                        Please wait while we process your upgrade. This may take a moment. 
                        </p>
                    </div>
                ) : (
                    <>
                    <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50"> 
                        <img
                            src="/brand-asset-heart.png"
                            className="h-full w-full object-cover"
                            alt="Payment Success"
                            /> 
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-1 text-center">
                        <p className="text-lg/7 tracking-tight font-medium text-pretty"> 
                        Upgrade successful! 🎉
                        </p>
                        <p className="text-gray-600 text-sm/6 text-pretty">
                        Thank you for upgrading to Pro and supporting PingPanda. 
                        Your account has been upgraded.
                        </p>
                    </div>

                    <div className="mt-8 w-full"> 
                        <Button onClick={handleClose} className="h-12 w-full">
                            <CheckIcon className="mr-2 size-5" />
                            Go to Dashboard
                        </Button>
                        </div>
                    </>
                )}
            </div>
           </Modal>
    )
}