import { create } from 'zustand';
import {
  TypingMode,
  TypingStatus,
  DifficultyLevel,
  ChineseStyle,
  ProgrammingLanguage,
  EnglishOptions,
  TypingOptions,
  DEFAULT_DURATION,
  DEFAULT_MODE,
  DEFAULT_DIFFICULTY,
  DEFAULT_CHINESE_STYLE,
  DEFAULT_PROGRAMMING_LANGUAGE,
  DEFAULT_ENGLISH_OPTIONS,
  DEFAULT_TYPING_OPTIONS,
} from '@/lib/constants';
import { generateText } from '@/lib/utils/textGenerator';
import { analyzeTyping, calculateWPM, calculateCPM, calculateLPM, calculateAccuracy, normalizeSpecialChars } from '../utils/wpmCalculator';
import { calculateAllLines, LineInfo } from '../utils/lineUtils';


// WPM 历史记录点（用于绘制曲线图）
// CPM 历史记录点（用于绘制曲线图）
export interface CpmHistoryPoint {
  time: number; // 经过的秒数
  cpm: number;
  accuracy: number;
}

// 设置接口
export interface TypingSettings {
  duration: number; // 秒数
  mode: TypingMode;
  difficulty: DifficultyLevel; // 难度级别
  chineseStyle: ChineseStyle; // 中文文体
  programmingLanguage: ProgrammingLanguage; // 编程语言
  englishOptions: EnglishOptions; // 英文选项
  typingOptions: TypingOptions; // 打字选项
  customText?: string; // 自定义文本
}

// 状态接口
export interface TypingState {
  // 核心状态
  status: TypingStatus;
  targetText: string; // 原始文本
  displayText: string; // 处理后的显示文本（根据选项处理）
  typedText: string;

  // 统计数据
  correctChars: number;
  errors: number;
  wpm: number;        // Words Per Minute (英文模式)
  cpm: number;        // Characters Per Minute (所有模式)
  lpm: number;        // Lines Per Minute (代码模式)
  accuracy: number;

  // 时间相关
  timeLeft: number;
  startTime: number | null;

  // CPM 历史（用于图表）
  cpmHistory: CpmHistoryPoint[];
  lastCorrectChars?: number; // 上一次 tick 的正确字符数，用于计算瞬时速度

  // 缓存
  lines: LineInfo[]; // 缓存行信息，避免重复计算
  lastCoderText?: string; // 缓存代码模式文本

  // 设置
  settings: TypingSettings;

  // Actions
  initTest: (forceRegenerate?: boolean) => void;
  startTest: () => void;
  handleInput: (char: string) => void;
  handleBackspace: () => void;
  tick: () => void;
  finishTest: () => void;
  resetTest: () => void;
  updateSettings: (settings: Partial<TypingSettings>) => void;
}

/**
 * 处理目标文本（根据英文选项）
 * 并在最后统一进行标准化处理，确保 store 中的文本与渲染即逻辑一致
 */
