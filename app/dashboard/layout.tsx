import { AppSidebar } from "@/components/ui/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl">Talent Pool</h1>
                                    <Badge className="rounded-md bg-muted text-xs">
                                        <span className="text-xs text-primary">24</span>
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Keep track of the applicants
                                </p>
                            </div>
                            <Button>
                                <Plus className="h-4 w-4" />
                                <span className="text-xs">Add Talent</span>
                            </Button>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}