<div align="center">

<h1 align="center">
  <img src="./public/logo.png" alt="PType Logo" width="48" height="48" style="vertical-align: bottom; margin-right: 10px;">
  PType
</h1>
<p align="center">
  <strong>The Ultimate Typing Practice Platform for Developers</strong>
</p>

[简体中文](./README.md) | [English](./README_EN.md)

[![License](https://img.shields.io/github/license/anYuJia/ptype?style=flat-square&color=blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/anYuJia/ptype?style=flat-square&color=yellow)](https://github.com/anYuJia/ptype/stargazers)

<br/>

**[Live Demo](#) · [Report Bug](https://github.com/anYuJia/ptype/issues) · [Request Feature](https://github.com/anYuJia/ptype/issues)**

</div>

---

## 📖 Table of Contents

- [✨ Highlights](#-highlights)
- [📸 Screenshots](#-screenshots)
- [🚀 Core Features](#-core-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [💻 Code Library](#-code-library)
- [🏁 Quick Start](#-quick-start)
- [🔐 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🌟 Star History](#-star-history)

---

## ✨ Highlights

PType is not just a typing tool; it's a training ground designed to **boost developer productivity**.

- 🎯 **Ultimate Experience**: Silky smooth animations and responsive design built with React 19 and Framer Motion.
- 🌍 **Multi-language Support**: Supports English, Chinese (Modern/Classical), and natively supports **10+ programming languages**.
- 📊 **Professional Analysis**: Unified CPM (Characters Per Minute) as the core metric, providing multi-dimensional analysis including WPM and accuracy heatmaps.
- 🏆 **Competitive Leaderboard**: Built-in global leaderboard and personal history to track your growth curve in real-time.
- ⚡ **Real-time Battle**: Support 1v1 online battles with millisecond-level synchronization via WebSocket.
- 🔐 **Request Signing**: Built-in multi-layer encryption signing mechanism to prevent API abuse and automated attacks.
- 🌐 **Internationalization**: Full Chinese and English interface support using next-intl.

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/code-mode.png" alt="Code Mode" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <p><i>Coder Mode - Immersive Code Practice Experience</i></p>
</div>

<details>
<summary><b>View More Screenshots</b></summary>
<br>
<table width="100%">
  <tr>
    <td width="50%" align="center"><b>English Mode</b><br><img src="./screenshots/english-mode.png" alt="English Mode"></td>
    <td width="50%" align="center"><b>Chinese Mode</b><br><img src="./screenshots/chinese-mode.png" alt="Chinese Mode"></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><b>Detailed Statistics Panel</b><br><img src="./screenshots/result.png" alt="Statistics"></td>
  </tr>
</table>
</details>

---

## 🚀 Core Features

### 1. Three Practice Modes

| Mode | Description | Use Case |
| :--- | :--- | :--- |
| **📝 English Mode** | Classic word practice, supports punctuation and case sensitivity | Improve daily English typing speed |
| **🇨🇳 Chinese Mode** | Modern text, Classical text (Analects, Tao Te Ching) | Experience Chinese culture, improve Chinese typing |
| **💻 Coder Mode** | Real code snippets, Linux commands, algorithms | **Must-have for developers**, boost coding efficiency |

### 2. Smart Data Analysis

- **CPM (Characters Per Minute)**: Core global speed metric, unifying English, Chinese, and code typing efficiency.
- **WPM (Words Per Minute)**: Auxiliary reference metric for English mode.
- **Accuracy Heatmap**: Identify your high-frequency error keys.
- **History Tracking**: Complete practice history and trend analysis.

### 3. User & Social

- **User System**: Complete registration and login flow, JWT authentication, with cloud data storage.
- **Leaderboard**: Real-time global speed rankings to motivate practice.
- **Custom Texts**: Support for users to upload their own practice texts.

### 4. 🎮 Battle Mode (1v1 Real-time Competition)

PType now supports real-time online battle functionality with WebSocket technology for millisecond-level synchronization.

**Battle Features:**
- 🏎️ **Race Mode** - Be the first to finish the text, fastest speed wins
- ⏱️ **Time Attack** - In a fixed time, whoever has more correct characters wins
- 👥 **Flexible Pairing** - Invite friends or match with random opponents
- ⚙️ **Custom Rules** - Room host can configure battle time, text content, and other parameters
- 📊 **Real-time Feedback** - Display both players' typing progress and speed comparison during battle
- 🏆 **Honor System** - Win battles to earn honor points and climb the battle leaderboard

**How to Start a Battle:**
1. Login and navigate to the Battle Mode page
2. Create a new room or join an existing one
3. Configure battle parameters (choose mode, time, text, etc.)
4. Invite friends or wait for random matching
5. Start the timer and compete to complete the typing task faster and more accurately

---

## 🛠️ Tech Stack

Built with a modern full-stack tech stack to ensure high performance and maintainability.

| Category | Technology |
| :--- | :--- |
| **Core Framework** | ![React](https://img.shields.io/badge/-React_19-20232A?logo=react&logoColor=61DAFB) ![Next.js](https://img.shields.io/badge/-Next.js_16-000000?logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Styling & Animation** | ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS_v4-38B2AC?logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer&logoColor=white) |
| **Backend & Data** | ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| **State Management** | ![Zustand](https://img.shields.io/badge/-Zustand-443E38?logo=react&logoColor=white) |
| **Visualization** | ![Recharts](https://img.shields.io/badge/-Recharts-22b5bf?logo=react&logoColor=white) |
| **Internationalization** | ![next-intl](https://img.shields.io/badge/-next--intl-000000?logo=next.js&logoColor=white) |
| **Real-time Communication** | ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?logo=socket.io&logoColor=white) |
| **Auth & Security** | ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white) ![HMAC](https://img.shields.io/badge/-HMAC--SHA256-blue) |

---

## 💻 Code Library

PType comes with a rich code practice library covering mainstream languages and tools:

<div align="center">

![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/-Java-007396?logo=java&logoColor=white)
![Go](https://img.shields.io/badge/-Go-00ADD8?logo=go&logoColor=white)
![C++](https://img.shields.io/badge/-C++-00599C?logo=c%2B%2B&logoColor=white)
![Rust](https://img.shields.io/badge/-Rust-000000?logo=rust&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![PowerShell](https://img.shields.io/badge/-PowerShell-5391FE?logo=powershell&logoColor=white)
![Bash](https://img.shields.io/badge/-Bash-4EAA25?logo=gnu-bash&logoColor=white)

</div>

> **Featured Content**: Includes popular LeetCode algorithms (Two Sum, LRU Cache, etc.) and real-world system operation commands.

---

## 🏁 Quick Start

### Prerequisites

| Method | Requirements |
| :--- | :--- |
| **🐳 Docker** (Recommended) | Docker 20.10+, Docker Compose 2.0+ |
| **💻 Local Development** | Node.js >= 18.0, PostgreSQL >= 14.0 |

### Local Development (Recommended for Battle Feature Development)

#### 1. Clone the repository

```bash
git clone --depth 1 https://github.com/anYuJia/ptype.git
cd ptype
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file to set necessary keys:

```env
# Database configuration (optional, uses default if not configured)
DATABASE_URL="postgresql://user:password@localhost:5432/ptype?schema=public"

# Security keys (must change! use openssl rand -base64 32)
JWT_SECRET="your-random-secret-key"
SIGNATURE_SECRET="your-random-secret-key"

# Cookie settings (set to false for HTTP)
SECURE_COOKIES=false

# Socket.io server address
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

#### 4. Initialize Database (Optional)

```bash
npx prisma generate
npx prisma db push
```

#### 5. Start Socket.io Server (For Battle Functionality)

Run in a new terminal window:

```bash
node server/server.js
```

> Socket.io server runs on port **4000**. Ensure this port is not in use.

#### 6. Start Frontend Development Server

Run in another terminal window:

```bash
npm run dev
```

> Frontend runs on port **3000**.

#### 7. Access the Application

Open your browser and visit [http://localhost:3000](http://localhost:3000)

Now you can fully experience all features including the battle functionality!

### Docker Deployment (Recommended for Production)

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### FAQ

<details>
<summary><b>❓ Socket.io Connection Failed</b></summary>

Make sure:
1. Server is running: `node server/server.js`
2. Port 4000 is not in use
3. `NEXT_PUBLIC_SOCKET_URL` in `.env` is configured correctly
4. Check browser console for connection error logs

</details>

<details>
<summary><b>❓ .env File Configuration Issues</b></summary>

```bash
cp .env.example .env
# Then edit .env to configure JWT_SECRET and SIGNATURE_SECRET
```

</details>

<details>
<summary><b>❓ Prisma Engine Download Fails</b></summary>

Set the mirror and retry:
```bash
export PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"
npx prisma generate
```

</details>

---

## 🔐 Security

PType has built-in multi-layer security protection mechanisms:

### User Authentication

- **JWT Authentication** - Uses JSON Web Token for user identity verification
- **HttpOnly Cookie** - Tokens stored in HttpOnly cookies to prevent XSS attacks
- **Secure Cookie** - Secure flag automatically enabled in production (HTTPS)

> ⚠️ **HTTP Environment**: If your server doesn't have HTTPS configured, set `SECURE_COOKIES=false` in `.env`

### Request Signing System

All sensitive write operations (login, register, save scores, etc.) require a valid request signature.

**Security Features:**
- ⏱️ **Timestamp Validation** - Signatures expire after 5 minutes
- 🔄 **Nonce Anti-Replay** - Each signature can only be used once
- 🔒 **Data Integrity** - Verify request data hasn't been tampered with
- 🌐 **Browser Fingerprint** - Increase request uniqueness, prevent cross-device replay
- 🔐 **Multi-round HMAC** - Increase reverse engineering difficulty

For detailed documentation, see [src/lib/security/README.md](./src/lib/security/README.md)

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's fixing bugs, adding new features, or enriching the code practice library.

1. **Fork** the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### How to add new practice code?

All code library files are located at `/src/lib/code-libraries/`.
You can refer to the existing `python.ts` or `java.ts` format, create a new language file, and export it in `index.ts`.

### How to contribute to Battle Mode?

Battle-related files are located in `/src/features/battle/`, and the backend service is in `/server/` directory.
Contributions to improve battle mechanics, add new battle modes, or optimize WebSocket communication are welcome!

---

## 📄 License

This project is open-sourced under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Star History

<div align="center">
  <a href="https://star-history.com/#anYuJia/ptype&Date">
    <img src="https://api.star-history.com/svg?repos=anYuJia/ptype&type=Date" alt="Star History Chart">
  </a>
</div>

<br/>

<div align="center">
  <b>If PType helps you, please give it a ⭐️ Star!</b>
  <br/>
  <sub>Made with ❤️ by <a href="https://github.com/anYuJia">anYuJia</a></sub>
</div>
