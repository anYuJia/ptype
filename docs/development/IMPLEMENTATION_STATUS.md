# 文本库扩充实现说明

## ✅ 已完成内容

### 1. 类型定义 (`constants.ts`)
- ✅ `ChineseStyle`: 'modern' | 'classical'
- ✅ `ProgrammingLanguage`: 12种编程语言
- ✅ 所有必要的常量和标签映射

### 2. 完整文本库 (`textGenerator.ts`)
已创建包含以下内容的完整文本生成器：

#### 英文文本
- **简单** (10篇): 基础短句
- **中等** (10篇): 完整句子，常见表达
- **困难** (10篇): 复杂句式，深度内容

#### 中文现代文
- **简单** (10篇): 50-100字，生活日常
- **中等** (5篇): 100-200字，散文故事
- **困难** (3篇): 200-300字，深度文章

#### 中文文言文
- **简单** (10篇): 成语名句
- **中等** (5篇): 经典段落
- **困难** (3篇): 深度古文

#### 编程语言代码
支持12种语言，每种包含简单/中等/困难示例：
- ✅ Python
- ✅ JavaScript/TypeScript
- ✅ Java
- ✅ Go
- ✅ C/C++
- ✅ Dart (复用JS示例)
- ✅ HTML
- ✅ CSS
- ✅ Bash/Linux
- ✅ PowerShell

## 📋 难度区分标准

### 英文
- **简单**: 基础词汇，简单句式
- **中等**: 常用词汇，复合句
- **困难**: 高级词汇，复杂结构，引用名言

### 中文
- **简单**: 常用字词，直白表达
- **中等**: 成语运用，修辞手法
- **困难**: 深度思考，文学表达

### 代码
- **简单**: 基础语法，简单函数
- **中等**: 类定义，异步操作
- **困难**: 泛型，设计模式，高级特性

## ⏳ 待完成工作

要让用户能够使用这些新功能，还需要：

### 1. 更新 Store (`typingStore.ts`)
```typescript
// 添加新的状态
export interface TypingSettings {
  duration: number;
  mode: TypingMode;
  difficulty: DifficultyLevel;
  chineseStyle: ChineseStyle;  // 新增
  programmingLanguage: ProgrammingLanguage;  // 新增
  englishOptions: EnglishOptions;
}
```

### 2. 更新文本生成调用
```typescript
// 在 initTest 中
const targetText = generateText(
  settings.mode,
  settings.difficulty,
  500,
  settings.chineseStyle,  // 新增参数
  settings.programmingLanguage  // 新增参数
);
```

### 3. 更新 UI (`SettingsPanel.tsx`)
添加选择器：
- 中文模式时显示：文体选择（现代文/文言文）
- 代码模式时显示：语言选择（Python/Java/Go等）

### 4. 更新 Hook (`useTypingEngine.ts`)
添加新的设置方法：
- `setChineseStyle(style: ChineseStyle)`
- `setProgrammingLanguage(lang: ProgrammingLanguage)`

## 🎯 下一步选择

**选项 A: 继续完整实现**
我继续实现 Store 和 UI 更新，让功能完全可用。

**选项 B: 先测试文本库**
您可以先手动测试文本生成器：
1. 查看生成的文本质量
2. 确认难度区分是否合理
3. 告诉我需要调整的地方

**选项 C: 扩充特定文本库**
如果某些语言或类别的文本不够，我可以专门扩充。

## 💡 建议

我建议继续**选项 A**，一次性完成所有实现，这样您就可以立即使用所有新功能。

请告诉我您的选择，或者直接说"继续"让我完成剩余工作。
