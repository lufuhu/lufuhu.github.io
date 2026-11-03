---
title: vite 构建时实现分包
lastUpdated: 2023-12-04 09:44:56
---

分包策略就是把一些不会经常更新的文件，进行单独打包处理。
```js
build: {
  rollupOptions: {
    manualChunks: {
      vue: ['vue', 'vue-router'],
    }
  }
}
```
或者
```js
build: {
  rollupOptions: {
    manualChunks(id) {
      if (id.includes('element-plus')) {
        return 'element-plus';
      }
    }
  }
}
```
