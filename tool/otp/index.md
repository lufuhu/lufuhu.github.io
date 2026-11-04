---
title: OTP 生成
description: 一次性密码生成，常用于多因素认证（MFA）/双因素认证（2FA）。
sidebar: false
aside: false
lastUpdated: false
editLink: false
pageClass: container-page
---

<IifeContainer
  width="700px"
  :scripts="['/assets/iife/otpauth/index.js', '/assets/iife/qrcode/index.js', '/assets/iife/zxing-wasm/index.js']"
  :load="
    (scope) => {
      const OTPAuth = scope.window.Otpauth
      const QRCode = scope.window.Qrcode
      const readBarcodes = scope.window.ZxingWasm.readBarcodes
      scope.algorithmOptions = ['SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'SHA3-224', 'SHA3-256', 'SHA3-384', 'SHA3-512'];
      scope.issuer = 'lufuhu'
      scope.label = 'master@lufuhu.com'
      scope.algorithm = 'SHA1'
      scope.digits = 6
      scope.period = 30
      scope.offset = 1
      scope.secret = new OTPAuth.Secret({ size: 20 }).base32;
      scope.token = '';
      scope.uri = '';
      scope.qrcode = '';
      const createOTP = () => {
        return new OTPAuth.TOTP({
          issuer: scope.issuer,
          label: scope.label,
          algorithm: scope.algorithm,
          digits: scope.digits,
          period: scope.period,
          secret: OTPAuth.Secret.fromBase32(scope.secret),
        })
      }
      scope.create = () => {
        let totp = createOTP();
        scope.uri = totp.toString();
        scope.token = totp.generate();
        QRCode.toDataURL(scope.uri).then((url) => { 
          scope.qrcode = url;
        });
      }
      let timer = null;
      let remaining = 0;
      const countDown = () => {
        if (timer) {
          scope.window.clearInterval(timer);
        }
        scope.validMessage = `剩余 ${remaining} 秒`;
        timer = scope.window.setInterval(() => {
          remaining--;
          scope.validMessage = `剩余 ${remaining} 秒`;
          if (remaining <= 0) {
            scope.window.clearInterval(timer);
            timer = null;
            scope.generate();
          }
        }, 1000);
      }
      scope.create();
      scope.generate = () => {
        scope.validError = '';
        scope.validMessage = '';
        try {
          let totp = createOTP();
          scope.token = totp.generate();
          remaining = Math.ceil(totp.remaining() / 1000);
          countDown();
        } catch (error) {
          scope.validError = `密钥错误：${error.message}`;
        }
      }
      scope.generate();
      scope.validError = '';
      scope.validMessage = '';
      scope.validate = () => {
        scope.validError = '';
        scope.validMessage = '';
        let totp = createOTP();
        let delta = totp.validate({ token: scope.token, window: scope.offset });
        if (delta === null) {
          scope.validError = '令牌无效';
        } else {
          remaining = Math.ceil(totp.remaining() / 1000);
          countDown();
        }
      }
      scope.downloadQrcode = () => {
        const a = scope.window.document.createElement('a');
        a.href = scope.qrcode;
        a.download = `otp-qrcode.png`;
        a.click();
        scope.window.document.body.removeChild(a);
      };
      scope.uploadQrcode = (e) => {
        scope.qrcode = '';
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        readBarcodes(file, {
          tryHarder: true,
          formats: ['QRCode'],
          maxNumberOfSymbols: 1,
        }).then((codes) => {
          if (codes.length > 0) {
            scope.uri = codes[0].text;
            let _totp = OTPAuth.URI.parse(scope.uri);
            scope.issuer = _totp.issuer;
            scope.label = _totp.label;
            scope.algorithm = _totp.algorithm;
            scope.digits = _totp.digits;
            scope.period = _totp.period;
            scope.secret = _totp.secret.base32;
            scope.generate();
            scope.create();
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
        <Field class="flex-col items-start">
          <FieldLabel for="secret">密钥<span class="text-xs text-gray-500">输入密钥生成令牌</span></FieldLabel>
          <InputGroup>
            <InputGroupInput @input="scope.generate" placeholder="请输入密钥" v-model="scope.secret" />
            <InputGroupAddon align="inline-end">
              <CodeBlockCopyButton :value="scope.secret" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field class="flex-col items-start">
          <FieldLabel for="token">令牌<span class="text-xs text-gray-500">输入令牌验证是否有效</span></FieldLabel>
          <div class="flex gap-4 w-full items-center">
            <InputGroup class="flex-1">
              <InputGroupInput @input="scope.validate" placeholder="请输入令牌" v-model="scope.token" />
              <InputGroupAddon align="inline-end">
                <CodeBlockCopyButton :value="scope.token" />
              </InputGroupAddon>
            </InputGroup>
            <div class="flex-1 text-sm">
              <div v-if="scope.validError" class="text-red-500">{{ scope.validError }}</div>
              <div class="text-green-500" v-else-if="scope.validMessage">{{ scope.validMessage }}</div>
            </div>
          </div>
        </Field>
        <Marker variant="separator">
          <MarkerContent>OTP配置</MarkerContent>
        </Marker>
        <div class="flex gap-4 w-full">
          <div class="flex flex-col gap-3 flex-1">
            <Field>
              <FieldLabel for="issuer" class="w-16">提供商</FieldLabel>
              <Input @input="scope.create" placeholder="请输入提供商或服务名" v-model="scope.issuer" />
            </Field>
            <Field>
              <FieldLabel for="label" class="w-16">标识符</FieldLabel>
              <Input @input="scope.create" placeholder="请输入账户标识符" v-model="scope.label" />
            </Field>
            <Field>
              <FieldLabel for="algorithm" class="w-16">算法</FieldLabel>
              <Input @input="scope.create" placeholder="请输入算法" v-model="scope.algorithm" />
            </Field>
            <Field>
              <FieldLabel for="offset" class="w-16">时钟偏差</FieldLabel>
              <Input @input="scope.create" type="number" placeholder="offset..." v-model="scope.offset" />
            </Field>
            <Field>
              <FieldLabel for="digits" class="w-16">令牌长度</FieldLabel>
              <Input @input="scope.create" type="number" placeholder="请输入令牌长度" v-model="scope.digits" />
            </Field>
            <Field>
              <FieldLabel for="period" class="w-16">周期(秒)</FieldLabel>
              <Input @input="scope.create" type="number" placeholder="请输入周期(默认30秒)" v-model="scope.period" />
            </Field>
          </div>
          <div class="text-center">
            <img v-if="scope.qrcode" :src="scope.qrcode" alt="qrcode" class="w-52 h-52" />
            <div v-else class="w-52 h-52 my-4 flex items-center justify-center border border-dashed rounded-md text-sm text-gray-500">请上传二维码</div>
            <div class="flex items-center justify-between">
              <Button as-child size="sm">
                <label for="qr-upload" class="cursor-pointer">上传二维码</label>
                <input id="qr-upload" type="file" accept="image/*" class="sr-only" @change="scope.uploadQrcode" />
              </Button>
              <Button @click="scope.downloadQrcode" size="sm">下载二维码</Button>
            </div>
          </div>
        </div>
      </FieldGroup>
    </Card>
  </template>
</IifeContainer>