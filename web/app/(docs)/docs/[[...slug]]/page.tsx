import { source } from "@/lib/source"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/components/mdx"
import {
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "@/components/ai/page-actions"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function Page(props: PageProps): Promise<React.ReactNode> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body
  const markdownUrl = `${page.url}.mdx`

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2 pt-1">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover markdownUrl={markdownUrl} pageUrl={page.url} />
        </div>
      </div>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams(): { slug?: string[] }[] {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps,
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
