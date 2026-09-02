import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export async function highlightCode(code: string, lang: string = 'go'): Promise<string> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['go', 'bash', 'python', 'java', 'typescript', 'javascript', 'json', 'yaml'],
    })
  }
  const highlighter = await highlighterPromise
  const validLang = highlighter.getLoadedLanguages().includes(lang as any) ? lang : 'text'
  return highlighter.codeToHtml(code, {
    lang: validLang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
}
