import type { MaybeRefOrGetter } from 'vue'
import { onMounted, onUnmounted, toValue, watch } from 'vue'

export interface UseStyleLinkOptions {
  /** CSS file URL, supports reactive value */
  href: MaybeRefOrGetter<string>
  /** Extra link attributes (e.g. media="print") */
  attrs?: Record<string, string>
}

/**
 * Dynamically insert a stylesheet link (client-side only, removed on unmount)
 */
export function useStyleLink(options: UseStyleLinkOptions) {
  const { href, attrs } = options

  let link: HTMLLinkElement | null = null

  function apply() {
    const value = toValue(href)
    if (typeof document === 'undefined') return
    if (link && link.getAttribute('href') === value) return
    remove()
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = value
    if (attrs) Object.entries(attrs).forEach(([k, v]) => link!.setAttribute(k, v))
    document.head.appendChild(link)
  }

  function remove() {
    link?.remove()
    link = null
  }

  onMounted(() => {
    apply()
    watch(() => toValue(href), apply)
  })

  onUnmounted(remove)
}
