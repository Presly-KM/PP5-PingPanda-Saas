import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import {SignOutButton} from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button"; // Importation du composant Button pour les boutons stylisés
import { ArrowRight } from "lucide-react"; // Importation de l'icône ArrowRight de la bibliothèque lucide-react pour les flèches

export const Navbar = () => {                          // Ici, on crée un composant Navbar qui sera utilisé pour afficher la barre de navigation en haut de la page. Ce composant est une fonction fléchée qui retourne du JSX, le langage de balisage utilisé par React pour décrire l'interface utilisateur.
    const user = false;                                 // On veut dés la barre de navigation afficher le statut de l'utilisatuer. On crée alors ici "un mock" en d'autre terme on hardcode pour que navigateur agissse et affiche la page comme quand l'utilisateur est connecté. On initialise une variable user à true, ce qui signifie que l'utilisateur est  connecté. Cela peut être utilisé plus tard pour afficher des liens de connexion ou de déconnexion en fonction de l'état de l'utilisateur. Ici le bouton "sign out" sera affiché si l'utilisateur est connecté.  
    
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
                    <SignOutButton>{/* Ici, on utilise le composant SignOutButton de Clerk pour créer un bouton de déconnexion. Le composant SignOutButton gère la logique de déconnexion de l'utilisateur. Le bouton est stylisé avec le composant Button, qui est importé depuis le fichier ui/button.tsx. Le bouton a une taille petite (size="sm") et utilise la variante "ghost" pour un style minimaliste. */}
                        <Button size="sm" variant="ghost">
                            Sign out
                        </Button>                 
                    </SignOutButton>

                    <Link href="/dashboard" className={buttonVariants({     // Ici, on utilise le composant Link de Next.js pour créer un lien vers la page "/dashboard". Le composant Link est utilisé pour la navigation entre les pages de l'application. buttonVariants est une fonction qui génère des classes CSS pour le bouton en fonction des variantes spécifiées. Cela permet de styliser le bouton de manière cohérente avec le reste de l'application. Par exemple, on peut spécifier des variantes comme size: "sm" pour un bouton de petite taille, et className: "sm:flex items-center gap-1" pour appliquer des classes CSS spécifiques au bouton.
                        size: "sm",                                         // Ici, on utilise la fonction buttonVariants pour générer les classes CSS pour le bouton. On peut spécifier des variantes comme size: "sm" pour un bouton de petite taille.
                        className: "flex items-center gap-1",            // Ici, on utilise la classe hidden sm:flex pour masquer le bouton sur les écrans plus petits que "sm" (small) et l'afficher en tant que flexbox sur les écrans plus grands. items-center aligne les éléments enfants verticalement au centre, et gap-1 ajoute un espacement de 1 unité entre les éléments enfants.
                    })}
                    > 
                        Dashboard <ArrowRight className="ml-1.5 size-4" /> {/* Ici, on utilise l'icône ArrowRight de la bibliothèque lucide-react pour ajouter une flèche à droite du texte "Dashboard". La classe ml-1.5 ajoute une marge à gauche de 1.5 unités pour espacer la flèche du texte. size-4 définit la taille de l'icône. */}
                    </Link>
                    </>
                    ) : ( // Ici, on utilise une condition ternaire pour vérifier si l'utilisateur est connecté. Si user est true, on affiche les liens de déconnexion et de tableau de bord. Sinon, on n'affiche rien.
                    <>
                    <Link href="/dashboard" className={buttonVariants({     // Ici, on utilise le composant Link de Next.js pour créer un lien vers la page "/dashboard". Le composant Link est utilisé pour la navigation entre les pages de l'application. buttonVariants est une fonction qui génère des classes CSS pour le bouton en fonction des variantes spécifiées. Cela permet de styliser le bouton de manière cohérente avec le reste de l'application. Par exemple, on peut spécifier des variantes comme size: "sm" pour un bouton de petite taille, et className: "sm:flex items-center gap-1" pour appliquer des classes CSS spécifiques au bouton.
                        size: "sm",                                         // Ici, on utilise la fonction buttonVariants pour générer les classes CSS pour le bouton. On peut spécifier des variantes comme size: "sm" pour un bouton de petite taille.
                        variant: "ghost",            // Ici, on utilise la classe hidden sm:flex pour masquer le bouton sur les écrans plus petits que "sm" (small) et l'afficher en tant que flexbox sur les écrans plus grands. items-center aligne les éléments enfants verticalement au centre, et gap-1 ajoute un espacement de 1 unité entre les éléments enfants.
                    })}
                    > 
                    Princing
                    </Link>
                    <Link href="/sign-in" className={buttonVariants({     // Ici, on utilise le composant Link de Next.js pour créer un lien vers la page "/dashboard". Le composant Link est utilisé pour la navigation entre les pages de l'application. buttonVariants est une fonction qui génère des classes CSS pour le bouton en fonction des variantes spécifiées. Cela permet de styliser le bouton de manière cohérente avec le reste de l'application. Par exemple, on peut spécifier des variantes comme size: "sm" pour un bouton de petite taille, et className: "sm:flex items-center gap-1" pour appliquer des classes CSS spécifiques au bouton.
                        size: "sm",                                         // Ici, on utilise la fonction buttonVariants pour générer les classes CSS pour le bouton. On peut spécifier des variantes comme size: "sm" pour un bouton de petite taille.
                        variant: "ghost",
                    })}
                    > 
                        Sign in {/* Ici, on utilise l'icône ArrowRight de la bibliothèque lucide-react pour ajouter une flèche à droite du texte "Dashboard". La classe ml-1.5 ajoute une marge à gauche de 1.5 unités pour espacer la flèche du texte. size-4 définit la taille de l'icône. */}
                    </Link>

                     <div className="h-8 w-px bg-gray-200" />

                    <Link      // Ici, on utilise le composant Link de Next.js pour créer un lien vers la page "/dashboard". Le composant Link est utilisé pour la navigation entre les pages de l'application. buttonVariants est une fonction qui génère des classes CSS pour le bouton en fonction des variantes spécifiées. Cela permet de styliser le bouton de manière cohérente avec le reste de l'application. Par exemple, on peut spécifier des variantes comme size: "sm" pour un bouton de petite taille, et className: "sm:flex items-center gap-1" pour appliquer des classes CSS spécifiques au bouton.
                        href="/sign-up" className={buttonVariants({
                        size: "sm",                                         // Ici, on utilise la fonction buttonVariants pour générer les classes CSS pour le bouton. On peut spécifier des variantes comme size: "sm" pour un bouton de petite taille.
                        className: "flex items-center gap-1.5"
                    })}
                    > 
                        Sign up <ArrowRight className="size-4"/>{/* Ici, on utilise l'icône ArrowRight de la bibliothèque lucide-react pour ajouter une flèche à droite du texte "Dashboard". La classe ml-1.5 ajoute une marge à gauche de 1.5 unités pour espacer la flèche du texte. size-4 définit la taille de l'icône. */}
                    </Link>
                    </>
                    )}
                </div>
              </div> 
        </MaxWidthWrapper>
    </nav>
    )
}