function processTargetText(text: string, mode: TypingMode, options: EnglishOptions): string {
  let processed = text;

  if (mode === 'english') {
    // 忽略标点符号：直接从文本中移除
    if (options.ignorePunctuation) {
      processed = processed.replace(/[.,!?;:'"-]/g, '');
    }

    // 不区分大小写：转换为小写
    if (!options.caseSensitive) {
      processed = processed.toLowerCase();
    }
  }

  // 统一标准化：处理特殊符号和 Unicode
  return normalizeSpecialChars(processed).normalize('NFC');
}

export const useTypingStore = create<TypingState>((set, get) => ({
  // 初始状态
  status: 'idle',
  targetText: '',
  displayText: '',
  typedText: '',
  correctChars: 0,
  errors: 0,
  wpm: 0,
  cpm: 0,
  lpm: 0,
  accuracy: 100,
  timeLeft: DEFAULT_DURATION,
  startTime: null,
  cpmHistory: [],
  lines: [], // 初始化为空
  settings: {
    duration: DEFAULT_DURATION,
    mode: DEFAULT_MODE,
    difficulty: DEFAULT_DIFFICULTY,
    chineseStyle: DEFAULT_CHINESE_STYLE,
    programmingLanguage: DEFAULT_PROGRAMMING_LANGUAGE,
    englishOptions: DEFAULT_ENGLISH_OPTIONS,
    typingOptions: DEFAULT_TYPING_OPTIONS,
  },

  // 初始化测试（生成新文本）
  initTest: (forceRegenerate?: boolean) => {
    const { settings } = get();

    let rawText = '';
    const state = get();

    // Custom Mode
    if (settings.mode === 'custom' && settings.customText) {
      rawText = settings.customText;
    }
    // Coder Mode - Reuse text if switching back to it (and language matches if we tracked it, but for now just reuse text if mode matches)
    // Actually, initTest is called on mode change.
    // We only want to reuse text if we are switching TO coder mode from another mode, NOT when we hit "regenerate".
    // "Regenerate" calls initTest directly. Mode didn't change.
    // "Switch Mode" calls updateSettings -> initTest.
    // It's hard to distinguish "Regenerate" from "Switch Mode" inside initTest without extra flags.
    // However, the user request is "Default is previous code".
    // Maybe we just check if state.lastCoderText exists?
    // But if I hit "Regenerate", I want NEW code.
    // How to distinguish?
    // Let's rely on `lastCoderText`. When `initTest` is called, we can't easily know the intent.
    // But typically `initTest` generates text.
    // If I want to persist, I should perhaps NOT call `initTest` when switching mode if I can restore state?
    // But `updateSettings` forces `initTest`.

    // Better approach:
    // When we leave coder mode, we save the text.
    // When we enter coder mode, if we have saved text, we use it.
    // But `initTest` wipes everything.

    // Let's modify logic:
    // If settings.mode === 'coder' AND state.lastCoderText is set... use it?
    // But then "Regenerate" won't work because it calls initTest which sees lastCoderText and reuses it.
    // We need to clear `lastCoderText` when "Regenerate" is clicked.
    // But "Regenerate" just calls `initTest`.

    // Okay, let's create a new action or param for `initTest(forceRegenerate?: boolean)`.

    else if (settings.mode === 'coder' && state.lastCoderText && !forceRegenerate) {
      rawText = state.lastCoderText;
    } else {
      rawText = generateText(
        settings.mode,
        settings.difficulty,
        500,
        settings.chineseStyle,
        settings.programmingLanguage
      );

      // If we just generated new text for coder mode, save it
      if (settings.mode === 'coder') {
        // We can't set state here immediately if we are inside set() - wait, we are in get().
        // We will set it in the set() call below.
      }
    }

    const displayText = processTargetText(rawText, settings.mode, settings.englishOptions);

    set({
      status: 'idle',
      targetText: rawText,
      displayText,
      typedText: '',
      correctChars: 0,
      errors: 0,
      wpm: 0,
      accuracy: 100,
      timeLeft: settings.duration,
      startTime: null,
      cpmHistory: [],
      lastCorrectChars: 0,
      // Save lastCoderText if we are in coder mode
      lastCoderText: settings.mode === 'coder' ? rawText : state.lastCoderText,
      lines: calculateAllLines(displayText, settings.mode),
    });
  },

  // 开始测试
  startTest: () => {
    set({
      status: 'running',
      startTime: Date.now(),
    });
  },

  // 处理输入
  handleInput: (char: string) => {
    const { status, displayText, typedText } = get();

    // 如果是 idle 状态，先开始测试
    if (status === 'idle') {
      get().startTest();
    }

    if (status === 'finished') return;

    // 如果已经输入完所有目标文本，忽略新输入
    if (typedText.length >= displayText.length) return;

    // 直接添加输入字符（不做任何转换，因为displayText已经预处理过了）
    const newTypedText = typedText + char;
    const analysis = analyzeTyping(displayText, newTypedText);

    set({
      typedText: newTypedText,
      correctChars: analysis.correctChars,
      errors: analysis.errors,
      accuracy: calculateAccuracy(analysis.correctChars, analysis.totalTyped),
    });

    // 检查是否完成所有文本
    if (newTypedText.length >= displayText.length) {
      get().finishTest();
    }
  },

  // 处理退格
  handleBackspace: () => { // Fixed object literal syntax
    const { status, typedText, displayText, settings } = get();

    // 检查是否允许删除
    if (!settings.typingOptions.allowBackspace) return;

    if (status === 'finished' || typedText.length === 0) return;

    // 检查是否会删除到上一行（防止跨行删除）
    // 使用预计算的 lines 检查当前位置是否是某行的开头
    const currentLineStart = get().lines.find(l => l.startIndex === typedText.length);
    if (currentLineStart && currentLineStart.startIndex !== 0) {
      return;
    }

    const newTypedText = typedText.slice(0, -1);
    const analysis = analyzeTyping(displayText, newTypedText);

    set({
      typedText: newTypedText,
      correctChars: analysis.correctChars,
      errors: analysis.errors,
      accuracy: calculateAccuracy(analysis.correctChars, analysis.totalTyped),
    });
  },

  // 每秒计时器更新
  tick: () => {
    const { status, timeLeft, settings, startTime, correctChars, targetText } = get();

    if (status !== 'running') return;

    const newTimeLeft = timeLeft - 1;

    // 每秒更新所有速度指标
    const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;
    const currentAccuracy = get().accuracy;

    // 计算 WPM (仅英文模式)
    const currentWpm = settings.mode === 'english'
      ? calculateWPM(correctChars, elapsedSeconds)
      : 0;

    // 计算 CPM (所有模式)
    const currentCpm = calculateCPM(correctChars, elapsedSeconds);

    // 计算 LPM (仅代码模式)
    const currentLpm = settings.mode === 'coder'
      ? calculateLPM(targetText, correctChars, elapsedSeconds)
      : 0;

    // WPM 历史记录点（用于绘制曲线图） - actually CPM now

    const lastCorrectChars = get().lastCorrectChars || 0;
    const charsDelta = correctChars - lastCorrectChars;

    // 统一使用 CPM (Characters Per Minute) 作为图表数据
    // 瞬时 CPM = 这一秒的字符数 * 60
    const instantaneousSpeed = charsDelta * 60;

    const cpmHistory = [...get().cpmHistory, {
      time: Math.floor(elapsedSeconds),
      cpm: Math.max(0, Math.round(instantaneousSpeed)),
      accuracy: currentAccuracy
    }];

    if (newTimeLeft <= 0) {
      set({
        timeLeft: 0,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        cpmHistory,
        lastCorrectChars: correctChars // Update for next tick (though finished)
      });
      get().finishTest();
    } else {
      set({
        timeLeft: newTimeLeft,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        cpmHistory,
        lastCorrectChars: correctChars // Update for next tick
      });
    }
  },

  // 完成测试
  finishTest: () => {
    set({ status: 'finished' });
  },

  // 重置测试
  resetTest: () => {
    get().initTest();
  },

  // 更新设置
  updateSettings: (newSettings: Partial<TypingSettings>) => {
    const { settings, targetText } = get();
    const updatedSettings = { ...settings, ...newSettings };

    set({ settings: updatedSettings });

    // 如果更改了模式、难度、文体、语言或时长，重新生成文本
    if ((newSettings.mode && newSettings.mode !== settings.mode) ||
      (newSettings.difficulty && newSettings.difficulty !== settings.difficulty) ||
      (newSettings.chineseStyle && newSettings.chineseStyle !== settings.chineseStyle) ||
      (newSettings.programmingLanguage && newSettings.programmingLanguage !== settings.programmingLanguage) ||
      (newSettings.duration && newSettings.duration !== settings.duration)) {
      get().initTest();
    } else if (newSettings.englishOptions && settings.mode === 'english') {
      // 如果只是英文选项改变，重新处理文本
      const displayText = processTargetText(targetText, settings.mode, updatedSettings.englishOptions);
      set({
        displayText,
        lines: calculateAllLines(displayText, settings.mode),
        typedText: '', // 重置输入
        correctChars: 0,
        errors: 0,
        accuracy: 100,
      });
    }
  },
}));
