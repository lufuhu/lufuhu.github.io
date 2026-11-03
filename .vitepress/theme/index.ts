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
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockFooter, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from '@/components/ui/code-block'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field'

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
    app.component('CodeBlock', CodeBlock)
    app.component('CodeBlockActions', CodeBlockActions)
    app.component('CodeBlockContent', CodeBlockContent)
    app.component('CodeBlockCopyButton', CodeBlockCopyButton)
    app.component('CodeBlockFooter', CodeBlockFooter)
    app.component('CodeBlockHeader', CodeBlockHeader)
    app.component('CodeBlockLine', CodeBlockLine)
    app.component('CodeBlockTitle', CodeBlockTitle)
    app.component('Label', Label)
    app.component('RadioGroup', RadioGroup)
    app.component('RadioGroupItem', RadioGroupItem)
    app.component('Field', Field)
    app.component('FieldContent', FieldContent)
    app.component('FieldDescription', FieldDescription)
    app.component('FieldError', FieldError)
    app.component('FieldGroup', FieldGroup)
    app.component('FieldLabel', FieldLabel)
    app.component('FieldLegend', FieldLegend)
    app.component('FieldSeparator', FieldSeparator)
    app.component('FieldSet', FieldSet)
    app.component('FieldTitle', FieldTitle)
  },
} satisfies Theme
