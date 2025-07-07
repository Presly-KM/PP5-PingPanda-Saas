import { Navbar } from "@/components/navbar"                
import { ReactNode } from "react";

const Layout = ({children} : {children: ReactNode}) => {        // Ici, on crée un composant Layout qui sera utilisé pour envelopper le contenu de la page. Ce composant est une fonction fléchée qui prend en paramètre des props, ici children, qui est de type ReactNode. Cela signifie que ce composant peut recevoir n'importe quel contenu React, comme du texte, des éléments HTML, d'autres composants, etc. Par exemple, si on place du texte ou d'autres composants entre les balises d'ouverture et de fermeture du composant Layout dans le fichier page.tsx, ce contenu sera affiché ici dans le composant Layout. ({children} : {children: ReactNode}) signifie que nous attendons une prop children de type ReactNode, ce qui est courant dans les composants React pour permettre l'insertion de contenu dynamique.
    return (                                                    //
        <>
            <Navbar />                                           {/* Ici, on utilise le composant Navbar que nous avons créé précédemment pour afficher la barre de navigation en haut de la page. */}
            {children}                                           {/* Ici, on utilise les props children pour afficher le contenu passé au composant Layout. Cela signifie que tout ce qui est placé entre les balises d'ouverture et de fermeture du composant Layout dans le fichier page.tsx sera affiché ici. */}
        </>
    )
} 


export default Layout 