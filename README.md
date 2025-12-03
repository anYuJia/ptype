<div align="center">

# ⚡ PType

### 🚀 专业的打字练习平台

_提升你的打字速度和准确性 - 支持多语言和编程语言_

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**[在线演示](#) | [快速开始](#-快速开始) | [功能介绍](#-功能特性)**

---

![PType 演示](./screenshots/demo.png)

</div>

---

## ✨ 功能特性

### 🌍 三种练习模式

<table>
<tr>
<td width="33%" align="center">

#### 📝 英文模式
- 简单、中等、困难三个难度
- 大小写敏感选项
- 标点符号练习
- WPM（每分钟单词数）统计

</td>
<td width="33%" align="center">

#### 🇨🇳 中文模式
- **现代文**：日常、文学、哲理
- **古文**：论语、孟子、道德经
- 简体中文优化
- CPM（每分钟字符数）统计

</td>
<td width="33%" align="center">

#### 💻 程序员模式
- **10+编程语言**支持
- **105+Linux命令**练习
- Tab/Enter 键支持
- LPM（每分钟行数）统计

</td>
</tr>
</table>

---

## 🎯 支持的编程语言

<div align="center">

| 类别 | 语言/工具 | 题目数量 |
|------|-----------|----------|
| **编程语言** | Python, JavaScript, TypeScript, Java, Go | 15-20 题/语言 |
| **系统命令** | Bash/Linux 命令 | 105 条命令 |
| **特色** | 算法题库（LeetCode 常见题） | Easy/Medium/Hard |

</div>

### 💡 代码库亮点

- ✅ **真实算法题**：包含 LeetCode 经典题目（两数之和、最长回文子串、LRU缓存等）
- 🏷️ **智能标签**：每道题都有标签（数组、哈希表、动态规划等）
- ⭐ **LeetCode 题号**：方便参考官方题解
- 🔧 **实用命令**：Git、Docker、系统管理、网络诊断等真实场景命令

---

## 📊 实时统计与反馈

<table>
<tr>
<td width="50%">

### 速度指标
- ⚡ **WPM** - 英文模式每分钟单词数
- 📝 **CPM** - 中文模式每分钟字符数
- 💻 **LPM** - 代码模式每分钟行数
- 📈 **实时更新** - 动态速度曲线图

</td>
<td width="50%">

### 准确性分析
- ✅ **准确率** - 实时百分比显示
- 🎯 **错误统计** - 详细错误分析
- 🔥 **连击提示** - 连续正确反馈
- 📉 **曲线图表** - WPM/CPM 趋势

</td>
</tr>
</table>

---

## 🎨 界面预览

### 英文模式
![英文打字练习](./screenshots/english-mode.png)

### 中文模式
![中文打字练习](./screenshots/chinese-mode.png)

### 程序员模式
![代码打字练习](./screenshots/code-mode.png)

### 统计面板
![详细统计](./screenshots/result.png)

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/anYuJia/ptype.git

# 进入前端目录
cd ptype/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 开始使用！ 🎉

---

## 🎮 使用指南

### 基础操作

1. **选择模式**：英文 / 中文 / 代码
2. **选择难度**：简单 / 中等 / 困难
3. **�始打字**：点击输入框或直接开始输入
4. **查看结果**：完成后查看详细统计

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Tab` | 代码模式下的缩进 |
| `Enter` | 代码模式下的换行 |
| `Esc` | 重新开始 |
| `Backspace` | 删除字符 |

---

## 🎯 特色功能

### 程序员模式增强

- ✨ **可见特殊字符**
  - Tab 显示为 `→`
  - 换行符显示为 `↵`
  - 便于准确输入

- 🔧 **真实代码场景**
  - 函数定义与实现
  - 类与接口
  - 算法实现

- 📚 **算法题库**
  - 数据结构：数组、链表、树、图
  - 算法技巧：双指针、滑动窗口、动态规划
  - 经典题目：二分查找、两数之和、LRU缓存

### Linux 命令库

分为三个难度等级，包含：

- **基础命令**（Easy）：ls, cd, mkdir, cp, mv, rm, cat, grep 等
- **中级命令**（Medium）：find, tar, git, docker, systemctl, sed, awk 等
- **高级命令**（Hard）：复杂管道、网络诊断、性能分析、数据库操作等

涵盖场景：
- 📁 文件管理
- 🔧 系统管理
- 🌐 网络工具
- 🐳 Docker 容器
- 📊 性能监控
- 🔍 日志分析

---

## 🛠️ 技术栈

- **前端框架**：React 18 + Next.js 14
- **语言**：TypeScript
- **样式**：TailwindCSS + Framer Motion
- **状态管理**：Zustand
- **图表**：Recharts
- **构建工具**：Turbopack

---

## 🗂️ 代码库组织

代码库采用模块化设计，每个语言独立文件：

```
frontend/src/lib/code-libraries/
├── types.ts          # 类型定义
├── index.ts          # 统一导出
├── python.ts         # Python 算法题
├── javascript.ts     # JavaScript 算法题
├── typescript.ts     # TypeScript 特色代码
├── java.ts           # Java 算法题
├── go.ts             # Go 算法题
├── bash.ts           # Linux 命令（105条）
├── english.ts        # 英文文本
└── chinese.ts        # 中文文本
```

**易于扩展**：添加新语言只需创建新文件并导出即可。

---

## 📈 统计数据

<div align="center">

| 类别 | 数量 |
|------|------|
| **英文文本** | 30 篇 |
| **中文现代文** | 10 篇 |
| **中文古文** | 10 篇 |
| **Python 题目** | 23 道 |
| **JavaScript 题目** | 19 道 |
| **Linux 命令** | 105 条 |
| **总代码片段** | 200+ |

</div>

---

## 🤝 贡献

欢迎贡献代码、添加新的练习内容或报告问题！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 添加新内容

- **添加新语言代码**：编辑 `/frontend/src/lib/code-libraries/` 中的对应文件
- **添加新文本**：编辑 `english.ts` 或 `chinese.ts`
- **贡献算法题**：欢迎添加更多 LeetCode 题目

查看 [CODE_LIBRARY.md](./CODE_LIBRARY.md) 了解详细的代码库组织说明。

---

## 📝 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

- 设计灵感：[MonkeyType](https://monkeytype.com)
- 算法题目：[LeetCode](https://leetcode.com)
- 依赖的开源项目

---

<div align="center">

### ⭐ 如果这个项目对你有帮助，请给个星标！

**用 ❤️ 制作**

[![GitHub stars](https://img.shields.io/github/stars/anYuJia/ptype?style=social)](https://github.com/anYuJia/ptype/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/anYuJia/ptype?style=social)](https://github.com/anYuJia/ptype/network/members)

[⬆ 回到顶部](#-ptype)

</div>
