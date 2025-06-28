import { Heading } from "@/components/heading"; // Importation du composant Heading pour les titres
import { MaxWidthWrapper } from "@/components/max-width-wrapper"; // Importation du composant MaxWidthWrapper pour gérer la largeur maximale du contenu
import { Check } from "lucide-react"; // Importation de l'icône Check de la bibliothèque lucide-react pour les listes à puces
import { ShinyButton } from "@/components/shiny-button"; // Importation du composant ShinyButton pour les boutons stylisés
import { MockDiscordUI } from "@/components/mock-discord-ui"; // Importation du composant MockDiscordUI pour simuler l'interface utilisateur de Discord
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list";
import { DiscordMessage } from "@/components/discord-message"; // Importation du composant DiscordMessage pour afficher les messages Discord

const Page = () => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "romeo.santaolalla@gmail.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
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
            no matter if you're at home or on the go.</p>
          </div>
        </div>
      </div>
     </div>
       </MaxWidthWrapper>
      </section>
     <section></section>
  </>
  )
}

export default Page;