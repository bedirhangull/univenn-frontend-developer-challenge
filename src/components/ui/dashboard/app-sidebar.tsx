"use client"

import * as React from "react"
import { NavProjects } from "@/components/ui/dashboard/nav-projects"
import { NavSecondary } from "@/components/ui/dashboard/nav-secondary"
import { NavUser } from "@/components/ui/dashboard/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CompanySwitcher } from "@/components/ui/dashboard/nav-company-switcher"
import { DATA } from "@/data/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <CompanySwitcher companies={DATA.companies} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={DATA.projects} />
                <NavSecondary items={DATA.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={DATA.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
