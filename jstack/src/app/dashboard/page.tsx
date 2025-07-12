import { DashboardPage } from "@/components/dashboard-page"
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content"  // Importation du composant DashboardPageContent qui contient le contenu principal de la page de tableau de bord.
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const auth = await currentUser()

    if (!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({ 
        where: { externalId: auth.id },
    })

    if (!user) {
        redirect("/sign-in")
    }
    
    return <DashboardPage title="Dashboard">
              <DashboardPageContent/>
           </DashboardPage>
}

export default Page