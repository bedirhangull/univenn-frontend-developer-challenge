"use client"

import * as React from "react"
import {
    Command,
    LifeBuoy,
    Send,
    House,
    Bookmark,
    Users,
    Mail,
    Building2,
    Building
} from "lucide-react"

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

const data = {
    companies: [
        {
            name: "Hrpanda Inc.",
            logo: Building2,
            plan: "Enterprise",
        },
        {
            name: "Univenn Inc.",
            logo: Building,
            plan: "Startup",
        },
        {
            name: "KitUP Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    projects: [
        {
            name: "Overview",
            url: "/dashboard/overview",
            icon: House,
        },
        {
            name: "Jobs",
            url: "/dashboard/jobs",
            icon: Bookmark,
        },
        {
            name: "Talent Pool",
            url: "/dashboard/talent-pool",
            icon: Users,
        },
        {
            name: "Inbox",
            url: "/dashboard/inbox",
            icon: Mail,
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Settings",
            url: "#",
            icon: Send,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <CompanySwitcher companies={data.companies} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
