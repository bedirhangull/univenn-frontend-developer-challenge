import {
  Building2,
  Building,
  Command,
  House,
  Bookmark,
  Users,
  Mail,
  LifeBuoy,
  Send,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type CompanyItem = {
  name: string;
  logo: LucideIcon;
  plan: "Enterprise" | "Startup" | "Free" | string;
};

type UserItem = {
  name: string;
  email: string;
  avatar: string;
};

type ProjectItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

type SecondaryNavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type SidebarData = {
  companies: CompanyItem[];
  user: UserItem;
  projects: ProjectItem[];
  navSecondary: SecondaryNavItem[];
};

export const DATA: SidebarData = {
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
};
