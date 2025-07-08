import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { EB_Garamond } from "next/font/google"
import { cn } from "@/utils"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"         // Importation de ClerkProvider pour gérer l'authentification des utilisateurs

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })  // Importation de la police Inter depuis Google Fonts avec le sous-ensemble latin et une variable CSS pour la police sans-serif
const eb_garamond = EB_Garamond({                                     // Importation de la police EB Garamond depuis Google Fonts avec le sous-ensemble latin et une variable CSS pour la police d'en-tête
  subsets: ["latin"],                                                 // subsets définit les caractères à inclure dans la police par exemple, "latin" pour les caractères latins 
  variable: "--font-heading",                                         // variable permet de définir une variable CSS pour la police d'en-tête par exemple, "--font-heading" pour l'utiliser dans les styles CSS
})

export const metadata: Metadata = {                                   // Définition des métadonnées de la page, qui seront utilisées pour le référencement et l'affichage dans les navigateurs. Les métadonnées incluent le titre de la page, la description et les icônes.
  title: "jStack App",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({                                  // Définition du composant RootLayout qui enveloppe l'ensemble de l'application. Ce composant est utilisé pour définir la structure de base de l'application, y compris les polices, les métadonnées et les fournisseurs.
  children,                                                           // children est une prop qui représente le contenu de l'application, c'est-à-dire tout ce qui sera rendu à l'intérieur de ce composant RootLayout.
}: Readonly<{                                                         //  Readonly<{ children: React.ReactNode }> est une annotation de type TypeScript qui indique que le composant attend une prop children de type ReactNode, et que cette prop est en lecture seule (readonly), ce qui signifie qu'elle ne peut pas être modifiée à l'intérieur du composant.
  children: React.ReactNode
}>) {
  return (                                                                  // Le composant RootLayout retourne un élément HTML qui enveloppe l'ensemble de l'application. Il utilise le composant ClerkProvider pour gérer l'authentification des utilisateurs, et définit la langue de la page ainsi que les classes CSS pour les polices et le style général de la page.
    <ClerkProvider>
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>   {/* Le composant <html> définit la langue de la page (lang="en" pour l'anglais) et applique les classes CSS pour les polices importées. La fonction cn est utilisée pour combiner les classes CSS en une seule chaîne. */}
      <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
        <main className="relative flex-1 flex flex-col">
        <Providers>{children}</Providers>                                   {/* <Providers>{children}</Providers> est utilisé pour envelopper le contenu de l'application avec des fournisseurs(providers) React, ce qui permet de partager des données et des fonctionnalités entre les composants. Cela peut inclure des contextes, des thèmes, ou d'autres fonctionnalités globales. Les providers sont des composants qui fournissent des données ou des fonctionnalités à tous les composants enfants. Par exemple, le composant Providers peut inclure des fournisseurs pour la gestion de l'état, l'authentification (ClerkProvider), ou d'autres fonctionnalités globales de l'application. */}
        </main>
      </body>
    </html>
    </ClerkProvider>
  )
}
