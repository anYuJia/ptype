import { CHARS_PER_WORD } from '@/lib/constants';

/**
 * 标准化特殊字符 - 将各种Unicode变体转换为标准字符
 * 这确保不同输入方式的相同符号能够正确匹配
 */
export function normalizeSpecialChars(text: string): string {
  return text
    // 各种连字符 → 标准连字符
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-')  // en-dash, em-dash, minus等 → hyphen

    // 各种引号 → 标准引号
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // 左右单引号 → 直单引号
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')  // 左右双引号 → 直双引号
    .replace(/[\u00AB\u00BB]/g, '"')             // 书名号 → 双引号

    // 省略号 → 三个点
    .replace(/\u2026/g, '...')  // … → ...

    // 各种空格 → 标准空格
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')  // 不换行空格、各种宽度空格 → 普通空格

    // 其他特殊字符
    .replace(/\u00D7/g, 'x')   // × → x (乘号)
    .replace(/\u00F7/g, '/')   // ÷ → / (除号)
    .replace(/\u2022/g, '*')   // • → * (项目符号)
    .replace(/\u2219/g, '*')   // ∙ → * (bullet operator)
    ;
}

/**
 * 计算 WPM (Words Per Minute)
 * 标准计算方式：(正确字符数 / 5) / 分钟数
 */
export function calculateWPM(
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;

  const minutes = elapsedSeconds / 60;
  const words = correctChars / CHARS_PER_WORD;

  return Math.round(words / minutes);
}

/**
 * 计算原始 WPM（不考虑错误惩罚）
 */
export function calculateRawWPM(
  totalChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;

  const minutes = elapsedSeconds / 60;
  const words = totalChars / CHARS_PER_WORD;

  return Math.round(words / minutes);
}

/**
 * 计算准确率
 */
export function calculateAccuracy(
  correctChars: number,
  totalChars: number
): number {
  if (totalChars <= 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

/**
 * 计算 CPM (Characters Per Minute) - 字符/分钟
 */
export function calculateCPM(
  correctChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  return Math.round(correctChars / minutes);
}

/**
 * 计算 LPM (Lines Per Minute) - 行/分钟
 * 用于程序员模式
 */
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

/**
 * 分析输入文本与目标文本的差异
 */
export function analyzeTyping(targetText: string, typedText: string): {
  correctChars: number;
  errors: number;
  totalTyped: number;
} {
  // 1. 特殊字符标准化 - 确保符号正确匹配
  let normalizedTarget = normalizeSpecialChars(targetText);
  let normalizedTyped = normalizeSpecialChars(typedText);

  // 2. Unicode 标准化 - 确保中文字符比较正确
  normalizedTarget = normalizedTarget.normalize('NFC');
  normalizedTyped = normalizedTyped.normalize('NFC');

  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < normalizedTyped.length; i++) {
    if (i < normalizedTarget.length && normalizedTyped[i] === normalizedTarget[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  return {
    correctChars,
    errors,
    totalTyped: normalizedTyped.length,
  };
}
