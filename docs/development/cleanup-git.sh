#!/bin/bash

# 🧹 Git清理脚本
# 用途：移除已经被Git追踪但应该被忽略的文件

echo "🧹 开始清理Git仓库..."
echo ""

# 移除.next目录
echo "📁 移除 .next 目录..."
git rm -r --cached frontend/.next 2>/dev/null || echo "  ✅ .next 已经被移除或不存在"

# 移除node_modules（如果有）
echo "📦 移除 node_modules..."
git rm -r --cached frontend/node_modules 2>/dev/null || echo "  ✅ node_modules 已经被移除或不存在"

# 移除.vscode（如果不想共享IDE配置）
echo "💻 移除 .vscode 配置..."
git rm -r --cached .vscode 2>/dev/null || echo "  ✅ .vscode 已经被移除或不存在"

# 移除日志文件
echo "📋 移除日志文件..."
git rm --cached frontend/.next/dev/logs/*.log 2>/dev/null || echo "  ✅ 日志文件已经被移除或不存在"

# 移除所有.DS_Store
echo "🍎 移除 .DS_Store 文件..."
find . -name .DS_Store -print0 | xargs -0 git rm --cached 2>/dev/null || echo "  ✅ .DS_Store 已经被移除或不存在"

echo ""
echo "✅ 清理完成！"
echo ""
echo "📝 接下来执行："
echo "   git add .gitignore"
echo "   git commit -m 'chore: add .gitignore and remove ignored files'"
echo "   git push origin main"
