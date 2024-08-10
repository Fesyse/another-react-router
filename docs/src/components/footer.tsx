import { Author } from "next/dist/lib/metadata/types/metadata-types"
import Link from "next/link"
import { siteConfig, siteMetadata } from "@/config/site"

export function Footer() {
	return (
		<footer className="relative z-50 border-t py-6 px-8">
			<div className="container w-full flex items-center gap-2 text-sm text-foreground/50 max-sm:flex-col max-sm:gap-0.5">
				Build with love by
				<Link
					href={(siteMetadata.authors as Author).url!}
					className="font-bold text-foreground/75 underline-offset-4 hover:underline"
				>
					{(siteMetadata.authors as Author).name}.
				</Link>
			</div>
		</footer>
	)
}
