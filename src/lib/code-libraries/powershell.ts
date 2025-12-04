import { CodeLibrary, cleanCode } from './types';

/**
 * PowerShell 代码库
 */
export const powershellLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`Write-Host "Hello, World!"`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`Get-Date -Format "yyyy-MM-dd"`),
            difficulty: 'easy',
            title: '获取日期',
            tags: ['基础'],
        },
        {
            code: cleanCode(`Get-Process | Where-Object {$_.CPU -gt 10}`),
            difficulty: 'easy',
            title: '筛选进程',
            tags: ['进程'],
        },
    ],

    medium: [
        {
            code: cleanCode(`$files = Get-ChildItem -Path "C:\\Logs" -Filter "*.log"\nforeach ($file in $files) {\n\tWrite-Host $file.Name\n}`),
            difficulty: 'medium',
            title: '遍历文件',
            tags: ['文件操作', '循环'],
        },
        {
            code: cleanCode(`if (Test-Path "C:\\config.txt") {\n\tWrite-Host "File exists"\n} else {\n\tWrite-Host "File not found"\n}`),
            difficulty: 'medium',
            title: '文件检查',
            tags: ['条件判断'],
        },
        {
            code: cleanCode(`Get-Service | Where-Object {$_.Status -eq 'Running'} | Select-Object -First 5`),
            difficulty: 'medium',
            title: '管道操作',
            tags: ['管道'],
        },
    ],

    hard: [
        {
            code: cleanCode(`function Get-SystemInfo {\n\tparam(\n\t\t[string]$ComputerName = "localhost"\n\t)\n\tGet-WmiObject -Class Win32_OperatingSystem -ComputerName $ComputerName\n}`),
            difficulty: 'hard',
            title: '自定义函数',
            tags: ['函数', 'WMI'],
        },
        {
            code: cleanCode(`try {\n\t$content = Get-Content "nonexistent.txt" -ErrorAction Stop\n} catch {\n\tWrite-Error "Failed to read file: $_"\n}`),
            difficulty: 'hard',
            title: '错误处理',
            tags: ['异常处理'],
        },
        {
            code: cleanCode(`$webClient = New-Object System.Net.WebClient\n$webClient.DownloadFile("https://example.com/file.zip", "C:\\temp\\file.zip")`),
            difficulty: 'hard',
            title: '.NET 对象调用',
            tags: ['.NET'],
        },
    ],
};
