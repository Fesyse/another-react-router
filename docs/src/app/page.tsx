import { CopyCommandButton } from "@/components/copy-button"
import { TypescriptIcon } from "@/components/typescript-icon"
import { Button } from "@/components/ui/button"
import { Grid } from "@/components/ui/grid"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { LinkIcon, Zap } from "lucide-react"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

type HomeFeature = {
  title: string
  description: React.ReactNode
  icon: React.ReactNode
  link?: {
    href: string
    label: string
  }
}

const homeFeatures: HomeFeature[] = [
  {
    title: "Lightweight",
    description:
      "Our package does not use any dependencies (except for dev one's), and the codebase is not that big, so you dont need to worry about performance.",
    icon: <Zap />,
  },
  {
    title: "Easy to use",
    description: (
      <span>
        Install package. Run CLI. Add provider. <br /> That's it.
      </span>
    ),
    icon: <Zap />,
    link: {
      href: "/docs/installation",
      label: "Read more",
    },
  },
  {
    title: "Typesafe",
    description:
      "We are highlighy recommend using typescript in projects with our router, because you will get much better developer experience building your applications.",
    icon: <TypescriptIcon className='w-6 h-6' />,
  },
]

export default function Home() {
  return (
    <div className='container relative md:mt-20 mt-10 flex flex-col items-center gap-2 before:dark:hidden before:w-72 before:aspect-square before:bg-red-500/50 before:absolute before:-left-16 before:top-6 before:blur-[75px] before:rounded-full after:dark:hidden after:w-72 after:aspect-square after:bg-red-500/50 after:absolute after:-right-52 after:bottom-24 after:blur-[75px] after:rounded-full'>
      <h1 className='text-center lg:text-6xl md:text-5xl text-3xl font-bold'>
        <Balancer>Another react router</Balancer>
      </h1>
      <h2 className='text-center text-base sm:text-lg md:text-xl text-foreground/50 max-w-[40rem] mx-auto'>
        <Balancer>
          is a npm package, that allowes developers and users comfortable route
          between pages on their web applications.
        </Balancer>
      </h2>
      <div className='my-4 md:my-10 flex gap-1 items-center p-2 max-[400px]:text-[0.885rem] md:text-lg md:p-4 bg-muted/50 rounded-lg lg:w-[28rem] md:w-[24rem] w-[20rem] max-[400px]:w-full max-[400px]:justify-center text-nowrap  overflow-hidden relative text-base dark:border-border border-border/50 border-2'>
        <span className='font-bold hidden min-[400px]:inline'>npm</span>
        <span className='text-foreground/[0.533] hidden min-[400px]:inline'>
          install another-react-router
        </span>
        <span className='font-bold min-[400px]:hidden inline'>bun</span>
        <span className='text-foreground/[0.533] min-[400px]:hidden inline'>
          add another-react-router
        </span>
        <CopyCommandButton
          className='w-7 h-7 absolute right-2 top-1/2 -translate-y-1/2 max-[400px]:hidden'
          iconClassName='w-5 h-5'
          commands={{
            __npmCommand__: "npm install another-react-router",
            __yarnCommand__: "yarn add another-react-router",
            __pnpmCommand__: "pnpm add another-react-router",
            __bunCommand__: "bun add another-react-router",
          }}
        />
      </div>
      <p className='text-foreground/50'>Ready to get started?</p>
      <div className='flex gap-3 items-center max-[400px]:flex-col max-[400px]:items-stretch'>
        <Button asChild size='lg'>
          <Link href='/docs/installation/'>Documentation</Link>
        </Button>
        <Button asChild variant='secondary' size='lg' className='gap-2'>
          <Link href={siteConfig.links.github}>
            Github <LinkIcon size={20} />
          </Link>
        </Button>
      </div>
      <div className='mt-8 md:mt-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto'>
          {homeFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                "relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden",
                {
                  "sm:col-span-2 md:col-span-1": i === 2,
                }
              )}
            >
              <Grid size={20} />
              <p className='text-base font-bold text-foreground relative z-20 flex gap-2 items-center'>
                {feature.icon} {feature.title}
              </p>
              <p className='text-foreground/50 mt-4 text-base font-normal relative z-20'>
                {feature.description}
              </p>
              {feature.link ? (
                <Link href={feature.link.href}>{feature.link.label}</Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
