# 🔧 命令格式修复

## ✅ 修复内容

### 问题
Linux和Windows命令没有分行，所有命令连在一起，难以阅读和练习。

### 解决方案
修改 `generateText` 函数，根据编程语言类型使用不同的分隔符：

```typescript
// 对于bash和powershell，每个命令占一行
const isBashOrPowershell = programmingLanguage === 'bash' || programmingLanguage === 'powershell';
const separator = isBashOrPowershell ? '\n' : ' ';
```

## 📊 效果对比

### 修复前 (Bash)
```
ls -la cd /home/user pwd mkdir new_folder rm file.txt cp source.txt dest.txt
```
❌ 所有命令连在一起

### 修复后 (Bash)
```
ls -la
cd /home/user
pwd
mkdir new_folder
rm file.txt
cp source.txt dest.txt
```
✅ 每个命令占一行

### 修复前 (PowerShell)
```
Get-ChildItem Set-Location C:\Users Get-Location Get-Process Stop-Process -Id 1234
```
❌ 所有命令连在一起

### 修复后 (PowerShell)
```
Get-ChildItem
Set-Location C:\Users
Get-Location
Get-Process
Stop-Process -Id 1234
```
✅ 每个命令占一行

## 💡 分隔符逻辑

| 编程语言 | 分隔符 | 说明 |
|---------|-------|------|
| Bash | `\n` (换行) | 每个命令一行 |
| PowerShell | `\n` (换行) | 每个命令一行 |
| Python | ` ` (空格) | 代码片段用空格 |
| JavaScript | ` ` (空格) | 代码片段用空格 |
| 其他语言 | ` ` (空格) | 代码片段用空格 |

## 🎯 为什么这样设计？

### Bash/PowerShell
- **命令式**: 每个命令是独立的操作
- **实际使用**: 在终端中一次执行一个命令
- **练习方式**: 逐个命令练习更自然

### 其他编程语言
- **代码片段**: 是完整的代码块
- **空格连接**: 不同代码片段之间用空格分隔
- **阅读流畅**: 代码块之间有适当间隔

## 🧪 测试步骤

### 测试1: Bash命令
1. 选择 Coder 模式
2. 选择 Bash/Linux
3. 开始练习
4. **预期**: 看到每个命令占一行
```
ls -la
grep 'pattern' file.txt
find . -name '*.txt'
```

### 测试2: PowerShell命令
1. 选择 Coder 模式
2. 选择 PowerShell
3. 开始练习
4. **预期**: 看到每个命令占一行
```
Get-ChildItem
Get-Process
Get-Service
```

### 测试3: Python代码
1. 选择 Coder 模式
2. 选择 Python
3. **预期**: 代码片段用空格分隔（不是每行一个）

## ✨ 优势

### 对于命令 (Bash/PowerShell)
- ✅ 每个命令清晰可见
- ✅ 类似真实终端体验
- ✅ 更容易聚焦单个命令
- ✅ 练习更自然

### 对于代码 (Python/Java等)
- ✅ 代码片段完整
- ✅ 阅读流畅
- ✅ 保持原有格式

## 🎉 总结

现在：
- **Bash命令**: 一行一个 ✅
- **PowerShell命令**: 一行一个 ✅
- **代码片段**: 空格分隔，保持完整 ✅

更符合实际使用习惯，练习体验更好！
