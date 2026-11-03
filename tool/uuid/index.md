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
  width="700px"
  :scripts="['/assets/iife/uuid/index.js']"
  :load="
    (scope) => {
      const uuid = scope.window.Uuid
      const u8 = scope.window.Uint8Array
      scope.namespaceOptions = {
        DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
      }
      scope.versionOptions = ['NIL', 'MAX', 'V1', 'V3', 'V4', 'V5', 'V6', 'V7'];
      scope.count = 10;
      scope.version = 'V4';
      scope.namespace = 'DNS';
      scope.name = '';  
      scope.results = '';
      scope.generate = () => {
        let items = [];
        for (let i = 0; i < scope.count; i++) {
          if (scope.version === 'NIL') {
            items.push(uuid.NIL);
          } else if (scope.version === 'MAX') {
            items.push(uuid.MAX);
          } else if (scope.version === 'V1') {
            items.push(uuid.v1({
              node: u8.from(Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))),
              clockseq: i,
              msecs: new Date().getTime(),
              nsecs: Math.floor(Math.random() * 10000),
            }));
          } else if (scope.version === 'V3') {
            items.push(uuid.v3(scope.name, scope.namespace));
          } else if (scope.version === 'V4') {
            items.push(uuid.v4());
          } else if (scope.version === 'V5') {
            items.push(uuid.v5(scope.name, scope.namespace));
          } else if (scope.version === 'V6') {
            items.push(uuid.v6({
              node: u8.from(Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))),
              clockseq: i,
              msecs: new Date().getTime(),
              nsecs: Math.floor(Math.random() * 10000),
            }));
          } else if (scope.version === 'V7') {
            items.push(uuid.v7());
          }
        }
        scope.results = items.join('\n');
      }
      scope.generate();
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <FieldGroup>
        <Field>
          <FieldLabel for="version" class="w-16">版本</FieldLabel>
          <RadioGroup v-model="scope.version" class="flex flex-wrap items-center gap-4">
            <div v-for="v in scope.versionOptions" :key="v" class="flex items-center">
              <RadioGroupItem :id="v" :value="v" />
              <Label class="w-10 px-2" :for="v">{{ v }}</Label>
            </div>
          </RadioGroup>
        </Field>
        <Field>
          <FieldLabel for="version" class="w-16">数量</FieldLabel>
          <Input type="number" v-model="scope.count" placeholder="请输入数量" />
        </Field>
        <Field v-if="scope.version === 'V3' || scope.version === 'V5'">
          <FieldLabel for="version" class="w-16">命名空间</FieldLabel>
          <RadioGroup v-model="scope.namespace" class="flex flex-wrap items-center gap-4">
            <div v-for="(v, k) in scope.namespaceOptions" :key="k" class="flex items-center">
              <RadioGroupItem :id="k" :value="v" />
              <Label class="w-10 px-2" :for="k">{{ k }}</Label>
            </div>
          </RadioGroup>
        </Field>
        <Field v-if="scope.version === 'V3' || scope.version === 'V5'">
          <FieldLabel for="version" class="w-16">名称</FieldLabel>
          <Input type="text" v-model="scope.name" placeholder="请输入名称" />
        </Field>
        <Field>
          <Button type="primary" class="w-full" @click="scope.generate">生成UUID</Button>
        </Field>
        <Field>
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>
                生成结果
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton :value="scope.results" />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent line-numbers>
              {{ scope.results }}
            </CodeBlockContent>
          </CodeBlock>
        </Field>
      </FieldGroup>
    </Card>
  </template>
</IifeContainer>