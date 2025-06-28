import Image from "next/image"
import { cn } from "@/utils"; // cn est une fonction utilitaire qui combine des classes CSS conditionnelles. Elle est utilisée pour appliquer des styles dynamiques aux éléments en fonction des propriétés passées au composant.
import { Clock } from "lucide-react"; // Clock est une icône de Lucide React qui représente une horloge. Elle est utilisée pour afficher l'heure à laquelle le message a été envoyé dans Discord. Lucide React est une bibliothèque d'icônes SVG pour React, offrant des icônes personnalisables et faciles à utiliser.
interface DiscordMessageProps {
    avatarSrc: string // avatarSrc est une propriété qui représente l'URL de l'avatar de l'utilisateur. Elle est utilisée pour afficher l'image de profil de l'utilisateur dans le message Discord.
    avatarAlt: string // avatarAlt est une propriété qui représente le texte alternatif de l'avatar. Elle est utilisée pour fournir une description de l'image de profil pour les utilisateurs qui ne peuvent pas la voir, par exemple les personnes utilisant des lecteurs d'écran.
    username: string // username est une propriété qui représente le nom d'utilisateur de l'expéditeur du message. Elle est utilisée pour afficher le nom de l'utilisateur dans le message Discord.
    timestamp: string // timestamp est une propriété qui représente la date et l'heure à laquelle le message a été envoyé. Elle est utilisée pour afficher quand le message a été publié dans Discord.
    badgeText?: string // badgeText est une propriété optionnelle qui représente le texte du badge à afficher à côté du nom d'utilisateur. Elle est utilisée pour indiquer un statut spécial ou une distinction pour l'utilisateur, comme "Admin" ou "Modérateur".
    badgeColor?: string // badgeColor est une propriété optionnelle qui représente la couleur du badge. Elle est utilisée pour styliser le badge en fonction du statut de l'utilisateur, par exemple, un badge rouge pour un administrateur ou un badge vert pour un modérateur.
    title: string; // title est une propriété qui représente le titre du message. Elle est utilisée pour afficher un en-tête ou un sujet pour le message Discord, ce qui peut aider à contextualiser le contenu du message.
    content: {
        [key: string]: string; // content est un objet qui représente le contenu du message. Il peut contenir plusieurs paires clé-valeur, où chaque clé est un identifiant pour une section du message et la valeur est le texte de cette section. Cela permet de structurer le message de manière flexible et d'afficher différentes informations dans le message Discord.
    }
}

type BadgeColor = "#43b581" | "#faa61a" | string & {}      // Ici, BadgeColor est un type qui représente les couleurs possibles pour le badge. Il peut être soit une couleur spécifique (comme "#43b581" pour le vert ou "#faa61a" pour l'orange), soit une chaîne de caractères générique (string & {}). Cela permet de définir des couleurs personnalisées pour les badges tout en conservant la possibilité d'utiliser des couleurs prédéfinies. & {} veut dire que le type peut être n'importe quelle chaîne de caractères, ce qui permet une flexibilité dans la définition des couleurs des badges.

