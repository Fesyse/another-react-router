import { type Metadata } from "next"

export const siteConfig = {
	name: "Another react router",
	url: "https://another-react-router.vercel.app",
	author: "Fesyse",
	description:
		"Another react router is a npm package, that allowes developers and users comfortable route between pages on their web applications.",
	links: {
		github: "https://github.com/fesyse/another-react-router/"
	},
	ogImage: "https://i.postimg.cc/jStmNVy8/another-react-router-og-Image.png"
}

export const siteMetadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	keywords: ["React", "React router", "Router", "Npm", "Package"],
	metadataBase: new URL(siteConfig.url),
	twitter: {
		card: "summary_large_image",
		title: "Another react router",
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@shadcn"
	},
	authors: {
		name: "Another react router team",
		url: "https://github.com/fesyse/another-react-router"
	},
	creator: "Fesyse",
	applicationName: siteConfig.name,
	manifest: `${siteConfig.url}/site.webmanifest`,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png"
	}
}
