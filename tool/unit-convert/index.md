---
title: 单位转换
description: 在不同单位之间进行转换
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/convert/index.js']"
  :load="
    (scope) => {
      const convert = scope.window.Convert
      console.log(convert.convertMany('1d 2h 30min').to('best').toString())
      console.log(convert.getMeasureKind('d'))
      scope.input = '';
      scope.generate = () => {
        console.log(convert.getMeasureKind(scope.input))
      }
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <FieldGroup>
        <Field>
          <FieldLabel for="input" class="w-10" :style="{color: scope.labelColor}">input</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate()" placeholder="input..." v-model="scope.input" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.input" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </Card>
  </template>
</IifeContainer>