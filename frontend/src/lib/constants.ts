// 练习模式
export type TypingMode = 'english' | 'chinese' | 'coder';

// 练习状态
export type TypingStatus = 'idle' | 'running' | 'finished';

// 难度级别
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// 中文文体类型
export type ChineseStyle = 'modern' | 'classical'; // 现代文 | 文言文

// 编程语言类型
export type ProgrammingLanguage =
    | 'python'
    | 'javascript'
    | 'typescript'
    | 'c'
    | 'cpp'
    | 'java'
    | 'go'
    | 'dart'
    | 'html'
    | 'css'
    | 'powershell'
    | 'bash';

// 英文选项
export interface EnglishOptions {
    caseSensitive: boolean; // 区分大小写
    ignorePunctuation: boolean; // 忽略标点符号
}

// 默认配置
export const DEFAULT_DURATION = 60; // 默认60秒
export const DEFAULT_MODE: TypingMode = 'english';
export const DEFAULT_DIFFICULTY: DifficultyLevel = 'medium';
export const DEFAULT_CHINESE_STYLE: ChineseStyle = 'modern';
export const DEFAULT_PROGRAMMING_LANGUAGE: ProgrammingLanguage = 'python';
export const DEFAULT_ENGLISH_OPTIONS: EnglishOptions = {
    caseSensitive: false,
    ignorePunctuation: false,
};

// 时间选项（秒）
export const DURATION_OPTIONS = [15, 30, 60, 120] as const;

// 难度选项
export const DIFFICULTY_OPTIONS: DifficultyLevel[] = ['easy', 'medium', 'hard'];

// 中文文体选项
export const CHINESE_STYLE_OPTIONS: ChineseStyle[] = ['modern', 'classical'];

// 编程语言选项
export const PROGRAMMING_LANGUAGE_OPTIONS: ProgrammingLanguage[] = [
    'python',
    'javascript',
    'typescript',
    'java',
    'cpp',
    'c',
    'go',
    'dart',
    'html',
    'css',
    'bash',
    'powershell',
];

// 语言标签
export const PROGRAMMING_LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    go: 'Go',
    dart: 'Dart',
    html: 'HTML',
    css: 'CSS',
    bash: 'Bash/Linux',
    powershell: 'PowerShell',
};

export const CHINESE_STYLE_LABELS: Record<ChineseStyle, string> = {
    modern: '现代文',
    classical: '文言文',
};

// WPM 计算常量
export const CHARS_PER_WORD = 5; // 标准：5个字符算1个单词
