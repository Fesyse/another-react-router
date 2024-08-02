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
          title: "Introduction",
          href: "/docs/introduction",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Config",
          href: "/docs/config",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      href: "/components",
      items: [
        {
          title: "Provider",
          href: "/docs/components/provider",
          items: [],
        },
        {
          title: "Link",
          href: "/docs/components/link",
          items: [],
        },
      ],
    },
  ],
}
