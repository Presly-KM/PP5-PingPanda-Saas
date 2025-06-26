import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { use } from "react";
import {SignOutButton} from "@clerk/nextjs";

export const Navbar = () => {                          // Ici, on crée un composant Navbar qui sera utilisé pour afficher la barre de navigation en haut de la page. Ce composant est une fonction fléchée qui retourne du JSX, le langage de balisage utilisé par React pour décrire l'interface utilisateur.
    const user = false; // on veut dés la barre de navigation afficher le statut de l'utilisatuer. On crée alors ici "un mock" en d'autre terme on hardcode pour que navigateur agissse et affiche la page comme quand l'utilisateur n'est pas connecté. On initialise une variable user à false, ce qui signifie que l'utilisateur n'est pas connecté. Cela peut être utilisé plus tard pour afficher des liens de connexion ou de déconnexion en fonction de l'état de l'utilisateur.
    return (
         <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex z-40 font-semibold">
                Ping<span className="text-brand-700">Panda</span>
                </Link>

                <div className="h-full flex items-center space-x-4"> {/* Ici, on crée une div qui contiendra les liens de navigation. La classe h-full permet à cette div de prendre toute la hauteur de son parent, et flex items-center space-x-4 aligne les éléments enfants horizontalement avec un espacement de 4 unités entre eux. */}
                    {user ? (  
                    <>                                      
                    <SignOutButton>
                        <button className=""></button>
                    </SignOutButton>
                    </>
                   ) : null}
                </div>
              </div> 
        </MaxWidthWrapper>
    </nav>
    )
}