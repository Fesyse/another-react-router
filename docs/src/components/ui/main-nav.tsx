"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MainNav() {
	const pathname = usePathname()

	return (
		<div className="mr-4 max-md:hidden flex">
			<Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
				<Image
					className="invert dark:invert-0"
					src="/icon.svg"
					alt="icon"
					width={36}
					height={36}
				/>
				<span className="font-bold">{siteConfig.name}</span>
			</Link>
			<nav className="flex items-center gap-4 text-sm lg:gap-6">
				<Link
					href="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/60"
					)}
				>
					Docs
				</Link>
			</nav>
		</div>
	)
}
