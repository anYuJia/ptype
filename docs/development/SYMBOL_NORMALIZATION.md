# 符号标准化完整说明

## 🎯 问题背景

### 为什么"-"无法匹配？

用户输入的 `-` 和文本中的 `-` 可能是**不同的 Unicode 字符**！

例如：
- **Hyphen-minus**: `-` (U+002D) - 键盘上的连字符
- **En dash**: `–` (U+2013) - 较短的破折号
- **Em dash**: `—` (U+2014) - 较长的破折号  
- **Minus sign**: `−` (U+2212) - 数学减号

它们看起来几乎一样，但 Unicode 编码完全不同！

## ✅ 解决方案：符号标准化

### normalizeSpecialChars 函数

将所有 Unicode 变体转换为标准字符：

```typescript
export function normalizeSpecialChars(text: string): string {
  return text
    // 1. 连字符家族 → 标准连字符 (-)
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-')
    
    // 2. 引号家族 → 标准引号 (' ")
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // 左右单引号
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')  // 左右双引号
    .replace(/[\u00AB\u00BB]/g, '"')             // «» → "
    
    // 3. 省略号 → 三个点
    .replace(/\u2026/g, '...')  // … → ...
    
    // 4. 空格家族 → 标准空格
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    
    // 5. 其他数学符号
    .replace(/\u00D7/g, 'x')   // × → x
    .replace(/\u00F7/g, '/')   // ÷ → /
    .replace(/\u2022/g, '*')   // • → *
    .replace(/\u2219/g, '*')   // ∙ → *
    ;
}
```

## 📊 支持的符号标准化

### 1. 连字符/破折号家族

| 原字符 | Unicode | 名称 | 转换为 |
|--------|---------|------|--------|
| ‐ | U+2010 | Hyphen | `-` |
| ‑ | U+2011 | Non-breaking hyphen | `-` |
| ‒ | U+2012 | Figure dash | `-` |
| – | U+2013 | En dash | `-` |
| — | U+2014 | Em dash | `-` |
| ― | U+2015 | Horizontal bar | `-` |
| − | U+2212 | Minus sign | `-` |

**常见场景**:
```
目标文本: "error-free"（使用 en-dash）
用户输入: "error-free"（键盘 hyphen）
结果: ✅ 正确匹配
```

### 2. 引号家族

| 原字符 | Unicode | 名称 | 转换为 |
|--------|---------|------|--------|
| ' | U+2018 | Left single quotation mark | `'` |
| ' | U+2019 | Right single quotation mark | `'` |
| ‚ | U+201A | Single low-9 quotation mark | `'` |
| ‛ | U+201B | Single high-reversed-9 | `'` |
| " | U+201C | Left double quotation mark | `"` |
| " | U+201D | Right double quotation mark | `"` |
| „ | U+201E | Double low-9 quotation mark | `"` |
| ‟ | U+201F | Double high-reversed-9 | `"` |
| « | U+00AB | Left-pointing double angle | `"` |
| » | U+00BB | Right-pointing double angle | `"` |

**常见场景**:
```
目标文本: "Hello"（智能引号）
用户输入: "Hello"（直引号）
结果: ✅ 正确匹配
```

### 3. 省略号

| 原字符 | Unicode | 名称 | 转换为 |
|--------|---------|------|--------|
| … | U+2026 | Horizontal ellipsis | `...` |

**常见场景**:
```
目标文本: "Wait…"
用户输入: "Wait..."
结果: ✅ 正确匹配
```

### 4. 空格家族

| 原字符 | Unicode | 名称 | 转换为 |
|--------|---------|------|--------|
|   | U+00A0 | No-break space | ` ` |
|   | U+2000 | En quad | ` ` |
|   | U+2001 | Em quad | ` ` |
|   | U+2002 | En space | ` ` |
|   | U+2003 | Em space | ` ` |
|   | U+2004 | Three-per-em space | ` ` |
|   | U+2005 | Four-per-em space | ` ` |
|   | U+2006 | Six-per-em space | ` ` |
|   | U+2007 | Figure space | ` ` |
|   | U+2008 | Punctuation space | ` ` |
|   | U+2009 | Thin space | ` ` |
|   | U+200A | Hair space | ` ` |
|   | U+200B | Zero-width space | ` ` |
| 　 | U+3000 | Ideographic space (全角空格) | ` ` |

### 5. 数学符号

