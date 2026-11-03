---
title: Laravel Faker 数据填充
lastUpdated: 2023-11-27 16:44:02
---

## 修改配置
**在 `config/app.php` 配置支持中文：**
```php
'faker_locale' => 'zh_CN',
```
## 基本用法
### **基本 Faker\Provider\Base**
```php
$faker->randomDigit;//生成0-9之间的随机数
$faker->randomDigitNotNull;//生成1-9之间的随机数
$faker->randomNumber(5, true);//生成5位整数，true表示严格模式，即只能5位
 $faker->randomFloat(2, 0, 10);//生成浮点数，两位小数点，范围是0-10之间
$faker->numberBetween(0, 100);//生成随机整数，范围是0-100之间
$faker->randomLetter;//返回a-z之间任意的一个小写字符
$faker->randomElements(['a', 'b', 'c', 'd'], 2);//返回数组中的随机两个元素
$faker->randomElement(['aa', 'bb', 'cc', 'dd']);//随机返回数组中的一个元素
$faker->shuffle('hello, world'); //将字串中的字符打乱返回
$faker->shuffle(['aa', 'bb', 'cc', 'dd']); //将数组中的元素打乱返回
$faker->numerify('Hello #####');//#####替换为随机数字，输出类似：Hello 03501
$faker->lexify('Hello ???');//???替换为3个随机小写字符，输出类似：Hello krg
$faker->bothify('hello ##??');//#替换为随机数字,?替换为随机小写字符.输出类似：hello 15cr
$faker->asciify('hello *****');//*替换为随机字符，输出类似：hello 5Ynt[
$faker->regexify('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}');//根据正则表达式返回字串
```

### **文本 Faker\Provider\Lorem**
```php
$faker->word;//返回一个单词
$faker->words(3, false);//返回3个单词，false表示返回一个数组；true表示返回一个字符串，单词之间用空格分开
$faker->sentence(5, true);//返回一个句子，false表示只能含有5个单词，true表示可以在5个单词左右
$faker->sentences(3, false);//返回3条句子，false表示返回一个数组，true表示将三条句子拼成一条返回
$faker->paragraph(3, true);//返回一个段落，由3条句子组成。false表示只能有3条句子，true表示可以在3条句子左右
$faker->paragraphs(4, false);//返回4个段落。false表示返回一个数组，true表示将段落拼接在一起，并且用换行符分割
$faker->text(200);//返回一段文本，最多只能含有200个字符
```

### **人物 Faker\Provider\en_US\Person**
```php
$faker->title('female');//参数：title($gender = null|'male'|'female') .返回称呼。例如：Mrs.|Prof.|Dr.
$faker->titleMale;//返回男性称呼
$faker->titleFemale;//返回女性称呼
$faker->name('female');//参数：name($gender = null|'male'|'female') .返回姓名
$faker->firstName('female');//参数：firstName($gender = null|'male'|'female') .返回名
$faker->firstNameMale;//男性名字
$faker->firstNameFemale;//女性名字
$faker->lastName;//姓
```

### **地址 Faker\Provider\en_US\Address**
```php
$faker->cityPrefix;//城市前缀.如：Lake
$faker->secondaryAddress;//二级地址.如：Suite 061
$faker->state;//州、省（如：Colorado、四川省）
$faker->stateAbbr;//省份简称.如：晋、蒙、浙、冀
$faker->citySuffix;//城市后缀.如：side、land、port、Ville
$faker->streetSuffix;//街道后缀.如：Ramp、Plains
$faker->buildingNumber;//建筑物编号
$faker->city;//城市
$faker->streetName;//街道名称
$faker->streetAddress;//街道地址
$faker->postcode;//邮政编码
 $faker->address;//地址（城市+区）
 $faker->country;//国家
$faker->latitude;//纬度 latitude($min = -90, $max = 90)
$faker->longitude;//经度 longitude($min = -180, $max = 180)
```

### **电话号码 Faker\Provider\en_US\PhoneNumber**
```php
$faker->phoneNumber;//手机号码
$faker->tollFreePhoneNumber;
$faker->e164PhoneNumber;
```
### **公司 Faker\Provider\en_US\Company**
```php
$faker->catchPhrase;//口号
$faker->bs;
$faker->company;//公司名称
$faker->companySuffix;//公司名称后缀
$faker->jobTitle;//职称
```
### **文本 Faker\Provider\en_US\Text**
```php
 $faker->realText();//一段叙事文本
 ```
