import * as path from "path"
import getHighlighter, { loadTheme } from "@shikijs/compat"

const getHighlighterr = async () => {
  const theme = await loadTheme(
    path.join(process.cwd(), "/src/lib/highlighter-theme.json")
  )
  return await getHighlighter({ theme })
}

console.log(await getHighlighterr())
