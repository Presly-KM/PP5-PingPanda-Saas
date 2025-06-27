import {PropsWithChildren} from "react"
import {Icons} from "@/components/icons";  // On importe les icônes que nous avons définies dans le fichier icons.tsx. Cela nous permet d'utiliser l'icône Discord dans notre composant MockDiscordUI.
import {Headphones, HelpCircle, PlusCircle, UserCircle} from "lucide-react"; // On importe l'icône PlusCircle de la bibliothèque lucide-react. Cette icône sera utilisée pour représenter l'ajout de nouveaux serveurs dans notre interface utilisateur Discord simulée.
import {Inbox} from "lucide-react"; // On importe l'icône Inbox de la bibliothèque lucide-react. Cette icône sera utilisée pour représenter les messages directs dans notre interface utilisateur Discord simulée.
import Image from "next/image"; // On importe le composant Image de Next.js pour afficher des images de manière optimisée dans notre application. Cela nous permet d'utiliser des images avec des dimensions spécifiques et de bénéficier des optimisations de chargement de Next.js.
import {Mic, Cog, Menu, Phone, Pin, Video, Search, Sticker, Gift, Smile} from "lucide-react"; // On importe les icônes Mic et Cog de la bibliothèque lucide-react. Ces icônes seront utilisées pour représenter les paramètres audio et les paramètres de l'utilisateur dans notre interface utilisateur Discord simulée.

