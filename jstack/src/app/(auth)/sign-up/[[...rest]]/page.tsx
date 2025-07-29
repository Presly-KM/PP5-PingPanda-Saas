"use client"            // Ici on indique que ce fichier est un composant client, ce qui signifie qu'il sera rendu côté client plutôt que côté serveur. Cela est nécessaire pour les composants qui utilisent des fonctionnalités spécifiques au client, comme les hooks React ou les interactions avec le DOM. Par e

import { SignIn } from "@clerk/nextjs"  // Importation du composant SignIn de Clerk, qui gère l'interface de connexion des utilisateurs.
import { useSearchParams } from "next/navigation"

const Page = () => {     // Définition du composant Page, qui sera utilisé pour afficher la page de connexion.
   
    const searchParams = useSearchParams() // Utilisation du hook useSearchParams de Next.js pour accéder aux paramètres de l'URL. Cela permet de récupérer des informations passées dans l'URL, comme les intentions de navigation ou les messages d'erreur.
    const intent = searchParams.get("intent") // Extraction du paramètre "intent" de l'URL, qui peut être utilisé pour déterminer l'action à effectuer après la connexion.
   
    return ( 
       <div className="w-full flex-1 flex items-center justify-center">
           <SignIn />   {/* Utilisation du composant SignIn de Clerk pour afficher le formulaire de connexion. use client permet d'utiliser les fonctionnalités de Clerk côté client, comme la gestion des sessions et l'authentification. */}
        </div>
    )
}

export default Page