### **日期时间 Faker\Provider\DateTime**
```php
$faker->unixTime;//返回随机时间戳
$faker->unixTime('now');//返回随机时间戳 可选最后截止时间
$faker->dateTime;//返回一个随机的DateTime对象
$faker->dateTime('now', 'PRC');//返回一个随机的DateTime对象，可选择最后截止时间和时区
 $faker->dateTimeAD;//返回一个随机的DateTime对象
 $faker->dateTimeAD('now', 'PRC');//返回一个随机的DateTime对象，可选择最后截止时间和时区
$faker->iso8601;//返回一个随机的字符串形式的时间
$faker->iso8601('now');//返回一个随机的字符串形式的时间,可选择最后截止时间
$faker->date("Y-m-d H:i:s", 'now');//指定格式返回时间,可选择最后截止时间
$faker->time('Y-m-d H:i:s', 'now');//(同上)指定格式返回时间,可选择最后截止时间
$faker->dateTimeBetween('2019-01-01', 'now', 'PRC');//返回指定时间区间的DateTime对象，可选时区
$faker->dateTimeInInterval('-5 years', '+5 days', 'PRC');//返回指定时间区间的DateTime对象，可选时区(第一个参数：开始时间，第二个参数：时间范围)
$faker->dateTimeThisCentury;//返回一个本世纪内的DateTime对象
$faker->dateTimeThisCentury('1950-01-01', 'PRC');//返回一个本世纪内的DateTime对象.指定截止时间和时区
$faker->dateTimeThisDecade;//返回一个前十年内的DateTime对象
$faker->dateTimeThisDecade('2015-01-01', 'PRC');//返回一个前十年内的DateTime对象.指定允许的最后时间和时区
$faker->dateTimeThisYear;//返回一个前一年内的DateTime对象
$faker->dateTimeThisYear('now', 'PRC');//返回一个前一年内的DateTime对象.指定允许的最后时间和时区
$faker->dateTimeThisMonth;//返回一个前一个月内的DateTime对象
$faker->dateTimeThisMonth('-15 days', 'PRC');//返回一个前一个月内的DateTime对象.指定允许的最后时间和时区
$faker->amPm;//上午/下午
$faker->dayOfMonth;//返回几号
$faker->dayOfWeek;//返回星期几
$faker->month;//返回月份
$faker->monthName;//返回月份名称
$faker->year;//返回年份
$faker->year('2000-01-01');//返回年份.可指定最后截止日期
$timezone = $faker->timezone;//返回时区
```
### **互联网 Faker\Provider\Internet**
```php
$faker->email;//返回一个随机邮箱
$faker->safeEmail;//返回一个以@example.com结尾的安全邮箱
$faker->freeEmail;//返回一个随机邮箱
$faker->companyEmail;//返回企业邮箱（中文语言包下不可用）
$faker->freeEmailDomain;//返回一个邮件域名
$faker->safeEmailDomain;//返回安全的邮件域名
$faker->userName;//用户名
$faker->password;//密码
$faker->domainName;//域名（中文语言包下不可用）
$faker->domainWord;//不带后缀的域名（中文语言包下不可用）
$faker->tld;//域名后缀：如com、org（中文语言包下不可用）
$faker->url;//返回一个随机url（中文语言包下不可用）
$faker->slug;
$faker->ipv4;//返回一个ipv4地址
$faker->ipv6;//返回一个ipv6地址
 $faker->localIpv4;
$faker->macAddress;//mac地址
```
### **用户代理 Faker\Provider\UserAgent**
```php
$faker->userAgent;//返回一个随机的用户代理信息
$faker->chrome;//返回一个chrome浏览器的用户代理信息
$faker->firefox;//返回一个firefox浏览器的用户代理信息
$faker->safari;//返回一个safari浏览器的用户代理信息
$faker->opera;//返回一个opera浏览器的用户代理信息
$faker->internetExplorer;//返回一个internetExplorer浏览器的用户代理信息
```
### **支付 Faker\Provider\Payment**
```php
$faker->creditCardType;//信用卡类型
$faker->creditCardNumber;//信用卡号
$faker->creditCardExpirationDate;//信用卡到期日 (DateTime对象)
$faker->creditCardExpirationDateString;//信用卡到期日期字符串
$faker->creditCardDetails;//信用卡详情（数组）
 $faker->swiftBicNumber;
 $faker->iban;//国际银行账户
```
### **颜色 Faker\Provider\Color**
```php
 $faker->hexcolor;//十六进制的随机色：'#fa3cc2'
$faker->rgbcolor;//RGB格式的随机色（字串形式）：'0,255,122'
 $faker->rgbColorAsArray;//RGB格式的随机色（数组形式）：array(0,255,122)
$faker->rgbCssColor;//RGB格式的随机色的css表示：'rgb(0,255,122)'
$faker->safeColorName;//一个安全的随机色名称
 $faker->colorName;//随机色名称
```
### **文件 Faker\Provider\File**
```php
$faker->fileExtension;//文件后缀
$faker->mimeType;//mime类型
// 将一个随机文件从源文件复制到目标目录，并返回fullpath
$faker->file($sourceDir = './up1', $targetDir = './up2');
// 将一个随机文件从源文件复制到目标目录，并返回basename
$faker->file($sourceDir = './up1', $targetDir = './up2', false);
```
### **图片 Faker\Provider\Image**
```php
$faker->imageUrl();//https://lorempixel.com/640/480/?93028
$faker->imageUrl(320, 320, 'cats');//https://lorempixel.com/320/320/cats/?68416
$imageUrl = $faker->imageUrl(320, 320, 'cats', true, 'Faker');//https://lorempixel.com/320/320/cats/Faker/?68118
$faker->imageUrl(320, 320, 'cats', true, 'Faker', true);//https://lorempixel.com/gray/320/320/cats/Faker/?28732

//生成图片并保存到本地 '/tmp/13b73edae8443990be1aa8f1a483bc27.jpg'
$image = $faker->image('./tmp', 320, 320);
//设置类别并生成图片保存到本地  'tmp/13b73edae8443990be1aa8f1a483bc27.jpg'
$image = $faker->image('./tmp', 320, 320, 'cats');
//设置类别并生成图片保存到本地，只返回文件名 '13b73edae8443990be1aa8f1a483bc27.jpg'
$image = $faker->image('./tmp', 320, 320, 'cats', false);
// 生成没有随机化的图像
$image = $faker->image('./tmp', 320, 320, 'cats', true, false);
//生成图片并加上水印字体  'tmp/13b73edae8443990be1aa8f1a483bc27.jpg'
$image = $faker->image('./tmp', 320, 320, 'cats', true, true, 'Faker');
```
### **UUID Faker\Provider\Uuid**
```php
$uuid = $faker->uuid;//生成一个uuid
```
### **条形码 Faker\Provider\Barcode**
```php
$ean13 = $faker->ean13;//8105964964473
$ean8 = $faker->ean8;//05994441
$isbn13 = $faker->isbn13;//9780971408739
$isbn10 = $faker->isbn10;//0813387299
```
### **各种各样的 Faker\Provider\Miscellaneous**
```php
$boolean = $faker->boolean;//生成一个布尔值
$md5 = $faker->md5;//生成一个md5码
$sha1 = $faker->sha1;//生成一个sha1
$sha256 = $faker->sha256;//生成一个sha256
$locale = $faker->locale;//生成一个地区编码：如zh_CN
$countryCode = $faker->countryCode;//生成一个国家编码。如：UK
$languageCode = $faker->languageCode;//生成一个语言编码.如：en
$currencyCode = $faker->currencyCode;//生成一个货币代码.如：EUR
$emoji = $faker->emoji;//生成一个emoji表情
```
### **偏向的 Faker\Provider\Biased**
```php
//得到10到20之间的随机数，并且更多机会接近20
$biasedNumberBetween = $faker->biasedNumberBetween($min = 10, $max = 20, $function = 'sqrt');
```
### **html文本 Faker\Provider\HtmlLorem**
```php
//生成不超过2级深度的HTML文档，并且在任何级别上都不超过3个元素。
$randomHtml = $faker->randomHtml(2, 3);
Language specific formatters 特定于语言的格式器
```
### **银行 Faker\Provider\zh_CN\Payment**
```php
// 生成一个随机的银行名称(基于真实的中国银行的列表)
echo $faker->bank; // '中国建设银行'
```
### **人 Faker\Provider\zh_TW\Person**
```php
// Generates a random personal identify number
echo $faker->personalIdentityNumber; // A223456789
Faker\Provider\zh_TW\Company
// Generates a random VAT / Company Tax number
echo $faker->VAT; //23456789
```
