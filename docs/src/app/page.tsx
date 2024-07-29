import { CopyCommandButton } from "@/components/copy-button"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { LinkIcon, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

type HomeFeature = {
  title: React.ReactNode
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
    icon: (
      <Image
        src='/ts-logo.svg'
        alt='ts-logo'
        width={24}
        height={24}
        className='rounded-[0.25rem]'
      />
    ),
  },
]

export default function Home() {
  return (
    <div className='container pt-20 flex flex-col items-center gap-2'>
      <h1 className='text-center text-6xl font-bold'>Another react router</h1>
      <h2 className='text-center text-xl text-foreground/50 max-w-[40rem] mx-auto'>
        <Balancer>
          is a npm package, that allowes developers and users comfortable route
          between pages on their web applications.
        </Balancer>
      </h2>
      <div className='my-10 flex gap-1 items-center px-4 py-7 bg-muted/50 h-10 rounded-lg w-[28rem] relative text-lg'>
        <span className='font-bold'>npm</span>
        <span className='text-foreground/[0.533]'>
          install another-react-router
        </span>
        <CopyCommandButton
          className='w-7 h-7 absolute right-2 top-1/2 -translate-y-1/2'
          iconClassName='w-5 h-5'
          commands={{
            __npmCommand__: "npm install another-react-router",
            __yarnCommand__: "yarn add another-react-router",
            __pnpmCommand__: "pnpm add another-react-router",
            __bunCommand__: "bun add another-react-router",
          }}
        />
      </div>
      <div className='mt-5 mb-10 grid gap-4 items-start grid-cols-3'>
        {homeFeatures.map(feature => (
          <Card>
            <CardHeader
              className={cn({
                "pb-1": feature.link,
              })}
            >
              <CardTitle className='flex gap-2 items-center'>
                {feature.icon} {feature.title}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            {feature.link ? (
              <CardContent className='pb-2'>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "link",
                      size: "sm",
                    }),
                    "p-0"
                  )}
                  href={feature.link.href}
                >
                  {feature.link.label}
                </Link>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </div>
      <p className='text-foreground/50'>Ready to get started?</p>
      <div className='flex gap-3 items-center'>
        <Button asChild size='lg'>
          <Link href='/docs/installation/'>Documentation</Link>
        </Button>
        <Button asChild variant='secondary' size='lg' className='gap-2'>
          <Link href={siteConfig.links.github}>
            Github <LinkIcon size={20} />
          </Link>
        </Button>
      </div>
    </div>
  )
}