export const MockDiscordUI = ({children}: PropsWithChildren) => {  // Ici, on crée un composant MockDiscordUI qui sera utilisé pour simuler l'interface utilisateur de Discord. Ce composant est une fonction fléchée qui prend en paramètre des props, ici children, qui est de type PropsWithChildren. Cela signifie que ce composant peut recevoir n'importe quel contenu React, comme du texte, des éléments HTML, d'autres composants, etc. Par exemple, si on place du texte ou d'autres composants entre les balises d'ouverture et de fermeture du composant MockDiscordUI dans le fichier page.tsx, ce contenu sera affiché ici dans le composant MockDiscordUI. PropsWithChildren est un type générique de TypeScript qui permet de définir des props qui peuvent contenir des enfants (children) dans un composant React. 
    return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl">  {/* Ici, on crée une div principale qui contiendra toute l'interface utilisateur simulée de Discord. La classe flex permet d'utiliser Flexbox pour la mise en page, min-h-[800px] définit une hauteur minimale de 800 pixels, w-full rend la div pleine largeur, max-w-[1200px] limite la largeur maximale à 1200 pixels, bg-discord-background applique une couleur de fond personnalisée pour Discord, text-white définit la couleur du texte en blanc, rounded-lg arrondit les coins de la div, overflow-hidden cache tout débordement de contenu, et shadow-xl ajoute une ombre portée pour un effet visuel attrayant. */}
       {/* server list */}                       
    <div className= "hidden sm:flex w-[72px] bg-[#202225] py-3 flex-col items-center">        {/* Ici, on crée une div pour la liste des serveurs. La classe hidden sm:flex cache cette div sur les écrans plus petits que "sm" (small), w-[72px] définit une largeur de 72 pixels, bg-[#202225] applique une couleur de fond personnalisée pour Discord, py-3 ajoute un espacement vertical de 3 unités, flex-col aligne les éléments enfants en colonne, et items-center centre les éléments horizontalement. */}
        <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
              <Icons.discord className="size-3/5 text-white" />
        </div>

        <div className="w-8 h-[2px] bg-discord-background rounded-full my-2" /> {/* Ici, on crée une ligne horizontale pour séparer les serveurs. La classe w-8-h-[2px] définit une largeur de 8 pixels et une hauteur de 2 pixels, bg-discord-background applique la couleur de fond personnalisée pour Discord, rounded-full arrondit complètement les bords de la ligne, et my-2 ajoute un espacement vertical de 2 unités. */}

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
            <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
                <div className="w-full bg-[#202225] text-sm rounded px-2 h-8 flex items-center justify-center text-gray-500 cursor-not-allowed">
                  Find or start a conversation
                </div> 
            </div>

            <div className="flex-1 overflow-y-auto pt-4">
               <div className="px-2 mb-4">
                  <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
                     <UserCircle className="mr-4 size-8 text-[#b9bbbe]"/>
                     <span className="font-medium text-sm">Friends</span>
               </div>
                  <div className="flex items-center text-sm px-2 py-1.5 rounded hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
                     <Inbox className="mr-4 size-8 text-[#b9bbbe]"/>
                     <span className="font-medium text-sm">Nitro</span>
               </div>
            </div>

            <div className="px-2 mb-4"> 
               <h3 className="text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase">
                  Direct Messages
               </h3>

               <div className="flex items-center px-2 py-1.5 rounded bg-[#393c43] text-white cursor-pointer">
                     <Image 
                         src="/brand-asset-profile-picture.png"  
                         alt= "PingPanda Avatar" 
                         width={32} 
                         height={32}
                         className="object-cover rounded-full mr-3"
                        />
                     <span className="font-medium">PingPanda</span>
               </div>

               <div className="my-1 space-y-px">
                  {[...Array(4)].map((_, i) => (                // On crée une liste de 4 éléments fictifs pour les messages directs. La méthode map est utilisée pour itérer sur un tableau de 4 éléments, créant une div pour chaque message direct. _, i) => (  // Ici, _ est un paramètre qui représente l'élément actuel du tableau, mais il n'est pas utilisé dans ce cas. i est l'index de l'élément actuel dans le tableau. On ne prete paas attention au contenu donc on decide d'inserer un underscore "_" pour indiquer que nous n'allons pas utiliser cette variable. C'est une convention courante en JavaScript et TypeScript pour indiquer que la variable n'est pas utilisée, qu'un paramètre est requis mais pas utilisé, ou pour éviter les avertissements de linter concernant les variables inutilisées. Les devs qui passeront par la suite sur ce code comprendront que nous n'avons pas besoin de cette variable.
                     <div key={i} className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed"  // Ici, on crée une div pour chaque message direct. La classe flex items-center aligne les éléments enfants en ligne et les centre verticalement, px-2 ajoute un espacement horizontal de 2 unités, py-1.5 ajoute un espacement vertical de 1.5 unités, rounded arrondit les coins de la div, text-gray-600 applique une couleur grise claire au texte, et cursor-not-allowed indique que l'élément n'est pas interactif. key={i} est utilisé pour donner une clé unique à chaque élément de la liste, ce qui est important pour React afin de suivre les éléments lors du rendu. suivre c'est a dire que React utilise cette clé pour identifier chaque élément de la liste et optimiser le rendu. Si les éléments de la liste changent, React peut utiliser ces clés pour déterminer quels éléments ont été ajoutés, supprimés ou modifiés, ce qui améliore les performances de l'application.
                     >
                        <div className="size-8 rounded-full bg-discord-background mr-3"/>
                        <span className="font-medium">User {i + 1}</span> {/* On utilise i + 1 pour afficher un numéro d'utilisateur à partir de 1. */}
                     </div>    
                  ))}
               </div>
            </div>
         </div>
         <div className="p-2 bg-[#292b2f] flex items-center"> 
            <div className="size-8 rounded-full bg-brand-700 mr-2" /> {/* Ici, on crée une div pour représenter l'avatar de l'utilisateur connecté. La classe size-8 définit une taille de 8 unités, rounded-full arrondit complètement les bords de la div, bg-brand-700 applique une couleur de fond personnalisée pour Discord, et mr-2 ajoute un espacement droit de 2 unités. */}
            <div className="flex-1"> 
               <p className="text-sm font-medium text-white">You</p> {/* Ici, on crée un paragraphe pour afficher le nom de l'utilisateur connecté. La classe text-sm définit une taille de police petite, font-medium rend le texte semi-gras, et text-white applique une couleur blanche au texte. */}
               <p className="text-xs text-[#b9bbbe] flex items-center">
                  @your_account 
               </p> {/* Ici, on crée un paragraphe pour afficher le nom d'utilisateur. La classe text-xs définit une taille de police très petite, text-[#b9bbbe] applique une couleur grise claire au texte, et flex items-center aligne les éléments enfants en ligne et les centre verticalement. */}
               </div>

               <div className="flex items-center space-x-2"> 
                  <Mic className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer"/> {/* Ici, on utilise l'icône Mic pour représenter les paramètres audio. La classe size-5 définit une taille de 5 unités, text-[#b9bbbe] applique une couleur grise claire au texte, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-pointer indique que l'icône est interactive. */}
                  <Headphones className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer"/> {/* Ici, on utilise l'icône Headphones pour représenter les paramètres audio. La classe size-5 définit une taille de 5 unités, text-[#b9bbbe] applique une couleur grise claire au texte, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-pointer indique que l'icône est interactive. */}
                  <Cog className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer"/> {/* Ici, on utilise les icônes Mic et Cog pour représenter les paramètres audio et les paramètres de l'utilisateur. La classe size-5 définit une taille de 5 unités, text-[#b9bbbe] applique une couleur grise claire au texte, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-pointer indique que l'icône est interactive. */}
                  </div>
                  </div>
                  </div>
                  
               {/* main content */}
               <div className="flex-1 flex flex-col">
                  {/* dm header */}
                  <div className="h-16 bg-[#36393f] flex items-center px-4 shadow-sm border-b border-[#202225]">  {/* Ici, on crée une div pour l'en-tête des messages directs. La classe h-16 définit une hauteur de 16 unités, bg-[#36393f] applique une couleur de fond personnalisée pour Discord, flex items-center aligne les éléments enfants en ligne et les centre verticalement, px-4 ajoute un espacement horizontal de 4 unités, shadow-sm ajoute une ombre portée légère, et border-b border-[#202225] ajoute une bordure inférieure de couleur personnalisée pour Discord. */}
                     <div className="md:hidden mr-4"> {/* Ici, on crée une div pour le bouton de menu qui sera visible uniquement sur les écrans plus petits que "md" (medium). La classe md:hidden cache cette div sur les écrans plus grands. mr-4 ajoute un espacement droit de 4 unités. */}
                    <Menu className="size-6 text-[#b9bbbe] hover:text-white cursor-pointer" /> {/* Ici, on utilise l'icône Menu pour représenter le bouton de menu. La classe size-6 définit une taille de 6 unités, text-[#b9bbbe] applique une couleur grise claire au texte, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-pointer indique que l'icône est interactive. */}
                     </div>
                     
                     <div className="flex items-center "> {/* Ici, on crée une div pour contenir le titre des messages directs. La classe flex items-center aligne les éléments enfants en ligne et les centre verticalement. */}
                        <div className="relative">
                           <Image 
                              src="/brand-asset-profile-picture.png" 
                              alt="PingPanda Avatar" 
                              width={40} 
                              height={40}
                              className="object-cover rounded-full mr-3"
                           /> {/* Ici, on utilise le composant Image de Next.js pour afficher l'avatar de l'utilisateur. src="/brand-asset-profile-picture.png" spécifie le chemin de l'image, alt="PingPanda Avatar" fournit une description de l'image pour l'accessibilité, width={40} et height={40} définissent les dimensions de l'image, et className="object-cover rounded-full mr-3" applique des styles CSS pour que l'image soit recadrée correctement, arrondie et espacée à droite. */}
                           <div className="absolute bottom-0 right-3 size-3 bg-green-500 rounded-full border-2 border-[#36393f]"/> {/* Ici, on crée une div pour représenter le statut en ligne de l'utilisateur. La classe absolute positionne la div par rapport à son parent, bottom-0 la place en bas, right-3 la place à droite avec un espacement de 3 unités, size-3 définit une taille de 3 unités, bg-green-500 applique une couleur de fond verte pour indiquer que l'utilisateur est en ligne, rounded-full arrondit complètement les bords de la div, et border-2 border-[#36393f] ajoute une bordure de 2 unités de couleur personnalisée pour Discord. */}
                        </div>

                        <p className="font-semibold text-white">PingPanda</p> {/* Ici, on crée un paragraphe pour afficher le nom de l'utilisateur. La classe font-semibold rend le texte semi-gras, et text-white applique une couleur blanche au texte. */}
            </div>

            <div className="ml-auto flex items-center space-x-4 text-[#b9bbbe]"> 
               <Phone className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Phone pour représenter les appels. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
               <Video className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Inbox pour représenter les messages directs. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
               <Pin className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Pin pour représenter les épingles. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
               <UserCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône UserCircle pour représenter le profil de l'utilisateur. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
               <Search className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Search pour représenter la recherche. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
               <Inbox className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Inbox pour représenter les messages directs. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}   
               <HelpCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône HelpCircle pour représenter l'aide. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, cursor-not-allowed indique que l'icône n'est pas interactive, et hidden sm:block cache cette icône sur les écrans plus petits que "sm" (small). */}
            </div>
         </div>
         {/* message history*/}
         <div className="flex-1 overflow-y-auto p-4 bg-discord-background flex flex-col-reverse">
            {children}
            </div>

         {/* message input */}
         <div className="p-4">
            <div className="flex items-center bg-[#40444b] rounded-lg p-1">
               <PlusCircle className="mx-3 text-[#b9bbbe] hover:text-white cursor-not-allowed" /> {/* Ici, on utilise l'icône PlusCircle pour représenter l'ajout de fichiers ou d'images. La classe mx-3 ajoute un espacement horizontal de 3 unités, text-[#b9bbbe] applique une couleur grise claire au texte, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-not-allowed indique que l'icône n'est pas interactive. */}
               <input              // On crée un champ de saisie pour les messages. La classe flex-1 permet au champ de prendre tout l'espace disponible, bg-transparent rend le fond transparent, py-2.5 ajoute un espacement vertical de 2.5 unités, px-1 ajoute un espacement horizontal de 1 unité, text-white applique une couleur blanche au texte, placeholder-[#72767d] applique une couleur grise claire au texte du placeholder, focus:outline-none supprime le contour par défaut du champ de saisie, et cursor-not-allowed indique que le champ est en lecture seule (readOnly). */}
               readOnly 
               type="text"  
               placeholder="Message @PingPanda" // Placeholder="Message @PingPanda" est le texte qui s'affiche dans le champ de saisie lorsque celui-ci est vide. Il indique à l'utilisateur qu'il peut envoyer un message à l'utilisateur PingPanda.
               className="flex-1 bg-transparent py-2.5 px-1 text-white placeholder-[#72767d] focus:outline-none cursor-not-allowed"/> {/* Ici, on crée un champ de saisie pour les messages. La classe flex-1 permet au champ de prendre tout l'espace disponible, bg-transparent rend le fond transparent, text-white applique une couleur blanche au texte, outline-none supprime le contour par défaut du champ de saisie, et placeholder:text-[#b9bbbe] applique une couleur grise claire au texte du placeholder. Le champ est en lecture seule (readOnly) pour simuler l'interface utilisateur de Discord. */}
             <div className="flex items-center space-x-3 mx-3 text-[#b9bbbe]"> {/* Ici, on crée une div pour contenir les icônes supplémentaires. La classe flex items-center aligne les éléments enfants en ligne et les centre verticalement, space-x-3 ajoute un espacement horizontal de 3 unités entre les icônes, et mx-3 ajoute un espacement horizontal de 3 unités à gauche et à droite. */}
               <Gift className="size-5 hover:text-white cursor-not-allowed hidden sm:block" /> {/* Ici, on utilise l'icône Mic pour représenter les paramètres audio. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-not-allowed indique que l'icône n'est pas interactive. */}
               <Sticker className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Video pour représenter les paramètres vidéo. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-not-allowed indique que l'icône n'est pas interactive. */}
               <Smile className="size-5 hover:text-white cursor-not-allowed hidden sm:block"/> {/* Ici, on utilise l'icône Pin pour représenter les épingles. La classe size-5 définit une taille de 5 unités, hover:text-white change la couleur de l'icône en blanc lors du survol, et cursor-not-allowed indique que l'icône n'est pas interactive. */}
            </div>
         </div>
      </div>
      </div>  
      </div>
  ) 
}