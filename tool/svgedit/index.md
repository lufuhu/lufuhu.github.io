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
  width="100%"
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
      scope.isMaximized = false;
      scope.handleMaximize = () => {
        scope.isMaximized = !scope.isMaximized;
      }
    }
  "
>
  <template #default="{ scope }">
    <div class="h-[70vh]" :class="{ 'w-screen h-screen fixed top-0 left-0 z-100': scope.isMaximized }">
      <Button @click="scope.handleMaximize" variant="ghost" size="icon-sm" class="absolute top-7 right-1 text-white z-100" :class="{'top-1': scope.isMaximized}">
        <span v-if="scope.isMaximized" class="icon-[doodle-icons--minimize] text-2xl"></span>
        <span v-else class="icon-[doodle-icons--maximize] text-2xl"></span>
      </Button>
      <div id="svgedit-container" class="w-full h-full shadow-xs rounded-md"></div>
    </div>
  </template>
</IifeContainer>