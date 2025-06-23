import { cn } from '@/utils';
import { ReactNode } from 'react'; // On importe React pour pouvoir utiliser JSX et les types de React.
                                        // On a intégré des props pour notre composant MaxWidthWrapper ligne 8. Maintenant on va définir le type de ces props. C'est une bonne pratique de typer les props de nos composants pour éviter les erreurs et améliorer la lisibilité du code.
interface MaxWidthWrapperProps {        // Ici on définit les props que notre composant MaxWidthWrapper va recevoir.
    className?: string;                 // Ici className est optionnel, on peut lui passer une classe CSS pour personnaliser le style du composant. Cela signifie que si on ne lui passe pas de classe, il utilisera une classe par défaut. string est le type de données attendu pour className, ce qui signifie qu'on peut lui passer une chaîne de caractères ou rien du tout (undefined). 
    children: ReactNode          // Ici children est obligatoire, c'est le contenu qui sera affiché à l'intérieur du composant MaxWidthWrapper.
}

export const MaxWidthWrapper = ({
    className, 
    children,
}: MaxWidthWrapperProps) => {
  return (
  <div 
  className={cn(
    "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", 
    className
  )}
>
    {children}  {/* Ici on utilise les props children pour afficher le contenu passé au composant MaxWidthWrapper qui se trouve dans le fichier page.tsx. */}
</div>   
  )
}