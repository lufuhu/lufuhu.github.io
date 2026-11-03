import { fileURLToPath, URL } from 'node:url'

export function patchVitePressUtils() {
  return {
    name: 'patch-vitepress-utils',
    enforce: 'pre',
    resolveId(source: string) {
      if (/^.*\/VPFeature\.vue$/.test(source)) {
        return fileURLToPath(new URL('../components/VPFeature.vue', import.meta.url))
      } else if (/^.*\/VPFeatures\.vue$/.test(source)) {
        return fileURLToPath(new URL('../components/VPFeatures.vue', import.meta.url))
      }
    },
  }
}

export function transformHtml(html: string) {
  let pattern = ['<html', '<body', '<pre', '<aside class="VPSidebar"']
  pattern.forEach((item) => {
    html = html.replaceAll(item, item + ' data-overlayscrollbars-initialize')
  })
  return html
}
