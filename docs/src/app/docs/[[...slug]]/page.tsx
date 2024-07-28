import { Mdx } from "@/components/mdx"
import { DocsPager } from "@/components/ui/docs-pager"
import { absoluteUrl, cn } from "@/lib/utils"
import { allDocs } from "contentlayer/generated"
import { ChevronRightIcon } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Balancer from "react-wrap-balancer"
interface DocPageProps {
  params: {
    slug?: string[]
  }
}

async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params?.slug?.join("/") ?? "installation"
  const doc = allDocs.find(doc => doc.slugAsParams === slug)

  if (!doc) return null
  else return doc
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
    },
  }
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map(doc => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function Page(props: DocPageProps) {
  const doc = await getDocFromParams(props.params)
  if (!doc) notFound()

  return (
    <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
      <div className='mx-auto w-full min-w-0'>
        <div className='mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground'>
          <div className='truncate'>Docs</div>
          <ChevronRightIcon className='h-3.5 w-3.5' />
          <div className='text-foreground'>{doc.title}</div>
        </div>
        <div className='space-y-2'>
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className='text-base text-muted-foreground'>
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        <div className='pb-12 pt-8'>
          <Mdx code={doc.body.code} />
        </div>
        <DocsPager doc={doc} />
      </div>
    </main>
  )
}
