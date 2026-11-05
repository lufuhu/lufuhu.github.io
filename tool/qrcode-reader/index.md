---
title: 二维码/条形码读取
description: 基于 ZXing-C++ WebAssembly 的二维码/条形码读取工具。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/zxing-wasm/index.js']"
  :load="
    (scope) => {
      const readBarcodes = scope.window.ZxingWasm.readBarcodes
      scope.qrcode = '';
      scope.results = '';
      scope.uploadQrcode = (e) => {
        scope.qrcode = '';
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new scope.window.FileReader();
        reader.onload = () => {
          scope.qrcode = reader.result;
        };
        reader.readAsDataURL(file);
        readBarcodes(file, {
          tryHarder: true,
          formats: ['QRCode'],
          maxNumberOfSymbols: 1,
        }).then((codes) => {
          if (codes.length > 0) {
            scope.results = codes[0].text;
          }
        });
        e.target.value = '';
      };
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <FieldGroup>
        <Button class="w-full h-60" as-child variant="outline">
          <label for="qr-upload" class="flex items-center justify-center w-full h-full cursor-pointer">
            <img v-if="scope.qrcode" :src="scope.qrcode" alt="qrcode" class="max-h-48 w-auto" />
            <span v-else class="h-56 flex items-center justify-center text-sm text-gray-500">请上传二维码或条形码</span>
          </label>
        </Button>
        <input id="qr-upload" type="file" accept="image/*" class="sr-only" @change="scope.uploadQrcode" />
        <Field>
          <CodeBlock class="min-h-70">
            <CodeBlockHeader>
              <CodeBlockTitle>
                读取结果
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton :value="scope.results" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent wrap class="data-wrap:wrap-anywhere">
              {{ scope.results }}
            </CodeBlockContent>
          </CodeBlock>
        </Field>
      </FieldGroup>
    </Card>
  </template>
</IifeContainer>