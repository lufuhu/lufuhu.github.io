import { onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'
import { OverlayScrollbars } from 'overlayscrollbars'

export const useOverlayScrollbars = () => {
  const options: any = { scrollbars: { theme: 'os-theme-dark' } }
  onMounted(() => {
    OverlayScrollbars(document.body, {
      overflow: { x: 'hidden' },
      ...options,
    })
  })
  onContentUpdated(() => {
    if (document.querySelector('.VPSidebar')) {
      OverlayScrollbars(document.querySelector('.VPSidebar') as HTMLElement, {
        overflow: { x: 'hidden' },
        ...options,
      })
    }
    document.querySelectorAll('.vp-doc [class*=language-] pre').forEach((pre) => {
      OverlayScrollbars(pre as HTMLElement, options)
    })
  })
}
