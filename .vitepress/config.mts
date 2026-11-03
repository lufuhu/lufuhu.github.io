import { defineConfig } from 'vitepress'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { transformHtml, patchVitePressUtils } from './theme/plugins/plugins.mts'
import { guardInlineMustache } from './theme/plugins/markdown-config.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'LuFuHu',
  titleTemplate: ':title - LuFuHu',
  description: 'LuFuHu,博客,工具,文档',
  lang: 'zh-Hans',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { type: 'text/css', rel: 'stylesheet', href: '/assets/overlayscrollbars.min.css' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'LuFuHu',
    nav: [
      { text: '学习笔记', link: '/note/', activeMatch: '^/note/' },
      { text: '开源精选', link: '/awesome/', activeMatch: '^/awesome/' },
      { text: '在线工具', link: '/tool/', activeMatch: '^/tool/' },
    ],
    editLink: {
      pattern: 'https://github.com/lufuhu/lufuhu.github.io/edit/master/:path',
      text: '在 GitHub 上编辑此页面',
    },
    lastUpdated: {
      text: '最后更新时间',
    },
    outline: 5,
    socialLinks: [{ icon: 'github', link: 'https://github.com/lufuhu' }],
    footer: {
      message: '鄂公网安备：42011202001971号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鄂ICP备：2021009343号',
      copyright: 'Copyright © 2019 Lufuhu'
    },
  },
  markdown: {
    config: guardInlineMustache,
  },
  ignoreDeadLinks: true,
  transformHtml,
  vite: {
    plugins: [tailwindcss(), patchVitePressUtils()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './theme'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1024,
    },
  },
})
