import { siteConfig } from "@/config/site"
import Link from "next/link"

export function Footer() {
  return (
    <footer className='container w-full flex items-center gap-2 py-2 px-4 text-sm text-foreground/50 max-sm:flex-col max-sm:gap-0.5'>
      Build with love by
      <Link
        href={siteConfig.authors[0].url}
        className='font-bold text-foreground/75 underline-offset-4 hover:underline'
      >
        {siteConfig.authors[0].name}.
      </Link>
    </footer>
  )
}
