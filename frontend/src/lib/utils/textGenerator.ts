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

    // 使用新的代码库
    const codeLibraries: Record<string, any> = {
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
      return library[difficulty].map((item: any) => item.code);
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
  const shuffled = shuffleArray(textPool);

  // 统一使用换行符作为分隔符，这样每句话/每个代码块都会独占一行
  // 这符合用户“参考code的方式”的要求，也解决了中文模式下句子不换行的问题
  const separator = '\n';

  let result = '';
  let index = 0;

  while (result.length < minLength && index < shuffled.length) {
    if (result.length > 0) {
      result += separator;
    }
    result += shuffled[index];
    index++;
  }

  // 如果遍历完了还不够长，重新开始
  while (result.length < minLength) {
    if (result.length > 0) {
      result += separator;
    }
    result += shuffled[index % shuffled.length];
    index++;
  }

  return result.trim();
}
