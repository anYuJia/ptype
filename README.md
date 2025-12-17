<div align="center">

<h1 align="center">
  <img src="./public/logo.png" alt="PType Logo" width="48" height="48" style="vertical-align: bottom; margin-right: 10px;">
  PType
</h1>
<p align="center">
  <strong>专为开发者打造的终极打字练习平台</strong>
</p>

[English](./README_EN.md) | [简体中文](./README.md)

[![License](https://img.shields.io/github/license/anYuJia/ptype?style=flat-square&color=blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/anYuJia/ptype?style=flat-square&color=yellow)](https://github.com/anYuJia/ptype/stargazers)

<br/>

**[在线演示](#) · [报告 Bug](https://github.com/anYuJia/ptype/issues) · [请求功能](https://github.com/anYuJia/ptype/issues)**

</div>

---

## 📖 目录

- [✨ 项目亮点](#-项目亮点)
- [📸 界面预览](#-界面预览)
- [🚀 核心特性](#-核心特性)
- [🛠️ 技术栈](#️-技术栈)
- [💻 代码库支持](#-代码库支持)
- [🏁 快速开始](#-快速开始)
- [🔐 安全机制](#-安全机制)
- [🤝 参与贡献](#-参与贡献)
- [📄 许可证](#-许可证)
- [🌟 Star History](#-star-history)

---

## ✨ 项目亮点

PType 不仅仅是一个打字练习工具，它是为了**提升开发者生产力**而生的训练场。

- 🎯 **极致体验**：基于 React 19 和 Framer Motion 打造的丝滑动画与响应式设计。
- 🌍 **多语言支持**：不仅支持英文、中文（现代/文言），更原生支持 10+ 种编程语言。
- 📊 **专业分析**：统一使用 CPM (Characters Per Minute) 作为核心指标，提供 WPM、准确率热力图等多维度数据分析。
- 🏆 **竞技排行**：内置全球排行榜与个人历史记录，实时监控你的成长曲线。
- 🔐 **请求签名**：内置多层加密签名机制，防止 API 滥用和自动化攻击。
- 🌐 **国际化**：完整的中英文界面支持，基于 next-intl 实现。

---

## 📸 界面预览

<div align="center">
  <img src="./screenshots/code-mode.png" alt="Code Mode" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <p><i>程序员模式 - 沉浸式代码练习体验</i></p>
</div>

<details>
<summary><b>查看更多截图</b></summary>
<br>
<table width="100%">
  <tr>
    <td width="50%" align="center"><b>英文模式</b><br><img src="./screenshots/english-mode.png" alt="English Mode"></td>
    <td width="50%" align="center"><b>中文模式</b><br><img src="./screenshots/chinese-mode.png" alt="Chinese Mode"></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><b>详细统计面板</b><br><img src="./screenshots/result.png" alt="Statistics"></td>
  </tr>
</table>
</details>

---

## 🚀 核心特性

### 1. 三大练习模式

| 模式 | 描述 | 适用场景 |
| :--- | :--- | :--- |
| **📝 英文模式** | 经典单词练习，支持标点、大小写敏感 | 提升日常英文输入速度 |
| **🇨🇳 中文模式** | 现代文、古文（论语、道德经） | 体验中华文化，提升中文打字 |
| **💻 程序员模式** | 真实代码片段、Linux 命令、算法题 | **开发者必备**，提升 Coding 效率 |

### 2. 智能数据分析

- **CPM (Characters Per Minute)**: 全局核心速度指标，统一衡量中英文及代码输入效率。
- **WPM (Words Per Minute)**: 英文模式辅助参考指标。
- **准确率热力图**: 识别你的高频错误按键。
- **历史回溯**: 完整的练习历史记录与趋势分析。

### 3. 用户与社交

- **账号系统**: 完整的注册登录流程，JWT 认证，数据云端存储。
- **排行榜**: 实时更新的全球速度排行，激发练习动力。
- **自定义文本**: 支持用户上传自己的练习文本。

---

## 🛠️ 技术栈

本项目采用现代化的全栈技术构建，确保高性能与可维护性。

| 领域 | 技术选型 |
| :--- | :--- |
| **核心框架** | ![React](https://img.shields.io/badge/-React_19-20232A?logo=react&logoColor=61DAFB) ![Next.js](https://img.shields.io/badge/-Next.js_16-000000?logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) |
| **样式与动画** | ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS_v4-38B2AC?logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer&logoColor=white) |
| **后端与数据** | ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| **状态管理** | ![Zustand](https://img.shields.io/badge/-Zustand-443E38?logo=react&logoColor=white) |
| **图表可视化** | ![Recharts](https://img.shields.io/badge/-Recharts-22b5bf?logo=react&logoColor=white) |
| **国际化** | ![next-intl](https://img.shields.io/badge/-next--intl-000000?logo=next.js&logoColor=white) |
| **认证安全** | ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white) ![HMAC](https://img.shields.io/badge/-HMAC--SHA256-blue) |

---

## 💻 代码库支持

PType 内置了丰富的代码练习库，涵盖主流语言与工具：

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

> **特色内容**：包含 LeetCode 热门算法题（两数之和、LRU 缓存等）和真实场景的系统运维命令。

---

## 🏁 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm / pnpm / yarn**: 包管理器
- **PostgreSQL**: >= 14.0 ([下载与安装教程](https://www.postgresql.org/download/))

### 安装步骤

1. **克隆仓库**

```bash
git clone --depth 1 https://github.com/anYuJia/ptype.git
cd ptype
```

2. **安装依赖**

```bash
npm install
# 或者使用 pnpm / yarn
pnpm install
```

3. **配置环境变量**

复制环境变量模板并修改配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 数据库连接
DATABASE_URL="postgresql://user:password@localhost:5432/ptype?schema=public"

# JWT 密钥（用于用户认证，请使用强随机字符串）
JWT_SECRET="your-jwt-secret-key"

# 签名密钥（用于请求签名验证，请使用强随机字符串）
SIGNATURE_SECRET="your-signature-secret-key"

# Cookie 安全设置
# HTTPS 环境保持 true（默认）
# HTTP 环境（无 SSL）必须设置为 false，否则登录后无法保持会话
SECURE_COOKIES=true
```

> ⚠️ **注意**：如果你的服务器没有配置 HTTPS，必须将 `SECURE_COOKIES` 设置为 `false`，否则登录后的 Cookie 无法正常工作。

4. **初始化数据库**

> **提示**：如果遇到 Prisma 引擎下载失败，请先设置镜像：
> ```bash
> export PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"
> ```

```bash
npx prisma generate
npx prisma db push
```

5. **启动开发服务器**

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可开始体验！

### 生产部署

#### 常规部署

```bash
npm run build
npm start
```

#### Docker 部署

1. **构建镜像**

```bash
docker build -t ptype .
```

2. **运行容器**

```bash
docker run -d \
  -p 3000:3000 \
  --name ptype \
  --env-file .env \
  ptype
```

> ⚠️ **注意**：确保 `.env` 文件中包含正确的 `DATABASE_URL` 以及其他必要的环境变量。
> 如果连接宿主机数据库，请将 `localhost` 替换为 `host.docker.internal` (Mac/Windows) 或宿主机 IP (Linux)。

---

## 🔐 安全机制

PType 内置了多层安全防护机制：

### 用户认证

- **JWT 认证** - 使用 JSON Web Token 进行用户身份验证
- **HttpOnly Cookie** - Token 存储在 HttpOnly Cookie 中，防止 XSS 攻击
- **Secure Cookie** - 生产环境（HTTPS）自动启用 Secure 标志

> ⚠️ **HTTP 环境配置**：如果服务器未配置 HTTPS，需要在 `.env` 中设置 `SECURE_COOKIES=false`

### 请求签名系统

所有敏感的写操作（登录、注册、保存成绩等）都需要携带有效的请求签名。

**安全特性：**
- ⏱️ **时间戳验证** - 签名 5 分钟后自动过期
- 🔄 **Nonce 防重放** - 每个签名只能使用一次
- 🔒 **数据完整性** - 验证请求数据未被篡改
- 🌐 **浏览器指纹** - 增加请求唯一性，防止跨设备重放
- 🔐 **多轮 HMAC** - 增加逆向破解难度

详细文档请参阅 [src/lib/security/README.md](./src/lib/security/README.md)

---

## 🤝 参与贡献

我们非常欢迎社区的贡献！无论是修复 Bug、添加新功能，还是丰富代码练习库。

1. **Fork** 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 **Pull Request**

### 如何添加新的练习代码？

所有代码库文件位于 `/src/lib/code-libraries/`。
你可以参考现有的 `python.ts` 或 `java.ts` 格式，创建一个新的语言文件并在 `index.ts` 中导出。

---

## 📄 许可证

本项目基于 **MIT 许可证** 开源。详情请参阅 [LICENSE](LICENSE) 文件。

---

## 🌟 Star History

<div align="center">
  <a href="https://star-history.com/#anYuJia/ptype&Date">
    <img src="https://api.star-history.com/svg?repos=anYuJia/ptype&type=Date" alt="Star History Chart">
  </a>
</div>

<br/>

<div align="center">
  <b>如果觉得 PType 对你有帮助，请给个 ⭐️ Star 支持一下！</b>
  <br/>
  <sub>Made with ❤️ by <a href="https://github.com/anYuJia">anYuJia</a></sub>
</div>
