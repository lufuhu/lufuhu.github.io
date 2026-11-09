---
title: 字体分包
description: 将字体文件拆分为适合网络分发的版本。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/cn-font-split/index.js', '/assets/iife/fflate/index.js']"
  :load="
    (scope) => {
      const fontSplit = scope.window.CnFontSplit;
      const fflate = scope.window.Fflate;
      scope.results = '';
      scope.text = '';
      scope.input = null;
      scope.filename = '';
      scope.zipped = null;
      scope.status = '';
      scope.download = () => {
        const a = scope.window.document.createElement('a');
        const blob = new scope.window.Blob([scope.zipped], { type: 'application/zip' });
        a.href = scope.window.URL.createObjectURL(blob);
        a.download = `${scope.filename}.zip`;
        a.click();
        scope.window.URL.revokeObjectURL(a.href);
      };
      scope.upload = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        scope.filename = file.name.replace(/\.[^.]+$/, '');
        scope.input = new scope.window.Uint8Array(await file.arrayBuffer());
        e.target.value = '';
      };
      scope.generate = () => {
        scope.status = 'running';
        scope.results = '';
        scope.zipped = null;
        let chars = [];
        if (scope.text){
          chars = [...new Set(scope.text)].map(c => c.codePointAt(0));
        }
        fontSplit({ input: scope.input, subsets: [chars] }).then((res) => {
          let files = {};
          res.forEach((item) => {
            files[item.name] = item.data;
            scope.results = `${item.name} ${item.data.length} bytes\n` + scope.results;
          });
          scope.zipped = fflate.zipSync(files);
          scope.status = 'success';
        }).catch(() => {
          scope.status = 'error';
        });
      };
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <FieldGroup>
        <Field>
          <Input type="file" @change="scope.upload" />
        </Field>
        <Field>
          <InputGroup >
            <InputGroupTextarea v-model="scope.text" placeholder="请输入要生成子集的文本（可选，为空时直接生成分包）" class="max-h-70"/>
          </InputGroup>
        </Field>
        <Field>
          <Button @click="scope.generate" class="w-full" :disabled="scope.status === 'running'">
            <span v-if="scope.status === 'running'" class="icon-[line-md--loading-twotone-loop] -ml-6 w-4"></span>生成子集
          </Button>
        </Field>
        <Field>
          <CodeBlock class="min-h-70 max-h-[65vh]">
            <CodeBlockHeader>
              <CodeBlockTitle>
                分包结果
              </CodeBlockTitle>
              <CodeBlockActions>
                <Button :disabled="scope.status !== 'success'" variant="link" size="sm" @click="scope.download">
                  <span class="icon-[line-md--download-outline]"></span>打包下载
                </Button>
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