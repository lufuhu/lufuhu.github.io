---
title: JS 关闭当前页面
lastUpdated: 2023-12-21 10:08:10
---

## 直接关闭
```html
<a href="javascript:window.opener=null;window.open('','_self');window.close();">关闭</a>
```
## 带提示关闭
```html
<input id="btnClose" type="button" value="关闭" onClick="closePage()" />
```
```html
<script language="javascript">
function closePage(){
	if (confirm("您确定要关闭本页吗？")){
		window.opener=null;
		window.open('','_self');
		window.close();
	}
}
</script>
 

```
