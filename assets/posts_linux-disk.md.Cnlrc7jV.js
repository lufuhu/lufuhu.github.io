import{_ as a,c as n,o as e,ah as i}from"./chunks/framework.DE7iKuik.js";const k=JSON.parse('{"title":"Linux 挂载磁盘分区","frontmatter":{"title":"Linux 挂载磁盘分区","createTime":"2024/01/11 14:30:55","permalink":"/article/linux-disk/","lastUpdated":"2026-01-22","tags":[],"link":"/posts/linux-disk","layout":"doc","prev":{"text":"使用 mysqldump 备份MySQL数据库","link":"/posts/mysqldump"},"next":{"text":"Linux 安装 Nginx","link":"/posts/linux-install-nginx"}},"headers":[],"params":{"pkg":"linux-disk"},"relativePath":"posts/linux-disk.md","filePath":"posts/[pkg].md"}'),p={name:"posts/linux-disk.md"};function l(t,s,c,o,d,r){return e(),n("div",null,[...s[0]||(s[0]=[i(`<h2 id="已挂载磁盘" tabindex="-1">已挂载磁盘 <a class="header-anchor" href="#已挂载磁盘" aria-label="Permalink to “已挂载磁盘”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>df -h</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Filesystem               Size  Used Avail Use% Mounted on</span></span>
<span class="line"><span>devtmpfs                 1.9G     0  1.9G   0% /dev</span></span>
<span class="line"><span>tmpfs                    1.9G     0  1.9G   0% /dev/shm</span></span>
<span class="line"><span>tmpfs                    1.9G   12M  1.9G   1% /run</span></span>
<span class="line"><span>tmpfs                    1.9G     0  1.9G   0% /sys/fs/cgroup</span></span>
<span class="line"><span>/dev/mapper/centos-root   17G  2.0G   15G  12% /</span></span>
<span class="line"><span>/dev/sda1               1014M  224M  791M  23% /boot</span></span>
<span class="line"><span>tmpfs                    378M     0  378M   0% /run/user/0</span></span></code></pre></div><h2 id="查看所有磁盘" tabindex="-1">查看所有磁盘 <a class="header-anchor" href="#查看所有磁盘" aria-label="Permalink to “查看所有磁盘”">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>fdisk -l</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Disk /dev/sda: 85.9 GB, 85899345920 bytes, 167772160 sectors</span></span>
<span class="line"><span>Units = sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span>
<span class="line"><span>Disk label type: dos</span></span>
<span class="line"><span>Disk identifier: 0x0009a7fc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   Device Boot      Start         End      Blocks   Id  System</span></span>
<span class="line"><span>/dev/sda1   *        2048     2099199     1048576   83  Linux</span></span>
<span class="line"><span>/dev/sda2         2099200    41943039    19921920   8e  Linux LVM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/mapper/centos-root: 18.2 GB, 18249416704 bytes, 35643392 sectors</span></span>
<span class="line"><span>Units = sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors</span></span>
<span class="line"><span>Units = sectors of 1 * 512 = 512 bytes</span></span>
<span class="line"><span>Sector size (logical/physical): 512 bytes / 512 bytes</span></span>
<span class="line"><span>I/O size (minimum/optimal): 512 bytes / 512 bytes</span></span></code></pre></div>`,6)])])}const b=a(p,[["render",l]]);export{k as __pageData,b as default};
