import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Comfortaa } from "next/font/google"
import { PropsWithChildren } from "react"
import { siteMetadata } from "@/config/site"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Spotlight } from "@/components/ui/spotlight"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const comfortaa = Comfortaa({
	subsets: ["latin"],
	variable: "--comfortaa-font-family"
})

export const metadata: Metadata = siteMetadata
export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" }
	]
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen antialiased font-comfortaa",
					comfortaa.variable
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<div className="relative flex min-h-screen flex-col bg-background antialiased dark:bg-grid-white/[0.02]">
						<Header />
						<Spotlight
							className="dark:block hidden -top-40 left-0 md:left-12 md:-top-20"
							fill="rgba(255,255,255,0.3)"
						/>
						<main className="flex-1 min-h-[calc(100vh-3.5rem)] before:dark:hidden before:z-50 before:w-72 before:aspect-square before:bg-red-500/50 before:fixed before:left-2 before:top-12 before:blur-[100px] before:rounded-full after:z-50 after:dark:hidden after:w-72 after:aspect-square after:bg-red-500/50 after:fixed after:right-2 after:-bottom-2 after:blur-[100px] after:rounded-full">
							{children}
						</main>
						<Footer />
					</div>
				</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
