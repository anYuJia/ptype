import { TypingMode, DifficultyLevel, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';
import {
  pythonLibrary,
  javascriptLibrary,
  typescriptLibrary,
  javaLibrary,
  goLibrary,
  bashLibrary,
  cppLibrary,
  cLibrary,
  rustLibrary,
  htmlLibrary,
  powershellLibrary,
  englishLibrary,
  chineseModernLibrary,
  chineseClassicalLibrary,
} from '@/lib/code-libraries';

// ==================== 文本池获取函数 ====================
function getTextPool(
  mode: TypingMode,
  difficulty: DifficultyLevel,
  chineseStyle?: ChineseStyle,
  programmingLanguage?: ProgrammingLanguage
): string[] {
  // 英文模式
  if (mode === 'english') {
    return englishLibrary[difficulty].map(item => item.text);
  }

  // 中文模式
  if (mode === 'chinese') {
    const style = chineseStyle || 'modern';
    const library = style === 'modern' ? chineseModernLibrary : chineseClassicalLibrary;
    return library[difficulty].map(item => item.text);
  }

  // 程序员模式
  if (mode === 'coder') {
    const lang = programmingLanguage || 'python';

    // 使用新的代码库 - CodeLibrary has easy/medium/hard arrays with code property
    type CodeLibraryType = { [K in 'easy' | 'medium' | 'hard']: { code: string }[] };
    const codeLibraries: Record<string, CodeLibraryType> = {
      python: pythonLibrary,
      javascript: javascriptLibrary,
      typescript: typescriptLibrary,
      java: javaLibrary,
      go: goLibrary,
      bash: bashLibrary,
      cpp: cppLibrary,
      c: cLibrary,
      rust: rustLibrary,
      html: htmlLibrary,
      powershell: powershellLibrary,
    };

    const library = codeLibraries[lang];
    if (library && library[difficulty]) {
      return library[difficulty].map((item) => item.code);
    }

    // 对于尚未迁移的语言，暂时回退到 Python
    console.warn(`Language ${lang} not yet migrated or not found, falling back to Python`);
    return pythonLibrary.easy.map(item => item.code);
  }

  // 默认返回英文简单文本
  return englishLibrary.easy.map(item => item.text);
}

// 随机打乱数组
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 生成练习文本
 */
export function generateText(
  mode: TypingMode,
  difficulty: DifficultyLevel,
  minLength: number = 200,
  chineseStyle?: ChineseStyle,
  programmingLanguage?: ProgrammingLanguage
): string {
  const textPool = getTextPool(mode, difficulty, chineseStyle, programmingLanguage);

  // 确保池中有数据
  if (textPool.length === 0) {
    return '';
  }

  // 统一使用换行符作为分隔符，这样每句话/每个代码块都会独占一行
  const separator = '\n';

  let result = '';

  // True Random: 每次独立随机抽取
  // 避免完全通过 shuffle 的排列组合（那样会导致在一个周期内不重复，但也限制了随机性）
  // 用户要求 "True Random"

  while (result.length < minLength) {
    const randomIndex = Math.floor(Math.random() * textPool.length);
    const randomItem = textPool[randomIndex];

    if (result.length > 0) {
      result += separator;
    }
    result += randomItem;
  }

  return result.trim();
}
