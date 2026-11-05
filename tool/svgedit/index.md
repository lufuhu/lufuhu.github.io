---
title: SVGEdit
description: 一款快速的 SVG 绘图编辑器
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  :styles="['/assets/iife/svgedit/index.css']"
  :scripts="['/assets/iife/svgedit/index.js']"
  :load="
    (scope) => {
      const EditorCtor = scope.window.Svgedit
      const svgEditor = new EditorCtor(scope.window.document.getElementById('svgedit-container'))
      svgEditor.setConfig({
        lang: 'zh-CN',
        allowInitialUserOverride: true,
        extensions: [],
        noDefaultExtensions: false,
        userExtensions: []
      })
      svgEditor.init()
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <div id="svgedit-container" class="w-full h-[70vh] shadow-xs rounded-md" :class="{ 'h-[86vh]': scope.isMaximized }"></div>
    </Card>
  </template>
</IifeContainer>