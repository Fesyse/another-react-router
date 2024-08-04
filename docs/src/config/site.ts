import { type Metadata } from "next"

export const siteConfig = {
	shortenTitle: "ARR",
	title: {
		default: "Another react router",
		template: "%s | Another react router"
	},
	keywords: ["React", "React router", "Router", "Npm", "Package"],
	creator: "Fesyse",
	authors: [
		{
			name: "Another react router team",
			url: "https://github.com/fesyse/another-react-router"
		}
	],
	applicationName: "Another react router",
	description:
		"Another react router is a npm package, that allowes developers and users comfortable route between pages on their web applications.",
	links: {
		github: "https://github.com/fesyse/another-react-router/"
	}
} satisfies Metadata & {
	shortenTitle: string
	links: {
		github: string
	}
}
