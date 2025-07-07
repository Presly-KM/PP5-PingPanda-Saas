import { Heading } from "@/components/heading"; // Importation du composant Heading pour les titres
import { MaxWidthWrapper } from "@/components/max-width-wrapper"; // Importation du composant MaxWidthWrapper pour gérer la largeur maximale du contenu
import { Check } from "lucide-react"; // Importation de l'icône Check de la bibliothèque lucide-react pour les listes à puces
import { ShinyButton } from "@/components/shiny-button"; // Importation du composant ShinyButton pour les boutons stylisés
import { MockDiscordUI } from "@/components/mock-discord-ui"; // Importation du composant MockDiscordUI pour simuler l'interface utilisateur de Discord
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list";
import { DiscordMessage } from "@/components/discord-message"; // Importation du composant DiscordMessage pour afficher les messages Discord
import Image from "next/image"; // Importation du composant Image de Next.js pour afficher les images de manière optimisée par exemple pour le chargement paresseux et la gestion des tailles d'image
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'; // Importation du composant Prism pour la coloration syntaxique du code
import { oneDark  } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Star} from "lucide-react";
import { Icons } from "@/components/icons";

const Page = () => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {      // On utilise fetch pour envoyer une requête POST à l'API pour enregistrer un événement.
  method: "POST",
  body: JSON.stringify({                                                        // On envoie un objet JSON contenant les détails de l'événement.
    category: "sale",
    fields: {
      plan: "PRO",
      email: "romeo.santaolalla@gmail.com",
      amount: 49.00
    }
  }),
  headers: {                                                                     // On définit les en-têtes de la requête, y compris le type de contenu et l'autorisation.
    Authorization: "Bearer <YOUR_API_KEY>"                                       , // L'utiliateur pour profiter de nos services doit s'authentifier avec une clé API.
  }
})`
  
  
  return (
  <>
     <section className="relative py-24 sm:py-32 bg-brand-25">      {/* Ici, on utilise une section pour encapsuler le contenu principal de la page. La classe CSS relative permet de positionner les éléments enfants par rapport à cette section. Les classes py-24 et sm:py-32 définissent l'espacement vertical (padding) pour la section, avec des valeurs différentes pour les écrans plus petits (sm). bg-brand-25 applique une couleur de fond personnalisée définie dans le fichier tailwind.config.ts. */}
       <MaxWidthWrapper className="text-center">                      {/* MaxWidthWrapper est un composant qui gère la largeur maximale du contenu. Il est utilisé pour s'assurer que le contenu de la section est centré et ne dépasse pas une certaine largeur. La classe text-center aligne le texte au centre de la section. */}
        <div className="relative mx-auto text-center flex flex-col items-center gap-10">
          <div>
           <Heading>
            <span>Real-Time Saas Insights,</span>
            <br />
            <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">   {/* bg-gradient-to-r crée un dégradé de couleur de gauche à droite, de brand-700 à brand-800. text-transparent rend le texte transparent, permettant au dégradé de couleur de se voir à travers le texte. bg-clip-text applique le dégradé de couleur au texte lui-même, créant un effet visuel attrayant. brand est une couleur définie dans le fichier tailwind.config.ts, représentant une palette de couleurs personnalisée (par nous) pour l'application. */}
              Delivered to Your Discord
              </span>
            </Heading>
          </div>

          <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
          PingPanda is the easiest way to monitor your Saas. Get
          instant 
          notifications for{" "}
          <span className="font-semibold text-gray-700">
            sales, new users, or any other event 
            </span>{" "}
            sent directly to your Discord.
            </p>

            <ul className="space-y-2 text-base/7 text-gray-600
             text-left flex flex-col items-start">
            {[
              "Real-time Discord alerts for critical events",
              "Buy once, use forever",
              "Track sales, new users, or any other event",
            ].map((item, index) => (                                        // On utilise la méthode map pour itérer sur chaque élément du tableau et créer un élément de liste <li> pour chaque item. Chaque élément de liste contient le texte de l'item et est stylisé avec des classes CSS pour l'alignement et l'espacement.
              <li key={index} className="flex gap-1.5 items-center text-left">        {/* key={index} est utilisé pour donner une clé unique à chaque élément de la liste, ce qui est important pour React afin de suivre les éléments lors du rendu. */}
                <Check className="size-5 shrink-0 text-brand-700"/>
                {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton 
                 href="/sign-up" 
                 className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
                 >
                  Start For Free Today
              </ShinyButton>             {/* ShinyButton est un composant personnalisé qui représente un bouton stylisé, probablement avec des effets visuels attrayants. */}
            </div>
        </div>
        </MaxWidthWrapper>  {/* Ici, MaxWidthWrapper est un composant qui gère la largeur maximale du contenu il uniformise le styling à travers toute notre application. On peut toujours utiliser ce "component réutilisable" afin de s'assurer que la largeur dans notre landing page ou dans le tableau de bord etc. sera toujours le même   */}
     </section>

     <section className="relative bg-brand-25 pb-4">
      <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
      <div className="relative mx-auto">
        <MaxWidthWrapper className="relative"> 
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <MockDiscordUI>
            <AnimatedList>
              <DiscordMessage   
                avatarSrc="/brand-asset-profile-picture.png" 
                avatarAlt="PingPanda Avatar"
                username="PingPanda"
                timestamp="Today at 12:35PM"
                badgeText="SignUp"
                badgeColor="#43b581"
                title="👤 New user signed up"
                content={{
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                }}
              />        
              <DiscordMessage   
                avatarSrc="/brand-asset-profile-picture.png" 
                avatarAlt="PingPanda Avatar"
                username="PingPanda"
                timestamp="Today at 12:35PM"
                badgeText="Revenue"
                badgeColor="#faa61a"
                title="💰 Payment received"
                content={{
                  amount: "$49.00",
                  email: "romeo.santaolalla@gmail.com",
                  plan: "PRO",
                }}
              />        
              <DiscordMessage   
                avatarSrc="/brand-asset-profile-picture.png" 
                avatarAlt="PingPanda Avatar"
                username="PingPanda"
                timestamp="Today at 5:11PM"
                badgeText="Milestone"
                badgeColor="#5865f2"
                title="🚀 Revenue Milestone Achieved"
                content={{
                  recurringRevenue: "$5.000.USD",
                  growth: "+8.2%",
                }}
              />        
            </AnimatedList>
          </MockDiscordUI>
          </div>
        </MaxWidthWrapper>
      </div>
     </section>

     <section className="relative py-24 sm:py-32 bg-brand-25">
     <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
      <div>
        <h2 className="text-center text-base/7 font-semibold text-brand-600">
        Intuitive Monitoring
        </h2>
        <Heading>Stay ahead with real-time insights</Heading>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
       {/*first bento grid element*/}
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />  {/* Ici, on utilise une div avec la classe absolute pour créer un fond blanc arrondi qui s'étend sur toute la largeur et la hauteur de l'élément parent. La classe inset-px permet de définir les marges intérieures (padding) à 1 pixel, et lg:rounded-l-[2rem] arrondit le coin gauche de l'élément à 2 rem sur les écrans plus larges. */}

          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">   {/* Ici, on utilise une div avec la classe relative pour créer un conteneur flexible qui s'étend sur toute la hauteur de l'élément parent. La classe flex permet d'utiliser Flexbox pour aligner les éléments enfants, et overflow-hidden masque tout contenu qui dépasse les limites du conteneur. rounded-[calc(theme(borderRadius.lg)+1px)] arrondit les coins de l'élément en utilisant la valeur de borderRadius.lg définie dans le fichier tailwind.config.ts, plus 1 pixel pour compenser la bordure. lg:rounded-l-[calc(2rem+1px)] arrondit le coin gauche de l'élément à 2 rem plus 1 pixel sur les écrans plus larges. */}
           <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
            <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center"> Real-Time notifications</p> {/* Ici, on utilise une balise <p> pour afficher le texte "Real-Time notifications". La classe mt-2 ajoute une marge supérieure de 2 unités, text-lg/7 définit la taille du texte à 7 unités, font-medium applique une graisse de police moyenne, tracking-tight réduit l'espacement entre les lettres, et text-brand-950 applique une couleur de texte personnalisée définie dans le fichier tailwind.config.ts. max-lg:text-center aligne le texte au centre MAIS UNIQUEMENT sur les écrans plus petits que "lg" (large). */}
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
            Get notified about critical events the moment they happen, 
            no matter if you're at home or on the go.
            </p>
          </div>

          <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm"> {/* Ici, on utilise une div avec la classe relative pour créer un conteneur flexible qui s 'étend sur toute la largeur de l'élément parent. min-h-[30rem] définit une hauteur minimale de 30 rem, w-full permet à l'élément de prendre toute la largeur disponible, et grow permet à l'élément de s'étendre pour remplir l'espace disponible. [container-type:inline-size] est une propriété CSS qui permet à l'élément de s'adapter à la taille de son conteneur parent. max-lg:mx-auto centre l'élément horizontalement sur les écrans plus petits que "lg" (large), et max-lg:max-w-sm limite la largeur maximale de l'élément à "sm" (small) sur les écrans plus petits. */}
          <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">      {/* Ici, on utilise une div avec la classe absolute pour créer un fond gris foncé arrondi qui s'étend sur toute la largeur de l'élément parent. inset-x-10 définit les marges intérieures (padding) à 10 unités sur les côtés gauche et droit, bottom-0 et top-10 définissent les marges inférieure et supérieure respectivement. overflow-hidden masque tout contenu qui dépasse les limites du conteneur. rounded-t-[12cqw] arrondit le coin supérieur de l'élément à 12 unités de largeur de conteneur, border-x-[3cqw] et border-t-[3cqw] définissent les bordures gauche, droite et supérieure respectivement à 3 unités de largeur de conteneur, border-gray-700 applique une couleur de bordure personnalisée définie dans le fichier tailwind.config.ts, et shadow-2xl ajoute une ombre portée à l'élément. 12cqw etc. permet de styliser ou regler le border raduis en accord avec le parent, ou n'importequel div se trouvant au dessus de l'enfant ci-contre qui contient la mention "[container-type:inline-size]". Ce borad radius est maintenant relatif au parent et ce par rapport auu viewport ce qui lui permet de toujours garder exactement la forme qu'on veut qu'il ait quelque soit la taille de l'écran. Pourquoi ? Parce c'est quelque soit le contexte tout est réglé pour etre relatif au parent ! Donc en résumé ce border-radius se rétrécit et se grossit AVEC le parent. Le meme principe "d'héritage" s'applique au "border" qui suivent  */}
             <Image 
               className="size-full object-cover object-top" 
                    src="/phone-screen.png" 
                    alt="Phone screen displaying app interface"
                    fill
                    />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"/>
      </div>

      {/* Second bento grid element*/}
      <div className="relative max-lg:row-start-1">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] "/> {/* Ici, on utilise une div avec la classe absolute pour créer un fond blanc arrondi qui s'étend sur toute la largeur et la hauteur de l'élément parent. La classe inset-px permet de définir les marges intérieures (padding) à 1 pixel, et max-lg:rounded-t-[2rem] arrondit le coin supérieur de l'élément à 2 rem sur les écrans plus petits que "lg" (large). */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"> {/* Ici, on utilise une div avec la classe relative pour créer un conteneur flexible qui s'étend sur toute la hauteur de l'élément parent. La classe flex permet d'utiliser Flexbox pour aligner les éléments enfants, et overflow-hidden masque tout contenu qui dépasse les limites du conteneur. rounded-[calc(theme(borderRadius.lg)+1px)] arrondit les coins de l'élément en utilisant la valeur de borderRadius.lg définie dans le fichier tailwind.config.ts, plus 1 pixel pour compenser la bordure. max-lg:rounded-t-[calc(2rem+1px)] arrondit le coin supérieur de l'élément à 2 rem plus 1 pixel sur les écrans plus petits que "lg" (large). */}
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">   {/* Ici, on utilise une div avec la classe px-8 pour ajouter un padding horizontal de 8 unités, et sm:px-10 pour ajouter un padding horizontal de 10 unités sur les écrans plus larges. pt-8 ajoute un padding supérieur de 8 unités, et sm:pt-10 ajoute un padding supérieur de 10 unités sur les écrans plus larges. */}
            <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center"> Track Any Event</p> {/* Ici, on utilise une balise <p> pour afficher le texte "Real-Time notifications". La classe mt-2 ajoute une marge supérieure de 2 unités, text-lg/7 définit la taille du texte à 7 unités, font-medium applique une graisse de police moyenne, tracking-tight réduit l'espacement entre les lettres, et text-brand-950 applique une couleur de texte personnalisée définie dans le fichier tailwind.config.ts. max-lg:text-center aligne le texte au centre MAIS UNIQUEMENT sur les écrans plus petits que "lg" (large). */}
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
               From new user signups to successful payments, PingPanda notifies you for all critical events in your Saas. 
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
            <Image                         
              className="w-full max-lg:max-w-xs" 
              src="/bento-any-event.png" 
              alt="Bento box illustrating event tracking" 
              width={500} 
              height={300} 
              />      {/* Ici, on utilise une balise <Image> pour afficher une image. La classe w-full permet à l'image de prendre toute la largeur disponible, max-lg:max-w-xs limite la largeur maximale de l'image à "xs" (extra small) sur les écrans plus petits que "lg" (large). */}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"/>
        </div>

      {/* Third bento grid element*/}
      <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <div className="absolute inset-px rounded-lg bg-white "/> {/* Ici, on utilise une div avec la classe absolute pour créer un fond blanc arrondi qui s'étend sur toute la largeur et la hauteur de l'élément parent. La classe inset-px permet de définir les marges intérieures (padding) à 1 pixel. */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]"> {/* Ici, on utilise une div avec la classe relative pour créer un conteneur flexible qui s'étend sur toute la hauteur de l'élément parent. La classe flex permet d'utiliser Flexbox pour aligner les éléments enfants, et overflow-hidden masque tout contenu qui dépasse les limites du conteneur. rounded-[calc(theme(borderRadius.lg)+1px)] arrondit les coins de l'élément en utilisant la valeur de borderRadius.lg définie dans le fichier tailwind.config.ts, plus 1 pixel pour compenser la bordure. */}
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center"> Track Any Properties</p> {/* Ici, on utilise une balise <p> pour afficher le texte "Real-Time notifications". La classe mt-2 ajoute une marge supérieure de 2 unités, text-lg/7 définit la taille du texte à 7 unités, font-medium applique une graisse de police moyenne, tracking-tight réduit l'espacement entre les lettres, et text-brand-950 applique une couleur de texte personnalisée définie dans le fichier tailwind.config.ts. max-lg:text-center aligne le texte au centre MAIS UNIQUEMENT sur les écrans plus petits que "lg" (large). */}
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
               Add any custom data you like to an event, such as user email, a purchase amount or an exceeded quota.  
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2"> {/* Ici, on utilise une div avec la classe flex pour créer un conteneur flexible qui aligne les éléments enfants horizontalement. items-center centre les éléments verticalement, justify-center centre les éléments horizontalement, et px-8 ajoute un padding horizontal de 8 unités. max-lg:pb-12 et max-lg:pt-10 ajoutent respectivement un padding inférieur de 12 unités et un padding supérieur de 10 unités sur les écrans plus petits que "lg" (large). sm:px-10 ajoute un padding horizontal de 10 unités sur les écrans plus larges, et lg:pb-2 ajoute un padding inférieur de 2 unités sur les écrans plus larges. */}
            <Image                         
              className="w-full max-lg:max-w-xs" 
              src="/bento-custom-data.png"
              alt="Bento box illustrating custom data tracking"
              width={500}
              height={300}
              />     
       </div>     
      </div>

      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"/>
      </div>

      {/* Fourth bento grid element*/}
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"/> {/* Ici, on utilise une div avec la classe absolute pour créer un fond blanc arrondi qui s'étend sur toute la largeur et la hauteur de l'élément parent. La classe inset-px permet de définir les marges intérieures (padding) à 1 pixel, et max-lg:rounded-b-[2rem] arrondit le coin inférieur de l'élément à 2 rem sur les écrans plus petits que "lg" (large). lg:rounded-r-[2rem] arrondit le coin droit de l'élément à 2 rem sur les écrans plus larges. */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]"> {/* Ici, on utilise une div avec la classe relative pour créer un conteneur flexible qui s'étend sur toute la hauteur de l'élément parent. La classe flex permet d'utiliser Flexbox pour aligner les éléments enfants, et overflow-hidden masque tout contenu qui dépasse les limites du conteneur. rounded-[calc(theme(borderRadius.lg)+1px)] arrondit les coins de l'élément en utilisant la valeur de borderRadius.lg définie dans le fichier tailwind.config.ts, plus 1 pixel pour compenser la bordure. max-lg:rounded-b-[calc(2rem+1px)] arrondit le coin inférieur de l'élément à 2 rem plus 1 pixel sur les écrans plus petits que "lg" (large), et lg:rounded-r-[calc(2rem+1px)] arrondit le coin droit de l'élément à 2 rem plus 1 pixel sur les écrans plus larges. */}
          <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
            <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center"> Easy Integration</p> {/* Ici, on utilise une balise <p> pour afficher le texte "Real-Time notifications". La classe mt-2 ajoute une marge supérieure de 2 unités, text-lg/7 définit la taille du texte à 7 unités, font-medium applique une graisse de police moyenne, tracking-tight réduit l'espacement entre les lettres, et text-brand-950 applique une couleur de texte personnalisée définie dans le fichier tailwind.config.ts. max-lg:text-center aligne le texte au centre MAIS UNIQUEMENT sur les écrans plus petits que "lg" (large). */}
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
               Connect PingPanda with your existing workflows in minutes and call our intuitive logging API from any language.
            </p>
           </div>

           <div className="relative min-h-[30rem] w-full grow">
            <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
              <div className="flex bg-gray-800/40 ring-1 ring-white/5"> 
                <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                  <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                  pingpanda.js
                </div>
                </div>
               </div> 

                  <div className="overflow-hidden">
                    <div className="max-h-[30rem] ">
                        <SyntaxHighlighter 
                          language="typescript" 
                          style={{
                            ...oneDark, 
                            'pre[class*="language-"]': {
                            ...oneDark['pre[class*="language-"]'], 
                            background:"transparent",
                            overflow:"hidden",
                          },
                            'code[class*="language-"]': {
                            ...oneDark['code[class*="language-"]'], 
                            background:"transparent",
                          },
                        }}
                        >
                          {codeSnippet}           
                        </SyntaxHighlighter>
                    </div>
                </div>
              </div>
           </div>
        </div>

        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"/>
       </div>
     </div>
       </MaxWidthWrapper>
      </section>

     <section className="relative py-24 sm:py-32 bg-white">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
        <div>
          <h2 className="text-center text-base/7 font-semibold text-brand-600">
            Real-World Experiences 
            </h2>
          <Heading className="text-center">What our customers say</Heading>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* first customer review*/}
          <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
            <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
              PingPanda has been a game-changer for me. I've been using it for two months now and seeing sales pop up in real-time is super satisfying. 
              </p>
              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image 
                  src="/user-2.png" 
                  className="rounded-full object-cover" 
                  alt="Random user"
                  width={48}
                  height={48}
                  />
                  <div className="flex flex-col items-center sm:items-start">
                    <p className="font-semibold flex items-center">
                      Maria Vanela
                      <Icons.verificationBadge className="size-4 inline-block ml-1.5"/> {/* Ici, on utilise une balise <p> pour afficher le nom de l'utilisateur "Temari Vanela". La classe font-semibold applique une graisse de police semi-grasse, et flex items-center aligne les éléments horizontalement. Icons.verificationBadge est un composant qui représente une icône de badge de vérification. */}
                     </p>
                     <p className="text-sm text-gray-600">@itsmaria</p>
                     </div>
                </div>
            </div>

          {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
            <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
              PingPanda's been paying off our Saas. Nice to have simple way to see how we're doing day-to-day. Definitely makes our lives easier. 
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image 
                  src="/user-1.png" 
                  className="rounded-full object-cover" 
                  alt="Random user"
                  width={48}
                  height={48}
                  />
                  <div className="flex flex-col items-center sm:items-start">
                    <p className="font-semibold flex items-center">
                      Sean Philipps
                      <Icons.verificationBadge className="size-4 inline-block ml-1.5"/> {/* Ici, on utilise une balise <p> pour afficher le nom de l'utilisateur "Temari Vanela". La classe font-semibold applique une graisse de police semi-grasse, et flex items-center aligne les éléments horizontalement. Icons.verificationBadge est un composant qui représente une icône de badge de vérification. */}
                     </p>
                     <p className="text-sm text-gray-600">@seanphilipps_</p>
                     </div>
                </div>
            </div>
        </div>

        <ShinyButton 
          href="/sign-up" 
          className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Start For Free Today
          </ShinyButton> {/* Ici, on utilise le composant ShinyButton pour créer un bouton stylisé. La classe relative z-10 positionne le bouton au-dessus des autres éléments, h-14 définit la hauteur du bouton à 14 unités, w-full permet au bouton de prendre toute la largeur disponible, max-w-xs limite la largeur maximale du bouton à "xs" (extra small), text-base définit la taille du texte à 1 unité, shadow-lg ajoute une ombre portée au bouton, et transition-shadow duration-300 hover:shadow-xl ajoute une transition d'ombre lors du survol du bouton. */}
        </MaxWidthWrapper>
     </section>
  </>
  )
}

export default Page;