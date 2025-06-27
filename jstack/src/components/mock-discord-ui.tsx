import {PropsWithChildren} from "react"
import {Icons} from "@/components/icons";  // On importe les icônes que nous avons définies dans le fichier icons.tsx. Cela nous permet d'utiliser l'icône Discord dans notre composant MockDiscordUI.
import {PlusCircle} from "lucide-react"; // On importe l'icône PlusCircle de la bibliothèque lucide-react. Cette icône sera utilisée pour représenter l'ajout de nouveaux serveurs dans notre interface utilisateur Discord simulée.

export const MockDiscordUI = ({children}: PropsWithChildren) => {  // Ici, on crée un composant MockDiscordUI qui sera utilisé pour simuler l'interface utilisateur de Discord. Ce composant est une fonction fléchée qui prend en paramètre des props, ici children, qui est de type PropsWithChildren. Cela signifie que ce composant peut recevoir n'importe quel contenu React, comme du texte, des éléments HTML, d'autres composants, etc. Par exemple, si on place du texte ou d'autres composants entre les balises d'ouverture et de fermeture du composant MockDiscordUI dans le fichier page.tsx, ce contenu sera affiché ici dans le composant MockDiscordUI. PropsWithChildren est un type générique de TypeScript qui permet de définir des props qui peuvent contenir des enfants (children) dans un composant React. 
    return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl">  {/* Ici, on crée une div principale qui contiendra toute l'interface utilisateur simulée de Discord. La classe flex permet d'utiliser Flexbox pour la mise en page, min-h-[800px] définit une hauteur minimale de 800 pixels, w-full rend la div pleine largeur, max-w-[1200px] limite la largeur maximale à 1200 pixels, bg-discord-background applique une couleur de fond personnalisée pour Discord, text-white définit la couleur du texte en blanc, rounded-lg arrondit les coins de la div, overflow-hidden cache tout débordement de contenu, et shadow-xl ajoute une ombre portée pour un effet visuel attrayant. */}
       {/* server list */}                       
    <div className= "hidden sm:flex w-[72px] bg-[#202225] py-3 flex-col items-center">        {/* Ici, on crée une div pour la liste des serveurs. La classe hidden sm:flex cache cette div sur les écrans plus petits que "sm" (small), w-[72px] définit une largeur de 72 pixels, bg-[#202225] applique une couleur de fond personnalisée pour Discord, py-3 ajoute un espacement vertical de 3 unités, flex-col aligne les éléments enfants en colonne, et items-center centre les éléments horizontalement. */}
        <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
              <Icons.discord className="size-3/5 text-white" />
        </div>

        <div className="w-8-h-[2px] bg-discord-background rounded-full my-2" /> {/* Ici, on crée une ligne horizontale pour séparer les serveurs. La classe w-8-h-[2px] définit une largeur de 8 pixels et une hauteur de 2 pixels, bg-discord-background applique la couleur de fond personnalisée pour Discord, rounded-full arrondit complètement les bords de la ligne, et my-2 ajoute un espacement vertical de 2 unités. */}

        {[...Array(5)].map((_, i) => (
          <div key={i} className="size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed">  {/* Ici, on crée une liste de 5 serveurs fictifs. La méthode map est utilisée pour itérer sur un tableau de 5 éléments, créant une div pour chaque serveur. La classe size-12 définit une taille de 12 unités, bg-discord-background applique la couleur de fond personnalisée pour Discord, rounded-3xl arrondit les coins de la div, flex items-center justify-center aligne le contenu au centre, mb-3 ajoute un espacement inférieur de 3 unités, hover:rounded-xl change le rayon des coins lors du survol, transition-all duration-200 ajoute une transition fluide de 200 millisecondes pour les changements de style, et cursor-not-allowed indique que l'élément n'est pas interactif. */}
          <span className="text-lg font-semibold text-gray-400"> {/* Ici, on ajoute un texte pour indiquer que ces serveurs sont fictifs. La classe text-lg définit une taille de police large, font-semibold rend le texte semi-gras, et text-gray-400 applique une couleur grise claire au texte. */}
             {String.fromCharCode(65 + i)} {/* On utilise String.fromCharCode(65 + i) pour générer des lettres de l'alphabet (A, B, C, etc.) en fonction de l'index i. Cela permet d'afficher une lettre différente pour chaque serveur fictif. */}
         </span>
          </div>
          ))}

          <div className="group mt-auto size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">  {/* Ici, on crée une div pour ajouter un nouveau serveur. La classe group permet de créer un groupe d'éléments qui peuvent être stylisés ensemble lors du survol. size-12 définit une taille de 12 unités, bg-discord-background applique la couleur de fond personnalisée pour Discord, rounded-3xl arrondit les coins de la div, flex items-center justify-center aligne le contenu au centre, mb-3 ajoute un espacement inférieur de 3 unités, hover:rounded-xl change le rayon des coins lors du survol, transition-all duration-200 ajoute une transition fluide de 200 millisecondes pour les changements de style, et cursor-not-allowed indique que l'élément n'est pas interactif. */}
           <PlusCircle className="text-[#3ba55c] group-hover:text-white"/> {/* Ici, on utilise l'icône PlusCircle pour représenter l'ajout d'un nouveau serveur. La classe text-[#3ba55c] applique une couleur verte à l'icône, et group-hover:text-white change la couleur de l'icône en blanc lors du survol de la div. */}
          </div>   
        </div>
        
        {/* dm list */}
         <div className="hidden md:flex w-60 bg-[#2f3136] flex-col">
            <div className="px-4 h-16 border-b border-[]"></div>
         </div>
        </div>
  ) 
}