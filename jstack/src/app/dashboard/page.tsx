import { DashboardPage } from "@/components/dashboard-page"
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content"  // Importation du composant DashboardPageContent qui contient le contenu principal de la page de tableau de bord.
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { PlusIcon } from "lucide-react"
import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"                               // Le composant Button est utilisé pour

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
    
    return ( 
         <DashboardPage 
             cta={
            <CreateEventCategoryModal> 
                <Button className="w-full sm:w-fit"> 
                    <PlusIcon className="size-4 mr-2"/>   {/* Le composant DashboardPage est utilisé pour encapsuler le contenu de la page de tableau de bord. Il prend en charge un titre et un CTA (Call To Action) qui peut être personnalisé. Un CTA est un élément interactif qui incite l'utilisateur à effectuer une action, comme cliquer sur un bouton ou un lien. */}
                      Add Category
                </Button>
            </CreateEventCategoryModal>
            }
                title="Dashboard"
                >
              <DashboardPageContent/>
           </DashboardPage>
)
}

export default Page