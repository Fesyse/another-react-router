import { siteConfig } from "@/config/site"
import Link from "next/link"
import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { CommandMenu } from "./command-menu"
import { ThemeToggle } from "./theme-toggle"
import { MainNav } from "./ui/main-nav"
import { MobileNav } from "./ui/mobile-nav"

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container px-3 flex h-14 max-w-screen-2xl items-center'>
        <MainNav />
        <MobileNav />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <CommandMenu />
          </div>
          <nav className='flex items-center'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
            >
              <div
                className={buttonVariants({
                  variant: "ghost",
                  size: "smallIcon",
                })}
              >
                <Icons.gitHub className='h-4 w-4' />
                <span className='sr-only'>GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
