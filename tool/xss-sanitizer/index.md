---
title: XSS 净化
description: 超高速、超宽容 XSS 的HTML、MathML 和 SVG 净化器。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  :scripts="['/assets/iife/dompurify/index.js']"
  :load="
    (scope) => {
      const module = scope.window.Dompurify
      scope.input = '';
      scope.results = '';
      scope.generate = () => {
        scope.results = module.sanitize(scope.input);
      }
      let filename = '';
      scope.upload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        filename = file.name;
        const reader = new scope.window.FileReader();
        reader.onload = () => {
          scope.input = reader.result;
          scope.generate();
        };
        reader.readAsText(file);
        e.target.value = '';
      };
      scope.download = () => {
        const a = scope.window.document.createElement('a');
        a.href = scope.window.URL.createObjectURL(new scope.window.Blob([scope.results], { type: 'text/plain' }));
        a.download = filename || 'sanitized.txt';
        a.click();
        scope.window.URL.revokeObjectURL(a.href);
      };
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <div class="flex items-center gap-4">
        <InputGroup :class="`${scope.isMaximized  ? 'h-[85vh]!' : 'h-[60vh]!'}`">
          <InputGroupTextarea @input="scope.generate" v-model="scope.input" placeholder="请输入要清理的HTML、MathML 或 SVG 内容..."/>
          <InputGroupAddon align="block-start" class="border-b">
            <InputGroupText class="font-mono font-medium">
              原始内容
            </InputGroupText>
            <InputGroupButton as-child class="ml-auto" size="icon-xs">
              <label for="file-upload" class="cursor-pointer">
                <span class="icon-[ant-design--upload-outlined]"></span>
              </label>
            </InputGroupButton>
            <input id="file-upload" type="file" accept=".html,.htm,.xhtml,.svg,.mml,.mathml" class="sr-only" @change="scope.upload" />
            <CodeBlockCopyButton :value="scope.input" />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup :class="`${scope.isMaximized  ? 'h-[85vh]!' : 'h-[60vh]!'}`">
          <InputGroupTextarea v-model="scope.results" placeholder="清理结果..."/>
          <InputGroupAddon align="block-start" class="border-b">
            <InputGroupText class="font-mono font-medium">
              清理结果
            </InputGroupText>
            <InputGroupButton @click="scope.download" class="ml-auto" size="icon-xs">
              <span class="icon-[ant-design--download-outlined]"></span>
            </InputGroupButton>
            <CodeBlockCopyButton :value="scope.results" />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Card>
  </template>
</IifeContainer>