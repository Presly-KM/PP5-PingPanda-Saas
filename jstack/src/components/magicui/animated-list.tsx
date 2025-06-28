"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,                      // Importation de useMemo pour optimiser les performances en mémorisant les valeurs calculées
  useState,
} from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useEffect(() => {                                                           // Utilisation de useEffect pour gérer les effets secondaires liés à l'animation de la liste. En effet, useEffect est utilisé pour déclencher une action après que le composant a été monté ou mis à jour. C'est à dire, il permet de gérer les effets secondaires dans les composants fonctionnels React, comme la gestion des animations dans ce cas. Exemple : ici, il est utilisé pour mettre à jour l'index de l'élément affiché dans la liste après un certain délai. Autre exemple : il peut être utilisé pour déclencher une animation lorsque l'index change, en utilisant un délai spécifié par la prop `delay`.
      if (index < childrenArray.length - 1) {                                   //Ici, on vérifie si l'index actuel est inférieur à la longueur du tableau des enfants moins un. Cela signifie que nous n'avons pas encore atteint le dernier élément de la liste. Pourquoi ? Parce que nous voulons animer l'affichage des éléments de la liste un par un, et nous ne voulons pas dépasser le nombre d'éléments disponibles. moins un car l'index commence à 0, donc si nous avons 5 éléments, les index vont de 0 à 4. Cela permet de s'assurer que nous n'essayons pas d'accéder à un index qui n'existe pas dans le tableau des enfants. C'est la règle du off-by-one, qui est courante en programmation, surtout dans les langages où les index commencent à 0.
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);      // Ici, on utilise setTimeout pour mettre à jour l'index après un délai spécifié par la prop `delay`. La fonction setIndex est appelée avec une fonction de rappel qui prend l'index précédent (prevIndex) et retourne le nouvel index. Le nouvel index est calculé en ajoutant 1 à l'index précédent et en utilisant l'opérateur modulo (%) pour s'assurer que l'index reste dans les limites du tableau des enfants. Cela permet de faire défiler les éléments de la liste de manière cyclique, c'est-à-dire que lorsque nous atteignons le dernier élément, nous revenons au premier.
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={cn(`flex flex-col-reverse items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
