# 速度指标适配说明

## 🎯 不同模式的速度指标

现在应用会根据打字模式显示最相关的速度指标：

### 📝 英文模式 (English)
显示 **2个** 速度指标：
- **WPM** (Words Per Minute) - 单词/分钟
  - 标准打字速度指标
  - 计算公式：`(正确字符数 / 5) / 分钟数`
  - 5个字符 = 1个单词（标准）

- **CPM** (Characters Per Minute) - 字符/分钟
  - 更精确的打字速度
  - 计算公式：`正确字符数 / 分钟数`

### 🇨🇳 中文模式 (Chinese)
显示 **1个** 速度指标：
- **CPM** (Characters Per Minute) - 字符/分钟
  - 中文按字符计数更合理
  - 没有WPM（中文没有明确的"单词"概念）

### 💻 代码模式 (Coder)
显示 **2个** 速度指标：
- **LPM** (Lines Per Minute) - 行/分钟
  - 代码特有的指标
  - 计算完成的代码行数
  - 计算公式：`(总行数 × 完成比例) / 分钟数`

- **CPM** (Characters Per Minute) - 字符/分钟
  - 辅助指标，显示整体输入速度

## 📊 指标计算详解

### WPM 计算
```typescript
export function calculateWPM(
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const words = correctChars / 5;  // 5字符=1单词
  return Math.round(words / minutes);
}
```

### CPM 计算
```typescript
export function calculateCPM(
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  return Math.round(correctChars / minutes);
}
```

### LPM 计算
```typescript
export function calculateLPM(
  totalText: string,
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  
  // 计算总行数
  const totalLines = totalText.split('\n').length;
  
  // 计算完成的比例
  const completionRate = correctChars / totalText.length;
  
  // 估算完成的行数
  const completedLines = totalLines * completionRate;
  
  const minutes = elapsedSeconds / 60;
  return Math.round(completedLines / minutes);
}
```

## 🎨 界面展示

### 英文模式
```
┌─────────────────────────────────────────┐
│  60         240        10        98%    │
│  WPM        CPM       SEC       ACC%    │
│ 单词/分钟  字符/分钟    秒      准确率   │
└─────────────────────────────────────────┘
```

### 中文模式
```
┌──────────────────────────────┐
│     180        10        98%  │
│     CPM       SEC       ACC%  │
│  字符/分钟     秒      准确率  │
└──────────────────────────────┘
```

### 代码模式
```
┌─────────────────────────────────────────┐
│  12         180        10        98%    │
│  LPM        CPM       SEC       ACC%    │
│ 行/分钟    字符/分钟    秒      准确率   │
└─────────────────────────────────────────┘
```

## 🔄 实时更新

所有指标每秒自动更新（在 `tick()` 函数中）：

```typescript
tick: () => {
  // 每秒计算所有指标
  const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;
  
  // 英文模式：计算 WPM
  const currentWpm = settings.mode === 'english' 
    ? calculateWPM(correctChars, elapsedSeconds)
    : 0;
  
  // 所有模式：计算 CPM
  const currentCpm = calculateCPM(correctChars, elapsedSeconds);
  
  // 代码模式：计算 LPM
  const currentLpm = settings.mode === 'coder'
    ? calculateLPM(targetText, correctChars, elapsedSeconds)
    : 0;

  // 更新状态
  set({ wpm: currentWpm, cpm: currentCpm, lpm: currentLpm });
}
```

## 📈 示例数据

### 英文模式示例
- 输入60秒
- 正确字符300个
- WPM = (300 / 5) / 1 = **60 WPM**
- CPM = 300 / 1 = **300 CPM**

### 中文模式示例
- 输入60秒
- 正确字符150个（中文字符）
- CPM = 150 / 1 = **150 CPM**

### 代码模式示例
- 代码总共20行
- 总共400个字符
- 已输入200个字符（50%完成）
- 输入60秒
- LPM = (20 × 0.5) / 1 = **10 LPM**
- CPM = 200 / 1 = **200 CPM**

## 🎯 为什么这样设计？

### 英文模式 - WPM + CPM
- **WPM** 是国际通用的打字速度标准
- **CPM** 提供更精确的速度数据
- 两者结合能全面评估打字能力

### 中文模式 - 仅 CPM
- 中文没有明确的"单词"边界
- 按字符计数更合理
- 一个汉字 = 一个字符 = 一个单位

### 代码模式 - LPM + CPM
- **LPM** 是程序员特有的效率指标
- 代码按行组织，行数更有意义
- **CPM** 作为辅助，显示输入速度

## 💡 优势

### 1. **模式专属指标**
- 每种模式显示最相关的速度指标
- 不会显示无意义的数据

### 2. **自适应布局**
- 中文模式只显示1个速度指标（空间更大）
- 英文/代码模式显示2个速度指标

### 3. **国际化友好**
- 英文用户：熟悉的 WPM
- 中文用户：直观的 CPM
- 程序员：专业的 LPM

### 4. **精确计算**
- 所有指标每秒实时更新
- 基于实际经过时间，不是估算

## 🧪 测试方法

### 测试英文模式
1. 切换到英文模式
2. 开始打字
3. 观察显示：**WPM | CPM | SEC | ACC%**
4. 两个速度指标都应该更新

### 测试中文模式
1. 切换到中文模式
2. 开始打字
3. 观察显示：**CPM | SEC | ACC%**
4. 只有1个速度指标

### 测试代码模式
1. 切换到代码模式
2. 开始打字
3. 观察显示：**LPM | CPM | SEC | ACC%**
4. LPM 应该显示完成的行数

## 📝 注意事项

1. **WPM 只在英文模式显示**
   - 其他模式 WPM = 0（但不显示）

2. **LPM 只在代码模式显示**
   - 其他模式 LPM = 0（但不显示）

3. **CPM 在所有模式都计算**
   - 但只在相应模式才显示

4. **字体大小调整**
   - 从 5xl/7xl 调整为 4xl/6xl
   - 适应更多指标的显示

## 🎉 总结

现在应用会根据不同的打字模式智能显示最相关的速度指标：

✅ **英文模式**: WPM + CPM（单词和字符）
✅ **中文模式**: CPM（字符）
✅ **代码模式**: LPM + CPM（行和字符）

每个模式都有专属的、最合适的速度评估方式！
