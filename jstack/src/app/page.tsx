import { Heading } from "./components/heading"; // Importation du composant Heading pour les titres
import { MaxWidthWrapper } from "./components/max-width-wrapper"; // Importation du composant MaxWidthWrapper pour gérer la largeur maximale du contenu
import { Check } from "lucide-react"; // Importation de l'icône Check de la bibliothèque lucide-react pour les listes à puces
const Page = () => {
  return (
  <>
     <section className="relative py-24 sm:py-32 bg-brand-25">
       <MaxWidthWrapper className="text-center">
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
            </span> 
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