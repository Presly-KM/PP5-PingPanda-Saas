import { Heading } from "@/app/components/heading"; // Importation du composant Heading pour les titres
import { MaxWidthWrapper } from "@/app/components/max-width-wrapper"; // Importation du composant MaxWidthWrapper pour gérer la largeur maximale du contenu
import { Check } from "lucide-react"; // Importation de l'icône Check de la bibliothèque lucide-react pour les listes à puces
import { ShinyButton } from "@/app/components/shiny-button"; // Importation du composant ShinyButton pour les boutons stylisés
const Page = () => {
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
     <section></section>
     <section></section>
     <section></section>
  </>
  )
}

export default Page;