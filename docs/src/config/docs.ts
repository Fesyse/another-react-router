import type { MainNavItem, SidebarNavItem } from "@/types"

export interface DocsConfig {
	mainNav: MainNavItem[]
	sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs"
		}
	],
	sidebarNav: [
		{
			title: "Getting started",
			items: [
				{
					title: "Introduction",
					href: "/docs/introduction",
					items: []
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: []
				},
				{
					title: "CLI",
					href: "/docs/cli",
					items: []
				},
				{
					title: "Config",
					href: "/docs/config",
					items: []
				}
			]
		},
		{
			title: "Routing",
			items: [
				{
					title: "Fundamentals",
					href: "/docs/routing",
					items: []
				},
				{
					title: "Defining Routes",
					href: "/docs/routing/defining-routes",
					items: []
				},
				{
					title: "Pages and Layouts",
					href: "/docs/routing/pages-and-layouts",
					items: []
				},
				{
					title: "Linking and Navigating",
					href: "/docs/routing/linking-and-navigating",
					items: []
				},
				{
					title: "Dynamic Routes",
					href: "/docs/routing/dynamic-routes",
					items: []
				}
			]
		},
		{
			title: "Components",
			items: [
				{
					title: "Provider",
					href: "/docs/components/provider",
					items: []
				},
				{
					title: "Link",
					href: "/docs/components/link",
					items: []
				}
			]
		},
		{
			title: "Hooks",
			items: [
				{
					title: "useRouter",
					href: "/docs/hooks/use-router",
					items: []
				},
				{
					title: "usePathname",
					href: "/docs/hooks/use-pathname",
					items: []
				},
				{
					title: "useParams",
					href: "/docs/hooks/use-params",
					items: []
				},
				{
					title: "useSearchParams",
					href: "/docs/hooks/use-search-params",
					items: []
				}
			]
		}
	]
}
