# 代码库组织结构说明

## 📁 目录结构

```
/frontend/src/lib/code-libraries/
├── types.ts           # 类型定义（CodeItem, CodeLibrary, TextLibrary等）
├── index.ts           # 统一导出
├── python.ts          # Python 代码库
├── javascript.ts      # JavaScript 代码库
├── english.ts         # 英文文本库
└── chinese.ts         # 中文文本库（现代文 + 古文）
```

## 📝 如何添加新语言

### 1. 创建新的代码库文件

在 `/frontend/src/lib/code-libraries/` 目录下创建新文件，例如 `java.ts`：

```typescript
import { CodeLibrary, cleanCode } from './types';

export const javaLibrary: CodeLibrary = {
  easy: [
    {
      code: cleanCode(`public class Hello {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`),
      difficulty: 'easy',
      title: 'Hello World',
      tags: ['基础'],
    },
    // 添加更多代码...
  ],
  
  medium: [
    // 中等难度代码...
  ],
  
  hard: [
    // 困难代码...
  ],
};
```

### 2. 在 index.ts 中导出

编辑 `/frontend/src/lib/code-libraries/index.ts` 添加：

```typescript
export * from './java';
```

### 3. 在 textGenerator.ts 中使用

编辑 `/frontend/src/lib/utils/textGenerator.ts`：

```typescript
// 1. 导入新库
import { javalibrary } from '@/lib/code-libraries';

// 2. 在 getTextPool 函数中添加
const codeLibraries: Record<string, any> = {
  python: pythonLibrary,
  javascript: javascriptLibrary,
  typescript: javascriptLibrary,
  java: javaLibrary,  // 添加这一行
};
```

## 🎯 代码项结构

每个代码项 (CodeItem) 包含：

```typescript
{
  code: string,              // 代码内容（必需）
  difficulty: DifficultyLevel,  // 难度：'easy' | 'medium' | 'hard'（必需）
  title?: string,            // 题目标题（可选）
  description?: string,      // 题目描述（可选）
  tags?: string[],          // 标签，如 ['数组', '哈希表']（可选）
  leetcodeId?: number,      // LeetCode 题号（可选）
}
```

## 📚 文本项结构

每个文本项 (TextItem) 包含：

```typescript
{
  text: string,             // 文本内容（必需）
  difficulty: DifficultyLevel, // 难度（必需）
  category?: string,        // 分类，如 '日常', '技术'（可选）
}
```

## ✨ 优势

### 模块化
- 每个语言独立文件，易于维护
- 清晰的类型定义
- 更好的代码组织

### 可扩展性
- 添加新语言只需创建新文件
- 不影响现有代码
- 支持无限扩展

### 元数据
- 每个代码都有标题、标签、难度等信息
- 未来可以基于元数据进行筛选和搜索
- LeetCode 题号便于用户参考

### 易于管理
- 按语言分类，查找方便
- 统一的接口和格式
- 便于团队协作

## 🔄 当前状态

已实现的语言：
- ✅ Python（完整的算法题库）
- ✅ JavaScript（完整的算法题库）
- ✅ English（英文文本）
- ✅ Chinese（中文现代文 + 古文）

待迁移/待添加：
- ⏳ Java
- ⏳ Go
- ⏳ C++
- ⏳ TypeScript（独立）
- ⏳ Rust
- ⏳ HTML/CSS
- ⏳ Bash
- ⏳ PowerShell

## 📖 示例

### 添加一个 Python 算法题

编辑 `/frontend/src/lib/code-libraries/python.ts`：

```typescript
export const pythonLibrary: CodeLibrary = {
  medium: [
    // ... 其他代码
    {
      code: cleanCode(`def quick_sort(arr):\n\tif len(arr) <= 1:\n\t\treturn arr\n\tpivot = arr[len(arr) // 2]\n\tleft = [x for x in arr if x < pivot]\n\tmiddle = [x for x in arr if x == pivot]\n\tright = [x for x in arr if x > pivot]\n\treturn quick_sort(left) + middle + quick_sort(right)`),
      difficulty: 'medium',
      title: '快速排序',
      tags: ['排序', '递归', '分治'],
      description: '使用快速排序算法对数组进行排序',
    },
  ],
};
```

### 添加一个英文句子

编辑 `/frontend/src/lib/code-libraries/english.ts`：

```typescript
export const englishLibrary: TextLibrary = {
  medium: [
    // ... 其他文本
    {
      text: "Artificial intelligence is transforming industries across the globe.",
      difficulty: 'medium',
      category: '技术',
    },
  ],
};
```

## 🚀 未来扩展

可以添加更多功能：
1. **按标签筛选**：用户选择特定算法类型（如"动态规划"）
2. **按题号筛选**：练习特定 LeetCode 题目
3. **难度分级更细**：添加 "very-easy" 和 "very-hard"
4. **多语言版本**：同一算法的不同语言实现
5. **题解链接**：链接到 LeetCode 或其他平台的题解
