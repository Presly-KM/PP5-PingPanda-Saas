import { cn } from "@/utils"             // cn est une fonction utilitaire qui permet de combiner plusieurs classes CSS en une seule chaîne. Elle est souvent utilisée pour conditionnellement ajouter des classes CSS en fonction des props ou de l'état du composant. Par exemple, si on veut ajouter une classe CSS supplémentaire si une prop est vraie, on peut utiliser cn pour le faire de manière concise et lisible.
import { HTMLAttributes, ReactNode } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {// HeadingProps est une interface qui étend HTMLAttributes pour inclure tous les attributs HTML valides pour un élément <h1>. Cela signifie que notre composant Heading peut accepter n'importe quel attribut HTML valide pour un élément <h1>, comme className, id, style, etc. Par exemple, si on veut ajouter une classe CSS pour styliser le titre, on peut le faire en passant className comme prop au composant Heading.
  children?: ReactNode // children est un prop optionnel qui peut contenir n'importe quel contenu React, comme du texte ou d'autres composants. Cela signifie que notre composant Heading peut afficher n'importe quel contenu à l'intérieur de lui-même, ce qui le rend flexible et réutilisable.
}

// On veut créer un composant Heading qui affiche un titre avec des styles personnalisés. Désormais, les titres de notre application seront cohérents et faciles à modifier. En résumé, répresenter un element "Heading" dans notre application, est la meme chose que réprésenter chacun des éléments <h1> dans notre application mais juste avec des styles personnalisés appliqués a ces dits éléments <h1>.
export const Heading = ( { children, className, ...props }: HeadingProps) =>   // Heading est un composant qui affiche un titre avec des styles personnalisés. Il accepte des props pour le contenu du titre, les classes CSS et d'autres attributs HTML. hEadingProps est une interface qui définit les types des props que le composant peut recevoir. Comme on peut le voir dans les lignes ci-dessus, elle étend HTMLAttributes pour inclure tous les attributs HTML valides pour un élément <h1>.
 {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800",
        className
      )}
      {...props}               // {...props} permet de passer tous les autres attributs HTML valides au composant <h1>. Par exemple, si on veut ajouter un id ou un style personnalisé, on peut le faire en passant ces attributs au composant Heading. Cela rend le composant flexible et réutilisable dans différentes situations.
    >
      {children}               {/* {children} est le contenu du titre, qui peut être du texte ou d'autres composants React. */}
    </h1>
  )
}

