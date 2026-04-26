import { getLLMText } from "@/lib/get-llm-text"
import { source } from "@/lib/source"
import { notFound } from "next/navigation"

export const revalidate = false

interface RouteContext {
  params: Promise<{ slug?: string[] }>
}

export async function GET(
  _req: Request,
  { params }: RouteContext,
): Promise<Response> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  return new Response(await getLLMText(page), {
    headers: { "Content-Type": "text/markdown" },
  })
}

export function generateStaticParams(): { slug?: string[] }[] {
  return source.generateParams()
}
