---
title: 文本比较
description: 比较两个文本并查看它们之间的差异。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  :styles="['/assets/iife/monaco-editor/index.css']"
  :scripts="['/assets/iife/monaco-editor/index.js']"
  :load="
    (scope) => {
      const monaco = scope.window.MonacoEditor
      const elm = scope.window.document.getElementById('text-diff-container')
      const originalModel = monaco.editor.createModel(`text original`, 'text/plain')
      const modifiedModel = monaco.editor.createModel(`text modified`, 'text/plain')
      const diffEditor = monaco.editor.createDiffEditor(elm, {
        theme: scope.isDark ? 'vs-dark' : 'vs',
        originalEditable: true,
        folding: false,
        automaticLayout: true,
        fixedOverflowWidgets: true,
        fontSize: 14,
        lineHeight: 22,
        extraEditorClassName: '',
        minimap: { enabled: false },
        overviewRulerBorder: false,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        formatOnPaste: true,
        renderValidationDecorations: 'on',
      })
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      })
      scope.changeTheme = (dark) => {
        monaco.editor.setTheme(dark ? 'vs-dark' : 'vs')
      }
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <div class="flex items-center">
        <div style="width: calc(50% - 15px);">
          <Input type="file" class="w-auto" />
        </div>
        <div>
          <Input type="file" />
        </div>
      </div>
      <div id="text-diff-container" class="w-full h-[70vh] shadow-xs rounded-md" :class="{ 'h-[79vh]': scope.isMaximized }"></div>
    </Card>
  </template>
</IifeContainer>