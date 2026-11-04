---
title: ULID 生成
description: 生成随机的通用唯一词典可排序标识符（ULID）。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/ulid/index.js']"
  :load="
    (scope) => {
      const ulid = scope.window.Ulid
      const u8 = scope.window.Uint8Array
      scope.namespaceOptions = {
        DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
      }
      scope.versionOptions = ['MIN', 'MAX', '默认', '递增', 'ULID转UUID', 'UUID转ULID'];
      scope.count = 10;
      scope.version = '默认';
      scope.input_uuid = '573418c7-c6d2-49f2-8b59-12e157b6618e';
      scope.input_ulid = '01M6J43GJNKRXSE9VRYBQ8J7N9';
      scope.results = '';
      scope.generate = () => {
        let items = [];
        if (scope.version === 'MIN') {
          items.push(ulid.MIN_ULID);
        } else if (scope.version === 'MAX') {
          items.push(ulid.MAX_ULID);
        } else if (scope.version === '默认') {
          for (let i = 0; i < scope.count; i++) {
            items.push(ulid.ulid());
          }
        } else if (scope.version === '递增') {
          const monotonicFactory = ulid.monotonicFactory();
          const time = new Date().getTime();
          for (let i = 0; i < scope.count; i++) {
            items.push(monotonicFactory(time));
          }
        } else if (scope.version === 'ULID转UUID') {
          items.push(ulid.ulidToUUID(scope.input_ulid));
        } else if (scope.version === 'UUID转ULID') {
          items.push(ulid.uuidToULID(scope.input_uuid));
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
          <RadioGroup :model-value="scope.version" @update:model-value="(v) => { scope.version = v; scope.generate() }" class="flex flex-wrap items-center gap-4">
            <div v-for="v in scope.versionOptions" :key="v" class="flex items-center">
              <RadioGroupItem :id="v" :value="v" />
              <Label class="px-2" :for="v">{{ v }}</Label>
            </div>
          </RadioGroup>
        </Field>
        <Field v-if="scope.version === '默认' || scope.version === '递增'">
          <FieldLabel for="version" class="w-16">数量</FieldLabel>
          <Input @input="scope.generate" type="number" v-model="scope.count" placeholder="请输入数量" />
        </Field>
        <Field v-if="scope.version === 'ULID转UUID'">
          <FieldLabel for="version" class="w-16">ULID</FieldLabel>
          <Input @input="scope.generate" type="text" v-model="scope.input_ulid" placeholder="请输入ULID" />
        </Field>
        <Field v-if="scope.version === 'UUID转ULID'">
          <FieldLabel for="version" class="w-16">UUID</FieldLabel>
          <Input @input="scope.generate" type="text" v-model="scope.input_uuid" placeholder="请输入UUID" />
        </Field>
        <Field>
          <CodeBlock class="min-h-70">
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