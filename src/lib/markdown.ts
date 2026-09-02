import { Marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'python',
        'java',
        'go',
        'bash',
        'sh',
        'javascript',
        'typescript',
        'json',
        'yaml',
        'dockerfile',
        'sql',
        'html',
        'css',
      ],
    })
  }
  return highlighterPromise
}

export async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter()

  const localMarked = new Marked()

  localMarked.use(markedKatex({ throwOnError: false, nonStandard: true }))

  localMarked.use({
    renderer: {
      code({ text, lang }: { text: string; lang?: string }) {
        const cleanLang = (lang || '').trim().toLowerCase()
        const loadedLangs = highlighter.getLoadedLanguages()
        const targetLang = cleanLang && loadedLangs.includes(cleanLang as any) ? cleanLang : 'text'

        return highlighter.codeToHtml(text, {
          lang: targetLang,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        })
      },
    },
  })

  return await localMarked.parse(content)
}
