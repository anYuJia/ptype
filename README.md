# PType - 极简主义打字竞技平台 ⌨️

## 项目简介
PType 是一个专注于提升打字速度与准确率的在线竞技平台。采用现代化的极简设计，支持多种练习模式、实时在线对战以及详细的数据统计分析。

## ✨ 核心功能

### 1. 打字练习模式
- **多语言支持**：英文（常用短语、名言）、中文（现代文、文言文）、代码（JS, TS, Rust 等）。
- **个性化设置**：支持自定义测试时长（15s/30s/60s）、难度、标点符号及退格键设置。
- **自定义文本**：支持粘贴自己的文本进行练习。

### 2. ⚡ 在线对战 (1v1)
- **实时竞速**：创建房间，邀请好友或随机匹配，进行实时 1v1 对决。
- **双模式**：
  - 🏎️ **竞速模式**：看谁先打完所有文本。
  - ⏱️ **限时挑战**：固定时间内，看谁的正确字符数更多。
- **自定义规则**：房主可设置比赛时间、文本内容等。

### 3. 数据分析
- **详细统计**：WPM (每分钟单词数)、CPM (每分钟字符数)、准确率、错误率。
- **历史记录**：保存所有的练习记录，随时查看进步趋势。
- **排行榜**：查看全球顶尖打字高手的排名。

## 🛠️ 技术栈
- **Frontend**: Next.js 14, React, TailwindCSS, Framer Motion
- **Backend**: Node.js, Socket.io (WebSocket for real-time battle)
- **State**: Zustand (Local state management)
- **i18n**: next-intl (Internationalization)

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动 Socket.io 服务器 (用于对战)
```bash
node server/server.js
```
> 服务器运行在 4000 端口。

### 3. 启动前端应用
```bash
npm run dev
```
> 应用运行在 3000 端口。

### 4. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🤝 贡献
欢迎提交 Issue 和 PR！

## 📄 License
MIT License
