import{_ as i,c as a,o as n,ah as p}from"./chunks/framework.DE7iKuik.js";const g=JSON.parse('{"title":"PHP-FPM 配置解析","frontmatter":{"title":"PHP-FPM 配置解析","createTime":"2023/11/17 14:27:15","permalink":"/article/php-fpm-ini/","tags":["PHP"],"lastUpdated":"2026-01-22","link":"/posts/php-fpm-ini","layout":"doc","prev":{"text":"PHP 动态调用类中的方法","link":"/posts/php-call-user-func"},"next":{"text":"NPM 代理","link":"/posts/npm-registry"}},"headers":[],"params":{"pkg":"php-fpm-ini"},"relativePath":"posts/php-fpm-ini.md","filePath":"posts/[pkg].md"}'),l={name:"posts/php-fpm-ini.md"};function h(k,s,e,t,r,E){return n(),a("div",null,[...s[0]||(s[0]=[p(`<div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 该文件中的所有配置均以分号 (;) 开头，代表注释行或不使用的指令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 全局配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[global]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 进程 ID 文件位置,默认none</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /var/run/php-fpm.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 错误日志文件位置,默认#INSTALL_PREFIX#/log/php-fpm.log</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">error_log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /var/log/php-fpm.log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 日志级别,枚举值:alert, error, warning, notice, debug,默认notice</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">log_level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = notice</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 日志限制每行字符数,默认1024,PHP&gt;=7.3.0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">log_limit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 1024</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 是否启用日志缓冲,如果启用了 log_buffering，PHP-FPM 会将所有的日志消息缓存在内存中，直到缓冲区填满或达到了一定的时间限制，然后再将缓冲区中的所有消息一次性写入磁盘。默认yes,PHP&gt;=7.3.0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">log_buffering</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 每 60 秒检查一次工作进程崩溃次数达到emergency_restart_threshold则重新启动主进程。默认值0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">emergency_restart_interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 60s/1m/2h/3d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 默认值为 0，表示禁用自动重启。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">emergency_restart_threshold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 指定 PHP-FPM 子进程可以响应来自主进程的控制信号的最长时间,如果worker进程10s没有相应则终止worker进程,默认为0s</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">process_control_timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 当pm=dynamic时,指定可以生成的 PHP-FPM 子进程的最大数量,默认为0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">process.max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 100</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 指定 PHP-FPM 子进程的优先级,范围-19-20,-19优先级别最高,默认不设置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">process.priority</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = -10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 是否开启守护进程,默认开启</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">daemonize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置fpm能打开的文件描述符数,默认值为操作系统默认值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rlimit_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">= 65532</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 用于限制 PHP-FPM 在发生崩溃时可以生成的core dump文件的最大大小。默认为0不限制</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rlimit_core</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 100M</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 用于指定PHP-FPM使用的事件处理机制。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">events.mechanism</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = epoll</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 用于控制 PHP-FPM 向 systemd 发送状态更新的频率。systemd 使用这些更新来监控 PHP-FPM 进程的健康状况并在必要时重新启动它。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">systemd_interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 进程池配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[pool]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 默认监听地址，接受FastCGI请求</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 可以是 Unix 套接字</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /run/php-fpm/php-fpm.sock</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 或 TCP/IP 地址</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1:9000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; FPM进程全连接队列长度</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; FreeBSD/OpenBSD默认值-1,意味着最大值</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; Linux 默认值 511</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.backlog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 1024</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; IP白名单</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.allowed_clients</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1, 192.168.1.0/24</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.allowed_clients</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = *</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置FPM listen进程用户和用户组</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.owner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = www-data</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = www-data</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 当使用unix.socket时的权限</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">listen.mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 0660</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置FPM worker进程用户和用户组</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = www-data</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = www-data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置FPM管理子进程的模式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; dynamic : 动态模式,推荐用这个</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = dynamic </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 动态模式下创建的最大子进程数量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.max_children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 100 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 动态模式下初始子进程数量,默认值为min_spare_servers + (max_spare_servers - min_spare_servers) / 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.start_servers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 动态模式下,当负载较低时保持至少10个空闲进程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.min_spare_servers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 动态模式下,当负载较高时保持最多20个空闲进程,工作中的子进程和空闲子进程的总数不超过pm.children</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.max_spare_servers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 20</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 动态模式下生成自己子进程的速率,一次生成32个</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.max_spawn_rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 32</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; static : 静态模式,子进程的数量是固定的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = static </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 静态模式下固定10个子进程数量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.max_children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; ondemand : 一次性模式,连接过来的时候再创建子进程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = ondemand</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 一次性模式模式下当子进程处理完毕,10s后删除,默认10s</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.process_idle_timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">;子进程处理500个请求之后重启,有效避免内存泄露,默认0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.max_requests</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 500</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 启用 FPM 状态页面,可以查看当前运行的 PHP-FPM 工作进程的数量、内存使用情况、请求等待队列的长度等。此外，还可以通过状态页面杀死或终止正在运行的进程、查看请求详情以及进行其他诊断操作。默认没有开启</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 通过以下配置之后,浏览器直接访问http://127.0.0.1:9000/status即可</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.status_listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1:9000</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pm.status_path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /status</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 用于检测 FPM 进程是否存活,当 Web 服务器通过 FastCGI 协议向 FPM 发送带有 /ping 路径的请求时，FPM 将会响应pong。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ping.path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /ping</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ping.path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = pong</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 用于指定 PHP-FPM 运行时文件和其他文件的安装路径前缀。它的作用是将 PHP-FPM 安装路径与其他系统路径分离开来，从而方便管理和维护。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /usr/local/php-fpm</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 当子进程处理单个请求超时60秒,请求结束之后,子进程会被终止,当php.ini选项\`max_execution_time\`由于某种原因没有停止脚本执行时将使用这个配置。默认0不开启</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">request_terminate_timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 60s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 当请求时间超过request_terminate_timeout时,如果配置开启,则立刻终止进程,自 PHP 7.3.0 启用。默认不开启</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">request_terminate_timeout_track_finished</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 开启记录请求慢日志</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">slowlog</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /usr/local/phpfpm/log/slow.log</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 超过10秒将被记入慢日志,默认0标识禁用慢日志功能</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">request_slowlog_timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 10s</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 记录调用栈的深度,默认20,PHP&gt;=7.2.0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">request_slowlog_trace_depth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 20</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 将 PHP-FPM 进程的根目录更改为指定目录。这意味着 PHP-FPM 进程将无法访问根目录之外的任何文件或目录。chroot 选项的值应该是一个绝对路径,默认不启用</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">chroot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /var/www</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 可以将 PHP-FPM 进程的当前工作目录更改为指定目录。这意味着 PHP-FPM 进程将在指定目录中运行，而不是在根目录中运行。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">chdir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /var/www/example.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 是否将工作进程输出重定向到主进程日志。建议将其设置为yes，以便在出现问题时能够更好地调试。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">catch_workers_output</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 是否在工作进程的日志中添加前缀。建议将其设置为no，以减少日志大小并减少I/O操作。PHP &gt;= 7.3.0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">decorate_workers_output</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 是否清除工作进程环境中的所有变量。建议将其设置为yes，以确保环境变量的一致性并增加安全性。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">clear_env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = yes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 允许运行的脚本扩展名列表。建议将其设置为只包含必要的脚本扩展名，以增强安全性。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">security.limit_extensions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = .php .html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 记录访问日志,默认不开启</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">access.log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = /var/log/access.log</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 访问日志格式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">access.format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = %R - %u %t \\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;%m %r\\&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置环境变量,可通过getenv()获取 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置 \`HOSTNAME\` 环境变量为主机名。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env[HOSTNAME] = $HOSTNAME</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置 \`PATH\` 环境变量为可执行文件的搜索路径。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env[PATH] = /usr/local/bin:/usr/bin:/bin\`</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置 \`TMP\` 环境变量为临时文件夹的路径。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env[TMP] = /tmp</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 设置ENV变量为生产环境,可通过</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">if (getenv(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ENV&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) == </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;product&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) 加载不同配置文档</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env[ENV] = product</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; php_admin_value 可以设置任何PHP配置选项的值</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; php_admin_flag 只能设置开/关型的选项。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; 两者将覆盖PHP.ini 配置文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; disable_functions / disable_classes无法覆盖,只能追加</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; ini_set()不能覆盖 php_admin_value/php_admin_flag</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_value[upload_max_filesize] = 100M</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_value[post_max_size] = 100M</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_value[error_log] = /var/log/fpm-php.www.log</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_flag[log_errors] = on</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_value[memory_limit] = 32M</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">php_admin_value[disable_functions] = exec</span></span></code></pre></div>`,1)])])}const c=i(l,[["render",h]]);export{g as __pageData,c as default};
