# PType - Minimalist Typing Battle Platform ⌨️

## Introduction

PType is an online platform focused on improving typing speed and accuracy. It features a modern minimalist design, supporting various practice modes, real-time online battles, and detailed statistical analysis.

## ✨ Features

### 1. Practice Modes

- **Multi-language**: English (Common phrases, Quotes), Chinese (Modern, Classical), Code (JS, TS, Rust, etc.).
- **Customizable**: Timer (15s/30s/60s), difficulty, punctuation, and backspace settings.
- **Custom Text**: Paste your own text to practice.

### 2. ⚡ Online Battle (1v1)

- **Real-time**: Create rooms, invite friends, or match randomly for 1v1 duels.
- **Dual Modes**:
  - 🏎️ **Race Mode**: Be the first to finish the text.
  - ⏱️ **Time Attack**: Type as many correct characters as possible within a time limit.
- **Custom Rules**: Host can configure time limits and custom text.

### 3. Analytics

- **Detailed Stats**: WPM, CPM, Accuracy, Error Rate.
- **History**: Save all practice sessions and track progress trends.
- **Leaderboard**: Compete with global top typists.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS, Framer Motion
- **Backend**: Node.js, Socket.io (WebSocket for real-time battle)
- **State**: Zustand
- **i18n**: next-intl

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Socket.io Server (For Battles)

```bash
node server/server.js
```

> Server runs on port 4000.

### 3. Start Frontend

```bash
npm run dev
```

> App runs on port 3000.

### 4. Visit

Open [http://localhost:3000](http://localhost:3000)

## 📄 License

MIT License
