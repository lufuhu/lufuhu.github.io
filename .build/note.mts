import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import path from 'path'

const standardName = {
  docker: 'Docker',
  go: 'Go',
  kubernetes: 'Kubernetes',
  linux: 'Linux',
  mysql: 'MySQL',
  nodejs: 'Node.js',
  php: 'PHP',
  python: 'Python',
  sql: 'SQL',
  tool: '工具',
  vue: 'Vue',
  web: 'Web',
}

let indexList = []
let tagData = {}
fs.readdirSync('note').forEach((dir) => {
  if (fs.statSync(`note/${dir}`).isDirectory() && dir !== 'images' && dir !== 'page') {
    tagData[dir] = []
    let files = fs.readdirSync(`note/${dir}`).filter((filename) => filename !== 'index.md' && filename !== 'page')
    files.sort((a, b) => fs.statSync(`note/${dir}/${b}`).mtime.getTime() - fs.statSync(`note/${dir}/${a}`).mtime.getTime())
    files.forEach((filename) => {
      let content = fs.readFileSync(`note/${dir}/${filename}`, { encoding: 'utf-8' })
      let doc = matter(content)
      let item = doc.data
      item.lastUpdated = dayjs(item.lastUpdated).format('YYYY-MM-DD HH:mm')
      item.tag = standardName[dir] || dir
      item.link = `/note/${dir}/${filename.replace('.md', '')}`
      indexList.push(item)
      tagData[dir].push(item)
    })
  }
})

const pageSize = 10
const createPage = (list: any[], dir: string, tagContent: string) => {
  list.sort((a, b) => dayjs(b.lastUpdated).unix() - dayjs(a.lastUpdated).unix())
  let pages = []
  for (let i = 0; i < list.length; i += pageSize) {
    pages.push(list.slice(i, i + pageSize))
  }
  pages.forEach((page, index) => {
    let output = index === 0 ? `${dir}/index.md` : `${dir}/page/${index + 1}.md`
    fs.ensureDirSync(path.dirname(output))
    let content = ''
    let prevText =
      index === 0
        ? ''
        : `
prev:
  text: '上一页'
  link: '${index === 1 ? `/${dir}/` : `/${dir}/page/${index}`}'`
    let nextText =
      index === pages.length - 1
        ? ''
        : `
next:
  text: '下一页'
  link: '/${dir}/page/${index + 2}'`
    page.forEach((item: any) => {
      content += `  - title: ${item.title}
    link: ${item.link}
    details: ${item.lastUpdated}\n`
    })
    fs.writeFileSync(
      output,
      `---
layout: home
title: 学习笔记
pageClass: note-page
hero:
  actions:
${tagContent}
column: 1
features:
${content}
editLink: false
lastUpdated: false
${prevText}
${nextText}
---

<VPDocFooter />
`,
    )
  })
}

const createActions = (tag: string) => {
  let tags: any = []
  for (let dir in tagData) {
    tags.push({ text: standardName[dir] || dir, link: `/note/${dir}/`, size: tagData[dir].length, tag: dir })
  }
  tags.sort((a, b) => b.size - a.size)
  let tagContent = ''
  tags.forEach((item: any) => {
    tagContent += `    - theme: ${tag === item.tag ? 'brand' : 'alt'}
      text: ${item.text}（${item.size}）
      link: ${item.link}\n`
  })
  return tagContent
}

createPage(indexList, 'note', createActions(''))

for (let dir in tagData) {
  createPage(tagData[dir], `note/${dir}`, createActions(dir))
}