| 原字符 | Unicode | 名称 | 转换为 |
|--------|---------|------|--------|
| × | U+00D7 | Multiplication sign | `x` |
| ÷ | U+00F7 | Division sign | `/` |
| • | U+2022 | Bullet | `*` |
| ∙ | U+2219 | Bullet operator | `*` |

## 🔄 标准化流程

### 完整的字符标准化链

```typescript
// 1. 特殊字符标准化
let normalized = normalizeSpecialChars(text);
// "error–free" → "error-free"

// 2. Unicode 标准化 (NFC)
normalized = normalized.normalize('NFC');
// 确保中文等字符使用标准形式

// 3. 比较
if (normalizedInput === normalizedTarget) {
  // 正确！
}
```

### 应用位置

1. **wpmCalculator.ts** - `analyzeTyping` 函数
   ```typescript
   let normalizedTarget = normalizeSpecialChars(targetText);
   let normalizedTyped = normalizeSpecialChars(typedText);
   normalizedTarget = normalizedTarget.normalize('NFC');
   normalizedTyped = normalizedTyped.normalize('NFC');
   ```

2. **TextDisplay.tsx** - 字符状态计算
   ```typescript
   let normalizedDisplay = normalizeSpecialChars(displayText);
   let normalizedTyped = normalizeSpecialChars(typedText);
   normalizedDisplay = normalizedDisplay.normalize('NFC');
   normalizedTyped = normalizedTyped.normalize('NFC');
   ```

## 🧪 测试用例

### 测试 1: 连字符
```typescript
目标: "error-free" (使用 U+2013 en-dash)
输入: "error-free" (键盘 U+002D hyphen)
预期: ✅ 正确匹配，显示绿色
```

### 测试 2: 引号
```typescript
目标: "Hello" (智能引号 U+201C/U+201D)
输入: "Hello" (直引号 U+0022)
预期: ✅ 正确匹配，显示绿色
```

### 测试 3: 省略号
```typescript
目标: "Wait…" (U+2026)
输入: "Wait..." (三个点)
预期: ✅ 正确匹配，显示绿色
```

### 测试 4: 数学符号
```typescript
目标: "2×3÷6" (U+00D7, U+00F7)
输入: "2x3/6"
预期: ✅ 正确匹配，显示绿色
```

### 测试 5: 中文 + 特殊符号
```typescript
目标: "你好——世界" (em-dash)
输入: "你好--世界" (两个hyphen)
注意: 这个不会匹配！需要单个 em-dash → 单个 hyphen
```

## 📝 使用示例

### 在代码中使用

```typescript
import { normalizeSpecialChars } from './utils/wpmCalculator';

// 标准化文本
const normalized = normalizeSpecialChars("Hello–world");
console.log(normalized); // "Hello-world"

// 比较两个文本
const text1 = normalizeSpecialChars("it's").normalize('NFC');
const text2 = normalizeSpecialChars("it's").normalize('NFC');
console.log(text1 === text2); // true
```

## 🎯 为什么需要这个？

### 问题场景

1. **从网页复制文本**
   - 网页常用智能引号 "" 而不是 ""
   - 使用 en-dash – 而不是 hyphen -

2. **不同键盘布局**
   - Mac vs Windows 输入的符号可能不同
   - 国际键盘有不同的符号

3. **输入法问题**
   - 中文输入法可能产生全角符号
   - 自动替换功能（如 ... → …）

### 标准化的好处

✅ **用户友好**
- 用户不需要关心具体是哪种破折号
- 键盘输入的字符就能匹配

✅ **跨平台兼容**
- Mac、Windows、Linux 输入都能匹配
- 不同浏览器都能正确工作

✅ **内容来源无关**
- 从任何网站复制的文本都能使用
- 不需要手动替换符号

## 🔧 扩展性

### 添加新的符号映射

如果发现其他符号无法匹配，只需添加到 `normalizeSpecialChars`：

```typescript
export function normalizeSpecialChars(text: string): string {
  return text
    // ... 现有映射 ...
    
    // 添加新的映射
    .replace(/[新符号1新符号2]/g, '标准符号')
    ;
}
```

### 常见可能需要添加的符号

- **货币符号**: ¥ € £ → $ (如果需要)
- **度数符号**: ° → o (如果需要)
- **上标下标**: ² ³ → 2 3 (如果需要)

## 🎉 总结

现在所有常见的符号变体都能正确匹配：

✅ **连字符/破折号**: - – — 等
✅ **引号**: ' ' " " 等
✅ **省略号**: … vs ...
✅ **空格**: 各种宽度的空格
✅ **数学符号**: × ÷ • 等

用户可以放心输入，不用担心符号类型问题！