const getBadgeStyles = (color: BadgeColor) => {             // Ici, getBadgeStyles est une fonction qui prend une couleur de badge en paramètre et retourne une chaîne de classes CSS pour styliser le badge en fonction de sa couleur. Cela permet de centraliser la logique de style des badges et de rendre le code plus lisible et maintenable.
    switch (color) {                                        // Ici, on utilise un switch pour déterminer les styles à appliquer en fonction de la couleur du badge. Cela permet de gérer facilement plusieurs couleurs de badge et d'ajouter de nouveaux styles si nécessaire.
        case "#43b581":                             
            return "bg-green-500/10 text-green-400 ring-green-500/20"   // Ici on retourne les classes CSS pour un badge vert. bg-green-500/10 applique une couleur de fond verte avec une opacité de 10%, text-green-400 définit la couleur du texte en vert, et ring-green-500/20 ajoute une bordure verte avec une opacité de 20%. Ces classes sont utilisées pour styliser le badge en fonction de sa couleur.
        case "#faa61a": // Couleur orange pour les badges d'avertissement
            return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20" // Ici on retourne les classes CSS pour un badge orange. bg-yellow-500/10 applique une couleur de fond jaune avec une opacité de 10%, text-yellow-400 définit la couleur du texte en jaune, et ring-yellow-500/20 ajoute une bordure jaune avec une opacité de 20%. Ces classes sont utilisées pour styliser le badge en fonction de sa couleur.
        default: // Couleur par défaut pour les badges non spécifiés
            return "bg-gray-500/10 text-gray-400 ring-gray-500/20"       // Ici on retourne les classes CSS pour un badge gris par défaut. bg-gray-500/10 applique une couleur de fond grise avec une opacité de 10%, text-gray-400 définit la couleur du texte en gris, et ring-gray-500/20 ajoute une bordure grise avec une opacité de 20%. Ces classes sont utilisées pour styliser le badge en fonction de sa couleur par défaut.
    }
}
export const DiscordMessage = ({               // DiscordMessage est un composant React qui représente un message dans l'interface utilisateur de Discord. Il affiche l'avatar de l'utilisateur, son nom d'utilisateur, le contenu du message, et un badge optionnel pour indiquer un statut spécial ou une distinction. Le composant utilise des propriétés pour personnaliser l'affichage du message, comme avatarSrc pour l'image de profil, username pour le nom de l'utilisateur, et content pour le contenu du message.
    avatarAlt, 
    avatarSrc, 
    content, 
    timestamp, 
    title, 
    username, 
    badgeColor = "#43b581", 
    badgeText,
} : DiscordMessageProps) => {   // DiscordMessageProps est une interface qui définit les propriétés que le composant DiscordMessage peut recevoir. Dans ce cas, il n'y a pas de propriétés définies, donc le composant n'attend pas de props spécifiques. Cela signifie que le composant peut être utilisé sans passer de données supplémentaires, ce qui le rend simple et facile à utiliser dans différents contextes.
  return (                                                   // Ici, on retourne le JSX qui représente le message Discord. Le composant utilise des classes CSS pour styliser les éléments, comme w-full pour définir la largeur à 100%, flex pour utiliser Flexbox, items-start pour aligner les éléments au début de la ligne, et justify-start pour justifier le contenu au début de la ligne. Ces classes sont utilisées pour créer une mise en page flexible et responsive pour le message Discord.
    <div className="w-full flex items-start justify-start">    
        <div className="flex items-center mb-2">
            <Image 
                src={avatarSrc} 
                alt={avatarAlt} 
                width={40} 
                height={40} 
                className="object-cover rounded-full mr-3" // avatarSrc est utilisé pour afficher l'image de profil de l'utilisateur dans le message Discord. Il est passé en tant que prop au composant Image de Next.js, qui gère le chargement et l'affichage de l'image. width et height définissent la taille de l'image, et className applique des styles CSS pour arrondir les bords de l'image et ajouter une marge à droite.
            />
            </div>

            <div className="w-full max-w-xl">
                <div className="flex items-center"> 
                    <p className="font-semibold text-white">{username}</p>
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold bg-brand-600 text-white rounded"> 
                        APP
                    </span>
                    <span className="text-gray-400 ml-1.5 text-xs font-normal">
                        {timestamp} 
                    </span>
                </div>

                <div className="bg-[#2f3136] text-sm w-full rounded p-3 mb-4 mt-1.5">
                    <div className="flex flex-row items-center justify-between mb-2">
                        {badgeText ? (
                            <span
                               className={cn(
                                    "inline-flex order-2 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                    getBadgeStyles(badgeColor)     // getBadgeStyles est une fonction qui retourne les classes CSS appropriées pour styliser le badge en fonction de sa couleur. Elle est utilisée pour appliquer des styles dynamiques au badge, en fonction de la couleur passée en prop badgeColor. Cela permet de rendre le badge visuellement distinct et de signaler un statut spécial ou une distinction pour l'utilisateur. la prop badgeColor est utilisée pour déterminer la couleur du badge, et getBadgeStyles est appelée avec cette couleur pour obtenir les classes CSS correspondantes. cf ligne 36 pour voir la prop badgeColor et la couleur par défaut "#43b581" si aucune couleur n'est spécifiée.
                        )}
                        >{badgeText}
                        </span>
                        ) : null}
                        <p className="text-white order-1 text-base/7 font-semibold">
                          {title}
                        </p>
                      </div>

                      {Object.entries(content).map(([key, value]) => (                // Object.entries(content) est utilisé pour itérer sur les paires clé-valeur de l'objet content. Cela permet d'afficher chaque section du message Discord avec sa clé et sa valeur correspondante. Par exemple, si content contient { "Status": "Online", "Version": "1.0" }, cela affichera deux lignes : "Status: Online" et "Version: 1.0". map est utilisé pour créer un tableau de paragraphes <p> pour chaque paire clé-valeur, ce qui permet de rendre le contenu du message de manière dynamique et flexible.
                         <p key={key} className="text-[#dcddde] text-sm/6">         {/* key est la clé de la paire clé-valeur, utilisée comme identifiant unique pour chaque paragraphe. value est la valeur associée à cette clé, qui sera affichée dans le paragraphe. Cela permet de structurer le message Discord de manière flexible et d'afficher différentes informations dans le message. Key et value sont utilisés pour afficher le contenu du message de manière dynamique, en fonction des données passées au composant DiscordMessage. */}
                               <span className="text-[#b9bbbe]">{key}:</span> {value} {/* span className="text-[#b9bbbe]" est utilisé pour styliser la clé de la paire clé-valeur, en lui appliquant une couleur différente pour la distinguer de la valeur. Cela permet de rendre le message plus lisible et de mettre en évidence les clés des sections du message Discord. */}
                         </p>
                    ))}

                    <p className="text-[#72767d] text-xs mt-2 flex items-center">   {/* text-[#72767d] est utilisé pour styliser le texte de l'horloge, en lui appliquant une couleur grise pour le rendre moins proéminent que le reste du message. text-xs définit la taille du texte à une petite taille, ce qui est courant pour les horloges ou les informations secondaires dans les interfaces utilisateur. */}
                        <Clock className="size-3 mr-1" />
                        {timestamp}                                                   {/* timestamp est utilisé pour afficher l'heure à laquelle le message a été envoyé dans Discord. Il est passé en tant que prop au composant DiscordMessage et affiché dans un paragraphe avec une icône d'horloge à côté. Cela permet aux utilisateurs de voir quand le message a été publié, ce qui est important pour la chronologie des conversations dans Discord. */}
                    </p>
                   </div>
                </div>
            </div>
  )
}