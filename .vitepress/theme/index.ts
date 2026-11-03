// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './styles/globals.css'
import { useOverlayScrollbars } from '@/composables/overlayscrollbars.mjs'
import VPDocFooter from 'vitepress/dist/client/theme-default/components/VPDocFooter.vue'
import IifeContainer from '@/components/IifeContainer.vue'
import Card from '@/components/Card.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default {
  extends: DefaultTheme,
  setup() {
    useOverlayScrollbars()
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('VPDocFooter', VPDocFooter)
    app.component('IifeContainer', IifeContainer)
    app.component('Card', Card)
    app.component('Input', Input)
    app.component('Button', Button)
  },
} satisfies Theme
