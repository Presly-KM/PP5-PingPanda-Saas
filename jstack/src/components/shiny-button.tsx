import { AnchorHTMLAttributes } from "react";
import Link from "next/link";                      // Importation du composant Link de Next.js pour la navigation entre les pages.
import { cn } from "@/utils";                // Importation d'une fonction utilitaire cn pour gérer les classes CSS conditionnelles.
import { ArrowRight } from "lucide-react";         // Importation de l'icône ArrowRight de la bibliothèque lucide-react pour représenter une flèche vers la droite.

interface ShinyButtonProps extends                  // Ici, on définit une interface ShinyButtonProps qui étend AnchorHTMLAttributes<HTMLAnchorElement>. Cela signifie que ShinyButtonProps hérite de toutes les propriétés d'un élément ancre HTML (comme href, target, etc.) et peut également inclure des propriétés supplémentaires spécifiques au bouton.
AnchorHTMLAttributes<HTMLAnchorElement> {
     
} 

export const ShinyButton = ({                         // Ici on crée un composant ShinyButton qui est un bouton stylisé. Il accepte des propriétés d'ancre HTML (AnchorHTMLAttributes) et des propriétés supplémentaires. Ces dernières sont passées à l'élément ancre (anchor) qui est rendu par le composant.
    className,                                        // Ici, className est une propriété qui permet de passer des classes CSS pour le style du bouton.
    children,                                         // children est une propriété qui permet de passer le contenu du bouton, comme du texte ou des icônes.
    href,                                             // href est une propriété qui spécifie l'URL vers laquelle le bouton redirige lorsqu'il est cliqué. Si href n'est pas fourni, il utilise '#' par défaut.
    ...props                                          // props est un objet qui contient toutes les autres propriétés passées au composant, comme href, target, etc. Ces propriétés sont utilisées pour configurer le comportement du bouton. Par exemple, href peut être utilisé pour spécifier une URL vers laquelle le bouton redirige lorsqu'il est cliqué.
}: ShinyButtonProps) => {
    return ( 
    <Link 
      href={href ?? "#"}                              // Ici, href est utilisé pour définir l'URL vers laquelle le bouton redirige. Si href n'est pas fourni, il utilise '#' par défaut, ce qui signifie que le bouton ne redirigera nulle part.
      className={cn("group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-brand-700 px-8 text-base/7 font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2" // Ici, cn est une fonction utilitaire qui combine les classes CSS conditionnelles. Elle permet de gérer les classes CSS de manière dynamique en fonction des propriétés passées au composant.
                     , className                      // Ce classname-ci est là pour qu'on puisse mélanger le classname ci dessus avec un classname venant de n'importe quel place ou on utilise ce composant (ShinyButton) pour le rendre réutilisable. Autrement dit : Ici, className est utilisé pour ajouter des classes CSS supplémentaires au bouton. Cela permet de personnaliser le style du bouton en fonction des besoins. 
    )}
     {...props}                                       // Ici, props est utilisé pour passer toutes les autres propriétés d'ancre HTML au composant Link. Cela permet de conserver le comportement standard des liens HTML, comme la navigation vers une URL ou l'ouverture dans un nouvel onglet. Par exemple, si on passe une propriété target="_blank", le bouton s'ouvrira dans un nouvel onglet lorsqu'on cliquera dessus.
     >
      <span className="relative z-10 flex items-center gap-2">  {/* Ici, on utilise un élément <span> pour envelopper le contenu du bouton. Cela permet de styliser le contenu du bouton et de gérer la disposition des éléments à l'intérieur du bouton. */}
        {children}                                             {/* Ici, children est utilisé pour afficher le contenu du bouton, comme du texte ou des icônes. Cela permet de personnaliser le contenu du bouton en fonction des besoins. */}
        <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" /> {/* Ici, ArrowRight est un composant d'icône qui représente une flèche vers la droite. Il est stylisé avec des classes CSS pour sa taille, sa couleur et sa transition lors du survol du bouton. */}
        </span>

        <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]"/>
        </Link>                              
    )
}
