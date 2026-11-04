---
title: Color 转换
description: 在不同格式（十六进制、rgb、hsl和css名称）之间转换颜色
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/colord/index.js']"
  :load="
    (scope) => {
      const module = scope.window.Colord
      scope.Hex = module.random().toHex();
      scope.Rgb = '';
      scope.Hsl = '';
      scope.Hsv = '';
      scope.Name = '';
      scope.Cmyk = '';
      scope.Hwb = '';
      scope.Lab = '';
      scope.Lch = '';
      scope.Xyz = '';
      scope.labelColor = '';
      scope.generate = (key) => {
        let value = '';
        if (key === 'Name') {
          const norm = (s) => s.replace(/\s+/g, '').toLowerCase();
          value = module.colornames.find((c) => norm(c.name) === norm(scope[key]))?.hex || '';
        } else if (key === 'Hsv' || key === 'Lab' || key === 'Xyz') {
           value = JSON.parse(scope[key]);
        } else {
          value = scope[key];
        }
        const c = module.colord(value);
        if (!c.parsed) {
          scope.labelColor = 'transparent';
          return;
        }
        scope.Hex = c.toHex();
        scope.Rgb = c.toRgbString();
        scope.Hsl = c.toHslString();
        scope.Hsv = JSON.stringify(c.toHsv(), null, 2);
        scope.Name = module.colornames.find((c) => c.hex === scope.Hex)?.name || 'unknown';
        scope.Cmyk = c.toCmykString();
        scope.Hwb = c.toHwbString();
        scope.Lab = JSON.stringify(c.toLab(), null, 2);
        scope.Lch = c.toLchString();
        scope.Xyz = JSON.stringify(c.toXyz(), null, 2);
        scope.labelColor = c.toHex();
      }
      scope.generate('Hex');
    }
  "
>
  <template #default="{ scope }">
    <Card>
      <FieldGroup>
        <Field>
          <FieldLabel for="Hex" class="w-10" :style="{color: scope.labelColor}">Hex</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Hex')" placeholder="Hex..." v-model="scope.Hex" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Hex" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Rgb" class="w-10" :style="{color: scope.labelColor}">Rgb</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Rgb')" placeholder="Rgb..." v-model="scope.Rgb" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Rgb" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Hsl" class="w-10" :style="{color: scope.labelColor}">Hsl</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Hsl')" placeholder="Hsl..." v-model="scope.Hsl" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Hsl" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Hsv" class="w-10" :style="{color: scope.labelColor}">Hsv</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Hsv')" placeholder="Hsv..." v-model="scope.Hsv" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Hsv" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Name" class="w-10" :style="{color: scope.labelColor}">Name</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Name')" placeholder="Name..." v-model="scope.Name" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Name" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Cmyk" class="w-10" :style="{color: scope.labelColor}">Cmyk</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Cmyk')" placeholder="Cmyk..." v-model="scope.Cmyk" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Cmyk" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Hwb" class="w-10" :style="{color: scope.labelColor}">Hwb</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Hwb')" placeholder="Hwb..." v-model="scope.Hwb" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Hwb" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Lab" class="w-10" :style="{color: scope.labelColor}">Lab</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Lab')" placeholder="Lab..." v-model="scope.Lab" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Lab" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Lch" class="w-10" :style="{color: scope.labelColor}">Lch</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Lch')" placeholder="Lch..." v-model="scope.Lch" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Lch" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="Xyz" class="w-10" :style="{color: scope.labelColor}">Xyz</FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate('Xyz')" placeholder="Xyz..." v-model="scope.Xyz" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.Xyz" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </Card>
  </template>
</IifeContainer>