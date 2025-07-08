"use client"            // Ici on indique que ce fichier est un composant client, ce qui signifie qu'il sera rendu côté client plutôt que côté serveur. Cela est nécessaire pour les composants qui utilisent des fonctionnalités spécifiques au client, comme les hooks React ou les interactions avec le DOM. Par e

import { SignUp } from "@clerk/nextjs"  // Importation du composant SignIn de Clerk, qui gère l'interface de connexion des utilisateurs.

const Page = () => {     // Définition du composant Page, qui sera utilisé pour afficher la page de connexion.
    return ( 
       <div className="w-full flex-1 flex items-center justify-center">
           <SignUp />   {/* Utilisation du composant SignIn de Clerk pour afficher le formulaire de connexion. use client permet d'utiliser les fonctionnalités de Clerk côté client, comme la gestion des sessions et l'authentification. */}
        </div>
    )
}

export default Page