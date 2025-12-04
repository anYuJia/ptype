import { CodeLibrary, cleanCode } from './types';

/**
 * Bash/Linux 命令库
 */
export const bashLibrary: CodeLibrary = {
    easy: [
        // 基础文件操作
        {
            code: cleanCode(`ls -la`),
            difficulty: 'easy',
            title: '查看文件详细信息',
            tags: ['文件系统', '列表'],
        },
        {
            code: cleanCode(`pwd`),
            difficulty: 'easy',
            title: '显示当前路径',
            tags: ['导航'],
        },
        {
            code: cleanCode(`cd /home/user`),
            difficulty: 'easy',
            title: '切换目录',
            tags: ['导航'],
        },
        {
            code: cleanCode(`mkdir new_folder`),
            difficulty: 'easy',
            title: '创建目录',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`touch file.txt`),
            difficulty: 'easy',
            title: '创建文件',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`cp file.txt backup.txt`),
            difficulty: 'easy',
            title: '复制文件',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`mv old.txt new.txt`),
            difficulty: 'easy',
            title: '移动/重命名文件',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`rm file.txt`),
            difficulty: 'easy',
            title: '删除文件',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`rm -rf folder/`),
            difficulty: 'easy',
            title: '递归删除目录',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`cat file.txt`),
            difficulty: 'easy',
            title: '查看文件内容',
            tags: ['文本查看'],
        },
        {
            code: cleanCode(`head -n 10 file.txt`),
            difficulty: 'easy',
            title: '查看文件前10行',
            tags: ['文本查看'],
        },
        {
            code: cleanCode(`tail -n 20 file.txt`),
            difficulty: 'easy',
            title: '查看文件后20行',
            tags: ['文本查看'],
        },
        {
            code: cleanCode(`tail -f /var/log/syslog`),
            difficulty: 'easy',
            title: '实时查看日志',
            tags: ['日志', '监控'],
        },
        {
            code: cleanCode(`grep "error" logfile.txt`),
            difficulty: 'easy',
            title: '搜索文本',
            tags: ['文本搜索'],
        },
        {
            code: cleanCode(`chmod 755 script.sh`),
            difficulty: 'easy',
            title: '修改文件权限',
            tags: ['权限'],
        },
        {
            code: cleanCode(`chown user:group file.txt`),
            difficulty: 'easy',
            title: '修改文件所有者',
            tags: ['权限'],
        },
        {
            code: cleanCode(`echo "Hello World"`),
            difficulty: 'easy',
            title: '输出文本',
            tags: ['基础'],
        },
        {
            code: cleanCode(`history`),
            difficulty: 'easy',
            title: '查看命令历史',
            tags: ['工具'],
        },
        {
            code: cleanCode(`clear`),
            difficulty: 'easy',
            title: '清空终端',
            tags: ['工具'],
        },
        {
            code: cleanCode(`man ls`),
            difficulty: 'easy',
            title: '查看命令手册',
            tags: ['帮助'],
        },
        {
            code: cleanCode(`env | grep PATH`),
            difficulty: 'easy',
            title: '查看环境变量',
            tags: ['环境'],
        },
        {
            code: cleanCode(`alias ll='ls -la'`),
            difficulty: 'easy',
            title: '设置别名',
            tags: ['配置'],
        },
    ],

    medium: [
        // 文件搜索与处理
        {
            code: cleanCode(`find . -name "*.txt" -type f`),
            difficulty: 'medium',
            title: '查找文件',
            tags: ['查找'],
        },
        {
            code: cleanCode(`find /var/log -mtime -7 -type f`),
            difficulty: 'medium',
            title: '查找7天内修改的文件',
            tags: ['查找', '时间'],
        },
        {
            code: cleanCode(`grep -r "pattern" /path/to/dir`),
            difficulty: 'medium',
            title: '递归搜索目录',
            tags: ['搜索'],
        },
        {
            code: cleanCode(`grep -i "error" file.txt`),
            difficulty: 'medium',
            title: '忽略大小写搜索',
            tags: ['搜索'],
        },
        {
            code: cleanCode(`wc -l file.txt`),
            difficulty: 'medium',
            title: '统计行数',
            tags: ['文本处理'],
        },
        {
            code: cleanCode(`du -sh /home/user`),
            difficulty: 'medium',
            title: '查看目录大小',
            tags: ['磁盘'],
        },
        {
            code: cleanCode(`df -h`),
            difficulty: 'medium',
            title: '查看磁盘使用情况',
            tags: ['磁盘'],
        },

        // 进程管理
        {
            code: cleanCode(`ps aux | grep node`),
            difficulty: 'medium',
            title: '查找进程',
            tags: ['进程'],
        },
        {
            code: cleanCode(`top -u username`),
            difficulty: 'medium',
            title: '查看用户进程',
            tags: ['进程', '监控'],
        },
        {
            code: cleanCode(`kill -9 12345`),
            difficulty: 'medium',
            title: '强制终止进程',
            tags: ['进程'],
        },
        {
            code: cleanCode(`killall nginx`),
            difficulty: 'medium',
            title: '按名称终止进程',
            tags: ['进程'],
        },
        {
            code: cleanCode(`nohup ./script.sh &`),
            difficulty: 'medium',
            title: '后台运行脚本',
            tags: ['进程', '后台'],
        },

        // 网络命令
        {
            code: cleanCode(`curl -X GET https://api.example.com`),
            difficulty: 'medium',
            title: 'HTTP GET请求',
            tags: ['网络', 'HTTP'],
        },
        {
            code: cleanCode(`wget https://example.com/file.zip`),
            difficulty: 'medium',
            title: '下载文件',
            tags: ['网络', '下载'],
        },
        {
            code: cleanCode(`ping -c 5 google.com`),
            difficulty: 'medium',
            title: '测试网络连接',
            tags: ['网络', '诊断'],
        },
        {
            code: cleanCode(`netstat -tuln | grep LISTEN`),
            difficulty: 'medium',
            title: '查看监听端口',
            tags: ['网络', '端口'],
        },
        {
            code: cleanCode(`ss -tuln`),
            difficulty: 'medium',
            title: '查看套接字统计',
            tags: ['网络'],
        },
        {
            code: cleanCode(`lsof -i :8080`),
            difficulty: 'medium',
            title: '查看端口占用',
            tags: ['网络', '端口'],
        },

        // 压缩与解压
        {
            code: cleanCode(`tar -czf archive.tar.gz /path/to/dir`),
            difficulty: 'medium',
            title: '压缩目录',
            tags: ['压缩'],
        },
        {
            code: cleanCode(`tar -xzf archive.tar.gz`),
            difficulty: 'medium',
            title: '解压文件',
            tags: ['解压'],
        },
        {
            code: cleanCode(`zip -r archive.zip folder/`),
            difficulty: 'medium',
            title: 'ZIP压缩',
            tags: ['压缩'],
        },
        {
            code: cleanCode(`unzip archive.zip -d destination/`),
            difficulty: 'medium',
            title: 'ZIP解压',
            tags: ['解压'],
        },

        // Git命令
        {
            code: cleanCode(`git clone https://github.com/user/repo.git`),
            difficulty: 'medium',
            title: '克隆仓库',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git status`),
            difficulty: 'medium',
            title: '查看状态',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git add .`),
            difficulty: 'medium',
            title: '添加所有更改',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git commit -m "Initial commit"`),
            difficulty: 'medium',
            title: '提交更改',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git push origin main`),
            difficulty: 'medium',
            title: '推送到远程',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git pull origin main`),
            difficulty: 'medium',
            title: '拉取更新',
            tags: ['Git'],
        },
        {
            code: cleanCode(`git branch feature-branch`),
            difficulty: 'medium',
            title: '创建分支',
            tags: ['Git', '分支'],
        },
        {
            code: cleanCode(`git checkout develop`),
            difficulty: 'medium',
            title: '切换分支',
            tags: ['Git', '分支'],
        },
        {
            code: cleanCode(`git merge feature-branch`),
            difficulty: 'medium',
            title: '合并分支',
            tags: ['Git', '分支'],
        },
        {
            code: cleanCode(`git log --oneline -10`),
            difficulty: 'medium',
            title: '查看提交历史',
            tags: ['Git', '历史'],
        },

        // Docker命令
        {
            code: cleanCode(`docker ps -a`),
            difficulty: 'medium',
            title: '查看所有容器',
            tags: ['Docker'],
        },
        {
            code: cleanCode(`docker images`),
            difficulty: 'medium',
            title: '查看镜像列表',
            tags: ['Docker'],
        },
        {
            code: cleanCode(`docker run -d -p 8080:80 nginx`),
            difficulty: 'medium',
            title: '运行容器',
            tags: ['Docker'],
        },
        {
            code: cleanCode(`docker stop container_id`),
            difficulty: 'medium',
            title: '停止容器',
            tags: ['Docker'],
        },
        {
            code: cleanCode(`docker rm container_id`),
            difficulty: 'medium',
            title: '删除容器',
            tags: ['Docker'],
        },
        {
            code: cleanCode(`docker logs -f container_name`),
            difficulty: 'medium',
            title: '查看容器日志',
            tags: ['Docker', '日志'],
        },

        // 系统管理
        {
            code: cleanCode(`systemctl status nginx`),
            difficulty: 'medium',
            title: '查看服务状态',
            tags: ['系统', '服务'],
        },
        {
            code: cleanCode(`systemctl restart apache2`),
            difficulty: 'medium',
            title: '重启服务',
            tags: ['系统', '服务'],
        },
        {
            code: cleanCode(`systemctl enable docker`),
            difficulty: 'medium',
            title: '开机自启动',
            tags: ['系统', '服务'],
        },
        {
            code: cleanCode(`journalctl -u nginx -n 50`),
            difficulty: 'medium',
            title: '查看服务日志',
            tags: ['系统', '日志'],
        },

        // 文本处理
        {
            code: cleanCode(`sed 's/old/new/g' file.txt`),
            difficulty: 'medium',
            title: 'SED文本替换',
            tags: ['文本处理'],
        },
        {
            code: cleanCode(`awk '{print $1, $3}' file.txt`),
            difficulty: 'medium',
            title: 'AWK提取列',
            tags: ['文本处理'],
        },
        {
            code: cleanCode(`sort file.txt | uniq`),
            difficulty: 'medium',
            title: '排序并去重',
            tags: ['文本处理'],
        },
        {
            code: cleanCode(`cut -d',' -f1,3 data.csv`),
            difficulty: 'medium',
            title: 'CSV列提取',
            tags: ['文本处理', 'CSV'],
        },
        {
            code: cleanCode(`for file in *.txt; do\n\tmv "$file" "\${file%.txt}.bak"\ndone`),
            difficulty: 'medium',
            title: '批量重命名',
            tags: ['循环', '文件操作'],
        },
        {
            code: cleanCode(`function backup() {\n\ttar -czf "backup_$(date +%F).tar.gz" $1\n}`),
            difficulty: 'medium',
            title: '函数定义',
            tags: ['脚本'],
        },
    ],

    hard: [
        // 复杂文件操作
        {
            code: cleanCode(`find . -type f -name "*.log" -mtime +30 -exec rm {} \\;`),
            difficulty: 'hard',
            title: '删除30天前的日志',
            tags: ['文件清理', '自动化'],
        },
        {
            code: cleanCode(`find . -type f -size +100M -exec ls -lh {} \\; | awk '{print $9": "$5}'`),
            difficulty: 'hard',
            title: '查找大文件并显示大小',
            tags: ['查找', '分析'],
        },
        {
            code: cleanCode(`rsync -avz --progress --exclude='node_modules' /source/ user@remote:/dest/`),
            difficulty: 'hard',
            title: '远程同步排除目录',
            tags: ['同步', '网络'],
        },

        // 高级网络命令
        {
            code: cleanCode(`netstat -tuln | grep LISTEN | awk '{print $4}' | cut -d: -f2 | sort -u`),
            difficulty: 'hard',
            title: '列出所有监听端口',
            tags: ['网络', '管道'],
        },
        {
            code: cleanCode(`tcpdump -i eth0 -nn -s0 -v port 80`),
            difficulty: 'hard',
            title: '抓取HTTP包',
            tags: ['网络', '调试'],
        },
        {
            code: cleanCode(`iptables -A INPUT -p tcp --dport 22 -j ACCEPT`),
            difficulty: 'hard',
            title: '防火墙规则',
            tags: ['安全', '防火墙'],
        },
        {
            code: cleanCode(`nmap -sV -p 1-65535 192.168.1.1`),
            difficulty: 'hard',
            title: '端口扫描',
            tags: ['网络', '安全'],
        },

        // 复杂的文本处理
        {
            code: cleanCode(`awk 'NR==FNR{a[$1]=$2;next} $1 in a{print $0, a[$1]}' file1 file2`),
            difficulty: 'hard',
            title: 'AWK关联两个文件',
            tags: ['AWK', '高级文本处理'],
        },
        {
            code: cleanCode(`sed -n '/pattern1/,/pattern2/p' file.txt`),
            difficulty: 'hard',
            title: 'SED提取模式间内容',
            tags: ['SED', '文本提取'],
        },
        {
            code: cleanCode(`grep -oP '(?<=email: )\\S+' file.txt | sort | uniq -c`),
            difficulty: 'hard',
            title: '正则提取并统计邮箱',
            tags: ['正则', '统计'],
        },

        // 系统监控与分析
        {
            code: cleanCode(`ps aux --sort=-%mem | head -n 10`),
            difficulty: 'hard',
            title: '查看内存占用最高进程',
            tags: ['监控', '性能'],
        },
        {
            code: cleanCode(`iostat -x 1 5`),
            difficulty: 'hard',
            title: 'I/O统计监控',
            tags: ['监控', 'I/O'],
        },
        {
            code: cleanCode(`vmstat 1 10`),
            difficulty: 'hard',
            title: '虚拟内存统计',
            tags: ['监控', '内存'],
        },
        {
            code: cleanCode(`strace -p 1234 -f -e trace=network`),
            difficulty: 'hard',
            title: '跟踪进程网络调用',
            tags: ['调试', '网络'],
        },

        // Docker高级命令
        {
            code: cleanCode(`docker exec -it container_name /bin/bash`),
            difficulty: 'hard',
            title: '进入容器Shell',
            tags: ['Docker', '交互'],
        },
        {
            code: cleanCode(`docker-compose up -d --scale web=3`),
            difficulty: 'hard',
            title: 'Docker Compose扩容',
            tags: ['Docker', '编排'],
        },
        {
            code: cleanCode(`docker system prune -a --volumes`),
            difficulty: 'hard',
            title: '清理Docker资源',
            tags: ['Docker', '清理'],
        },

        // Shell脚本片段
        {
            code: cleanCode(`for i in {1..10}; do echo "Processing $i"; sleep 1; done`),
            difficulty: 'hard',
            title: 'For循环处理',
            tags: ['Shell脚本', '循环'],
        },
        {
            code: cleanCode(`while read line; do echo "Line: $line"; done < file.txt`),
            difficulty: 'hard',
            title: 'While循环读文件',
            tags: ['Shell脚本', '循环'],
        },
        {
            code: cleanCode(`if [ -f "/path/to/file" ]; then echo "File exists"; fi`),
            difficulty: 'hard',
            title: '条件判断',
            tags: ['Shell脚本', '条件'],
        },

        // 数据库命令
        {
            code: cleanCode(`mysql -u root -p -e "SHOW DATABASES;"`),
            difficulty: 'hard',
            title: 'MySQL查看数据库',
            tags: ['数据库', 'MySQL'],
        },
        {
            code: cleanCode(`pg_dump -U postgres -d dbname > backup.sql`),
            difficulty: 'hard',
            title: 'PostgreSQL备份',
            tags: ['数据库', 'PostgreSQL'],
        },
        {
            code: cleanCode(`redis-cli --scan --pattern 'user:*' | xargs redis-cli del`),
            difficulty: 'hard',
            title: 'Redis批量删除键',
            tags: ['数据库', 'Redis'],
        },

        // 性能调优
        {
            code: cleanCode(`perf top -p $(pgrep -d, node)`),
            difficulty: 'hard',
            title: '性能分析',
            tags: ['性能', '调优'],
        },
        {
            code: cleanCode(`sar -u 1 10`),
            difficulty: 'hard',
            title: 'CPU使用率监控',
            tags: ['监控', 'CPU'],
        },
        {
            code: cleanCode(`awk -F: '{ if ($3 >= 1000) print $1 }' /etc/passwd`),
            difficulty: 'hard',
            title: '列出普通用户',
            tags: ['awk', '系统管理'],
        },
        {
            code: cleanCode(`sed -i 's/foo/bar/g' *.conf`),
            difficulty: 'hard',
            title: '批量替换文件内容',
            tags: ['sed', '文本处理'],
        },
        {
            code: cleanCode(`find . -name "*.jpg" -print0 | xargs -0 -P 4 -I {} convert {} -resize 50% {}.small`),
            difficulty: 'hard',
            title: '并行处理图片',
            tags: ['xargs', '并行'],
        },
    ],
};
