import { Heading } from "./components/heading"; // Importation du composant Heading pour les titres
import { MaxWidthWrapper } from "./components/max-width-wrapper"; // Importation du composant MaxWidthWrapper pour gérer la largeur maximale du contenu

const Page = () => {
  return (
  <>
     <section className="relative py-24 sm:py-32 bg-brand-25">
       <MaxWidthWrapper className="text-center">
        <div className="relative mx-auto text-center flex flex-col items-center gap-10">
          <div>
           <Heading>Real-Time Saas Insights,</Heading>
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