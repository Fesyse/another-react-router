import { Mdx } from "@/components/mdx"
import { absoluteUrl } from "@/lib/utils"
import { allDocs } from "contentlayer/generated"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
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
    <div>
      <Mdx code={doc.body.code} />
    </div>
  )
}
