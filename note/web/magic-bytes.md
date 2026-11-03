---
title: Magic Bytes
lastUpdated: 2023-12-21 12:06:30
---

## Magic Number
|描述|扩展名|Magic Number|
|-|-|-|
|Adobe Illustrator|.ai|25 50 44 46 [%PDF]|
|Bitmap graphic|.bmp|42 4D [BM]|
|Class File|.class|CA FE BA BE|
|JPEG graphic file|.jpg|FF D8|
|JPEG 2000 graphic file|.jp2|0000000C6A5020200D0A [....jP..]|
|GIF graphic file|.gif|47 49 46 38 [GIF89]|
|TIF graphic file|.tif|49 49 [II]|
|PNG graphic file|.png|89 50 4E 47 .PNG|
|WAV audio file|.wav|52 49 46 46 RIFF|
|ELF Linux EXE|.elf|7F 45 4C 46 .ELF|
|Photoshop Graphics|.psd|38 42 50 53 [8BPS]|
|Windows Meta File|.wmf|D7 CD C6 9A|
|MIDI file|.mid|4D 54 68 64 [MThd]|
|Icon file|.ico|00 00 01 00|
|MP3 file with ID3 identity tag|.mp3|49 44 33 [ID3]|
|AVI video file|.avi|52 49 46 46 [RIFF]|
|Flash Shockwave|.swf|46 57 53 [FWS]|
|Flash Video|.flv|46 4C 56 [FLV]|
|Mpeg 4 video file|.mp4|00 00 00 18 66 74 79 70 6D 70 34 32 [....ftypmp42]|
|MOV video file|.mov|6D 6F 6F 76 [....moov]|
|Windows Video file|.wmv|30 26 B2 75 8E 66 CF|
|Windows Audio file|.wma|30 26 B2 75 8E 66 CF|
|PKZip|.zip|50 4B 03 04 [PK]|
|GZip|.gz|1F 8B 08|
|Tar file|.tar|75 73 74 61 72|
|Microsoft Installer|.msi|D0 CF 11 E0 A1 B1 1A E1|
|Object Code File|.obj|4C 01|
|Dynamic Library|.dll|4D 5A [MZ]|
|CAB Installer file|.cab|4D 53 43 46 [MSCF]|
|Executable file|.exe|4D 5A [MZ]|
|RAR file|.rar|52 61 72 21 1A 07 00 [Rar!...]|
|SYS file|.sys|4D 5A [MZ]|
|Help file|.hlp|3F 5F 03 00 [?_..]|
|VMWare Disk file|.vmdk|4B 44 4D 56 [KDMV]|
|Outlook Post Office file|.pst|21 42 44 4E 42 [!BDNB]|
|PDF Document|.pdf|25 50 44 46 [%PDF]|
|Word Document|.doc|D0 CF 11 E0 A1 B1 1A E1|
|RTF Document|.rtf|7B 5C 72 74 66 31 [{ tf1]|
|Excel Document|.xls|D0 CF 11 E0 A1 B1 1A E1|
|PowerPoint Document|.ppt|D0 CF 11 E0 A1 B1 1A E1|
|Visio Document|.vsd|D0 CF 11 E0 A1 B1 1A E1|
|DOCX (Office 2010)|.docx|50 4B 03 04 [PK]|
|XLSX (Office 2010)|.xlsx|50 4B 03 04 [PK]|
|PPTX (Office 2010)|.pptx|50 4B 03 04 [PK]|
|Microsoft Database|.mdb|53 74 61 6E 64 61 72 64 20 4A 65 74|
|Postcript File|.ps|25 21 [%!]|
|Outlook Message File|.msg|D0 CF 11 E0 A1 B1 1A E1|
|EPS File|.eps|25 21 50 53 2D 41 64 6F 62 65 2D 33 2E 30 20 45 50 53 46 2D 33 20 30|
|Jar File|.jar|50 4B 03 04 14 00 08 00 08 00|
|SLN File|.sln|4D 69 63 72 6F 73 6F 66 74 20 56 69 73 75 61 6C 20 53 74 75 64 69 6F 20 53 6F 6C 75 74 69 6F 6E 20 46 69 6C 65|
|Zlib File|.zlib|78 9C|
|SDF File|.sdf|78 9C|

## 使用 php 获取 magic bytes
```php
function magic_bytes($path, $position = 0, $bytes = 4)
{
    if (!file_exists($path)) {
        return null;
    }
    $handle = fopen($path, 'rb');
    fseek($handle, $position);
    $bytes = bin2hex(fread($handle, $bytes));
    fclose($handle);
    return $bytes;
}
```
使用 java 获取 magic bytes
```java
public static String getMagicBytes(String filePath, int position, int bytes) {
    try {
        byte[] data = Files.readAllBytes(Paths.get(filePath));
        ByteBuffer bb = ByteBuffer.wrap(data);
        bb.position(position);

        StringBuilder sb = new StringBuilder();
        for(int i=0; i<bytes; i++) {
            sb.append(String.format("%02x", bb.get()));
        }
        return sb.toString();
    }catch(IOException ex) {
        ex.printStackTrace();
        return null;
    }
}
```
## 使用 python3 获取 magic bytes
```python
def get_magic_bytes(file_path, position=0, nbytes=4):
    try:
        with open(file_path, 'rb') as file:
            file.seek(position)
            magic_bytes = file.read(nbytes)
        return magic_bytes.hex()
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return None
```
## 使用 golang 获取 magic bytes
```go
import (
    "fmt"
    "os"
)

func getMagicBytes(filePath string, position, nbytes int) (string, error) {
    file, err := os.Open(filePath)
    if err != nil {
        return "", err
    }
    defer file.Close()

    bytes := make([]byte, nbytes)
    _, err = file.ReadAt(bytes, int64(position))
    if err != nil {
        return "", err
    }

    return fmt.Sprintf("%x", bytes), nil
}
```
## 使用 dart 获取 magic bytes
```
import 'dart:async';
import 'dart:io';
import 'dart:convert';

Future getMagicBytes(String path, [int position = 0, int nbytes = 4]) async {
  var file = new File(path);
  if (!await file.exists()) {
    print("File does not exist.");
    return null;
  }

  RandomAccessFile openedFile = await file.open(mode: FileMode.read);
  await openedFile.setPosition(position);

  List magicBytes = [];
  for (int i = 0; i < nbytes; i++) {
    magicBytes.add(await openedFile.readByte());
  }

  await openedFile.close();

  return hex.encode(magicBytes);
}
```
