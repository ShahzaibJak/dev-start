import type { source } from "@/lib/source"

type SourcePage = (typeof source)["$inferPage"]

export async function getLLMText(page: SourcePage): Promise<string> {
  const processed = await page.data.getText("processed")
  return `# ${page.data.title} (${page.url})\n\n${processed}`
}
