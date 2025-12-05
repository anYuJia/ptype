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
import { analyzeTyping, calculateWPM, calculateCPM, calculateLPM, calculateAccuracy } from '../utils/wpmCalculator';
import { isLineStart } from '../utils/lineUtils';

// WPM 历史记录点（用于绘制曲线图）
export interface WpmHistoryPoint {
  time: number; // 经过的秒数
  wpm: number;
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

  // WPM 历史（用于图表）
  wpmHistory: WpmHistoryPoint[];
  lastCorrectChars?: number; // 上一次 tick 的正确字符数，用于计算瞬时速度

  // 设置
  settings: TypingSettings;

  // Actions
  initTest: () => void;
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
 */
function processTargetText(text: string, mode: TypingMode, options: EnglishOptions): string {
  if (mode !== 'english') return text;

  let processed = text;

  // 忽略标点符号：直接从文本中移除
  if (options.ignorePunctuation) {
    processed = processed.replace(/[.,!?;:'"-]/g, '');
  }

  // 不区分大小写：转换为小写
  if (!options.caseSensitive) {
    processed = processed.toLowerCase();
  }

  return processed;
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
  wpmHistory: [],
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
  initTest: () => {
    const { settings } = get();
    const rawText = generateText(
      settings.mode,
      settings.difficulty,
      500,
      settings.chineseStyle,
      settings.programmingLanguage
    );
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
      wpmHistory: [],
      lastCorrectChars: 0,
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
    // 使用 isLineStart 工具函数检测当前位置是否是某行的开头
    if (isLineStart(displayText, typedText, settings.mode)) {
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

    // 计算瞬时速度（用于图表）
    const lastCorrectChars = get().lastCorrectChars || 0;
    const charsDelta = correctChars - lastCorrectChars;

    // 瞬时 WPM (假设 tick 是 1 秒一次)
    // 英文：charsDelta / 5 * 60
    // 中文：charsDelta * 60
    // 代码：行数比较难算瞬时，暂时用 charsDelta / 平均行长 * 60 或者直接用 charsDelta * 60 (CPM)
    // 为了统一，图表最好显示 CPM 或 WPM。

    let instantaneousSpeed = 0;
    if (settings.mode === 'english') {
      instantaneousSpeed = (charsDelta / 5) * 60;
    } else if (settings.mode === 'chinese') {
      instantaneousSpeed = charsDelta * 60;
    } else {
      // Coder mode: use CPM for chart or estimate LPM? 
      // Let's use CPM for chart consistency or WPM equivalent
      instantaneousSpeed = (charsDelta / 5) * 60;
    }

    // 平滑处理：如果瞬时速度波动太大，可以考虑简单的移动平均，但这里先直接用
    // 实际上 1 秒的采样可能波动很大（0 或 60+），可以考虑加个简单的平滑
    // 或者，我们可以保留 cumulative average for the chart if the user prefers smooth curves, 
    // but usually "WPM over time" implies instantaneous or short-window average.
    // Let's try a simple weighted average with previous point if exists to smooth it slightly?
    // No, let's stick to raw instantaneous first.

    const wpmHistory = [...get().wpmHistory, {
      time: Math.floor(elapsedSeconds),
      wpm: Math.max(0, Math.round(instantaneousSpeed)),
      accuracy: currentAccuracy
    }];

    if (newTimeLeft <= 0) {
      set({
        timeLeft: 0,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        wpmHistory,
        lastCorrectChars: correctChars // Update for next tick (though finished)
      });
      get().finishTest();
    } else {
      set({
        timeLeft: newTimeLeft,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        wpmHistory,
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
        typedText: '', // 重置输入
        correctChars: 0,
        errors: 0,
        accuracy: 100,
      });
    }
  },
}));
