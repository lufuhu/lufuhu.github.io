import container from 'markdown-it-container'

// Add v-pre to inline code containing {{ to prevent Vue from parsing it as template interpolation and failing the build
export function guardInlineMustache(md: any) {
  const defaultRule = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = (tokens: any, idx: any, opts: any, env: any, self: any) => {
    if (tokens[idx].content.includes('{{')) {
      tokens[idx].attrSet('v-pre', '')
    }
    return defaultRule(tokens, idx, opts, env, self)
  }

  // Add masonry container plugin
  md.use(container, 'masonry', {
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        return `<div class="column-item">\n`
      }
      return '</div>\n'
    },
  })

  // Convert inline raw HTML tags (e.g. <chrono>, <svg>) to literal text,
  // so the Vue compiler won't treat them as unclosed elements and fail the build
  md.core.ruler.after('inline', 'guardInlineHtmlTags', (state: any) => {
    for (const token of state.tokens) {
      if (!token.children) continue
      for (const child of token.children) {
        if (child.type === 'html_inline') {
          child.type = 'text'
        }
      }
    }
  })
}