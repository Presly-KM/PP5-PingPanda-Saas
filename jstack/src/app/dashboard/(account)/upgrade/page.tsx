import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { DashboardPage } from "@/components/dashboard-page"
import { UpgradePageContent } from "./upgrade-page-content"



const Page = async () => {                            // Ici on définit une fonction asynchrone pour la page. Cela permet d'utiliser await pour attendre des opérations asynchrones comme la récupération de l'utilisateur. les opérations asynchrones comme la récupération de l'utilisateur. les opérations asynchrones sont utilisées pour attendre des données avant de rendre la page. Par exemple, on peut attendre la récupération de l'utilisateur connecté avant de continuer. Cela permet de s'assurer que les données nécessaires sont disponibles avant de rendre la page.
    const auth = await currentUser()

    if (!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({           // Ici on utilise findUnique pour trouver un utilisateur unique dans la base de données
        where: { externalId: auth.id },
    })

    if (!user) { 
        redirect("/sign-in")
    }

    return <DashboardPage title="Pro Membership"> 
            <UpgradePageContent plan={user.plan}/> 
    </DashboardPage>
}

export default Page