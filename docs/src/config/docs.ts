import type { MainNavItem, SidebarNavItem } from "@/types"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting started",
      href: "/",
      items: [
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Getting started",
          href: "/docs/getting-started",
          items: [],
        },
      ],
    },
  ],
}
