import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
	return (
		<footer className="relative z-50 border-t py-6 px-8">
			<div className="container w-full flex items-center gap-2 text-sm text-foreground/50 max-sm:flex-col max-sm:gap-0.5">
				Build with love by
				<Link
					href={siteConfig.authors[0].url}
					className="font-bold text-foreground/75 underline-offset-4 hover:underline"
				>
					{siteConfig.authors[0].name}.
				</Link>
			</div>
		</footer>
	)
}
