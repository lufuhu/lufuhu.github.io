---
title: Golang 加密解密算法
lastUpdated: 2024-01-17 16:14:11
---

## 加密方式
- 对称加密, 加解密都使用的是同一个密钥, 其中的代表就是AES,DES
- 非对加解密, 加解密使用不同的密钥, 其中的代表就是RSA
- 签名算法, 如MD5,SHA1,HMAC等, 主要用于验证,防止信息被修改, 如：文件校验,数字签名,鉴权协议

## AES
AES,即高级加密标准（Advanced Encryption Standard）,一个对称分组密码算法
```go
import (
    "bytes"
    "crypto/aes"
    "fmt"
    "crypto/cipher"
    "encoding/base64"
)

func main() {
    orig := "hello world"
    key := "123456781234567812345678"
    fmt.Println("原文：", orig)

    encryptCode := AesEncrypt(orig, key)
    fmt.Println("密文：" , encryptCode)

    decryptCode := AesDecrypt(encryptCode, key)
    fmt.Println("解密结果：", decryptCode)
}

func AesEncrypt(orig string, key string) string {
    // 转成字节数组
    origData := []byte(orig)
    k := []byte(key)

	// 分组秘钥
	block, err := aes.NewCipher(k)
	if err != nil {
		panic(fmt.Sprintf("key 长度必须 16/24/32长度: %s", err.Error()))
	}
    // 获取秘钥块的长度
    blockSize := block.BlockSize()
    // 补全码
    origData = PKCS7Padding(origData, blockSize)
    // 加密模式
    blockMode := cipher.NewCBCEncrypter(block, k[:blockSize])
    // 创建数组
    cryted := make([]byte, len(origData))
    // 加密
    blockMode.CryptBlocks(cryted, origData)
    //使用RawURLEncoding 不要使用StdEncoding
    //不要使用StdEncoding  放在url参数中回导致错误
    return base64.RawURLEncoding.EncodeToString(cryted)

}

func AesDecrypt(cryted string, key string) string {
    //使用RawURLEncoding 不要使用StdEncoding
    //不要使用StdEncoding  放在url参数中回导致错误
    crytedByte, _ := base64.RawURLEncoding.DecodeString(cryted)
    k := []byte(key)

	// 分组秘钥
	block, err := aes.NewCipher(k)
	if err != nil {
		panic(fmt.Sprintf("key 长度必须 16/24/32长度: %s", err.Error()))
	}
    // 获取秘钥块的长度
    blockSize := block.BlockSize()
    // 加密模式
    blockMode := cipher.NewCBCDecrypter(block, k[:blockSize])
    // 创建数组
    orig := make([]byte, len(crytedByte))
    // 解密
    blockMode.CryptBlocks(orig, crytedByte)
    // 去补全码
    orig = PKCS7UnPadding(orig)
    return string(orig)
}

//补码
func PKCS7Padding(ciphertext []byte, blocksize int) []byte {
    padding := blocksize - len(ciphertext)%blocksize
    padtext := bytes.Repeat([]byte{byte(padding)}, padding)
    return append(ciphertext, padtext...)
}

//去码
func PKCS7UnPadding(origData []byte) []byte {
    length := len(origData)
    unpadding := int(origData[length-1])
    return origData[:(length - unpadding)]
}
```
## DES
DES是一种对称加密算法,又称为美国数据加密标准
```go
func ZeroPadding(ciphertext []byte, blockSize int) []byte {
    padding := blockSize - len(ciphertext)%blockSize
    padtext := bytes.Repeat([]byte{0}, padding)
    return append(ciphertext, padtext...)
}

func ZeroUnPadding(origData []byte) []byte {
    return bytes.TrimFunc(origData,
        func(r rune) bool {
            return r == rune(0)
        })
}
```
加密
```go
func Encrypt(text string, key []byte) (string, error) {
    src := []byte(text)
    block, err := des.NewCipher(key)
    if err != nil {
        return "", err
    }
    bs := block.BlockSize()
    src = ZeroPadding(src, bs)
    if len(src)%bs != 0 {
        return "", errors.New("Need a multiple of the blocksize")
    }
    out := make([]byte, len(src))
    dst := out
    for len(src) > 0 {
        block.Encrypt(dst, src[:bs])
        src = src[bs:]
        dst = dst[bs:]
    }
    return hex.EncodeToString(out), nil
}
```
解密
```go
func Decrypt(decrypted string , key []byte) (string, error) {
    src, err := hex.DecodeString(decrypted)
    if err != nil {
        return "", err
    }
    block, err := des.NewCipher(key)
    if err != nil {
        return "", err
    }
    out := make([]byte, len(src))
    dst := out
    bs := block.BlockSize()
    if len(src)%bs != 0 {
        return "", errors.New("crypto/cipher: input not full blocks")
    }
    for len(src) > 0 {
        block.Decrypt(dst, src[:bs])
        src = src[bs:]
        dst = dst[bs:]
    }
    out = ZeroUnPadding(out)
    return string(out), nil
}
```
```go
func main() {
    key := []byte("2fa6c1e9")
    str :="I love this beautiful world!"
    strEncrypted, err := Encrypt(str, key)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Encrypted:", strEncrypted)
    strDecrypted, err := Decrypt(strEncrypted, key)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Decrypted:", strDecrypted)
}
```
## RSA
首先使用openssl生成公私钥,使用RSA的时候需要提供公钥和私钥 , 可以通过openss来生成对应的pem格式的公钥和私钥匙
```go
import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/x509"
    "encoding/base64"
    "encoding/pem"
    "errors"
    "fmt"
)

// 私钥生成
//openssl genrsa -out rsa_private_key.pem 1024
var privateKey = []byte(`
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDcGsUIIAINHfRTdMmgGwLrjzfMNSrtgIf4EGsNaYwmC1GjF/bM
h0Mcm10oLhNrKNYCTTQVGGIxuc5heKd1gOzb7bdTnCDPPZ7oV7p1B9Pud+6zPaco
qDz2M24vHFWYY2FbIIJh8fHhKcfXNXOLovdVBE7Zy682X1+R1lRK8D+vmQIDAQAB
AoGAeWAZvz1HZExca5k/hpbeqV+0+VtobMgwMs96+U53BpO/VRzl8Cu3CpNyb7HY
64L9YQ+J5QgpPhqkgIO0dMu/0RIXsmhvr2gcxmKObcqT3JQ6S4rjHTln49I2sYTz
7JEH4TcplKjSjHyq5MhHfA+CV2/AB2BO6G8limu7SheXuvECQQDwOpZrZDeTOOBk
z1vercawd+J9ll/FZYttnrWYTI1sSF1sNfZ7dUXPyYPQFZ0LQ1bhZGmWBZ6a6wd9
R+PKlmJvAkEA6o32c/WEXxW2zeh18sOO4wqUiBYq3L3hFObhcsUAY8jfykQefW8q
yPuuL02jLIajFWd0itjvIrzWnVmoUuXydwJAXGLrvllIVkIlah+lATprkypH3Gyc
YFnxCTNkOzIVoXMjGp6WMFylgIfLPZdSUiaPnxby1FNM7987fh7Lp/m12QJAK9iL
2JNtwkSR3p305oOuAz0oFORn8MnB+KFMRaMT9pNHWk0vke0lB1sc7ZTKyvkEJW0o
eQgic9DvIYzwDUcU8wJAIkKROzuzLi9AvLnLUrSdI6998lmeYO9x7pwZPukz3era
zncjRK3pbVkv0KrKfczuJiRlZ7dUzVO0b6QJr8TRAA==
-----END RSA PRIVATE KEY-----
`)

// 公钥: 根据私钥生成
//openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
var publicKey = []byte(`
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcGsUIIAINHfRTdMmgGwLrjzfM
NSrtgIf4EGsNaYwmC1GjF/bMh0Mcm10oLhNrKNYCTTQVGGIxuc5heKd1gOzb7bdT
nCDPPZ7oV7p1B9Pud+6zPacoqDz2M24vHFWYY2FbIIJh8fHhKcfXNXOLovdVBE7Z
y682X1+R1lRK8D+vmQIDAQAB
-----END PUBLIC KEY-----
`)

// 加密
func RsaEncrypt(origData []byte) ([]byte, error) {
    //解密pem格式的公钥
    block, _ := pem.Decode(publicKey)
    if block == nil {
        return nil, errors.New("public key error")
    }
    // 解析公钥
    pubInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
    if err != nil {
        return nil, err
    }
    // 类型断言
    pub := pubInterface.(*rsa.PublicKey)
    //加密
    return rsa.EncryptPKCS1v15(rand.Reader, pub, origData)
}

// 解密
func RsaDecrypt(ciphertext []byte) ([]byte, error) {
    //解密
    block, _ := pem.Decode(privateKey)
    if block == nil {
        return nil, errors.New("private key error!")
    }
    //解析PKCS1格式的私钥
    priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
    if err != nil {
        return nil, err
    }
    // 解密
    return rsa.DecryptPKCS1v15(rand.Reader, priv, ciphertext)
}
func main() {
    data, _ := RsaEncrypt([]byte("hello world"))
    fmt.Println(base64.StdEncoding.EncodeToString(data))
    origData, _ := RsaDecrypt(data)
    fmt.Println(string(origData))
} 
```
## ES256、ES384、ES521
```go
import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"encoding/pem"
	"github.com/spf13/cobra"
	"log"
	"os"
)


// ecdsaCmd represents the doc command
 func keyPairs(keyName string) {
    //elliptic.P256(),elliptic.P384(),elliptic.P521()

    privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
    if err != nil {
        log.Fatal(err)
    }
    x509Encoded, _ := x509.MarshalECPrivateKey(privateKey)
    privateBs := pem.EncodeToMemory(&pem.Block{Type: "PRIVATE KEY", Bytes: x509Encoded})
    privateFile, err := os.Create(keyName + ".private.pem")
    if err != nil {
        log.Fatal(err)
    }
    _, err = privateFile.Write(privateBs)
    if err != nil {
        log.Fatal(err)
    }
    x509EncodedPub, _ := x509.MarshalPKIXPublicKey(privateKey.Public())
    publicBs := pem.EncodeToMemory(&pem.Block{Type: "PUBLIC KEY", Bytes: x509EncodedPub})
    publicKeyFile, err := os.Create(keyName + ".public.pem")
    if err != nil {
        log.Fatal(err)
    }
    _, err = publicKeyFile.Write(publicBs)
    if err != nil {
        log.Fatal(err)
    }
}
```
## SHA
SHA1
```go
package main

import (
    "crypto/sha1"
    "fmt"
)

func main() {
    s := "sha1 this string"

    h := sha1.New()

    h.Write([]byte(s))

    bs := h.Sum(nil)

    fmt.Println(s)
    fmt.Printf("%x\n", bs)
}
```
SHA256
```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
)
func main() {

    secret := "mysecret"
    data := "data"
    fmt.Printf("Secret: %s Data: %s\n", secret, data)

    // Create a new HMAC by defining the hash type and the key (as byte array)
    h := hmac.New(sha256.New, []byte(secret))

    // Write Data to it
    h.Write([]byte(data))

    // Get result and encode as hexadecimal string
    sha := hex.EncodeToString(h.Sum(nil))

    fmt.Println("Result: " + sha)
}
```
