import remark from 'remark'
import html from 'remark-html'
import remarkShikiTwoslash from 'remark-shiki-twoslash'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use([html, [remarkShikiTwoslash, { themes: ["light-plus", "dark-plus"] }]]).process(markdown)
  return result.toString()
}
