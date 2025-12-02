import { create } from 'zustand';
import {
  TypingMode,
  TypingStatus,
  DifficultyLevel,
  EnglishOptions,
  DEFAULT_DURATION,
  DEFAULT_MODE,
  DEFAULT_DIFFICULTY,
  DEFAULT_ENGLISH_OPTIONS,
} from '@/lib/constants';
import { generateText } from '@/lib/utils/textGenerator';
import { analyzeTyping, calculateWPM, calculateCPM, calculateLPM, calculateAccuracy } from '../utils/wpmCalculator';

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
  englishOptions: EnglishOptions; // 英文选项
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
    englishOptions: DEFAULT_ENGLISH_OPTIONS,
  },

  // 初始化测试（生成新文本）
  initTest: () => {
    const { settings } = get();
    const rawText = generateText(settings.mode, settings.difficulty, 500);
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
  handleBackspace: () => {
    const { status, typedText, displayText } = get();

    if (status === 'finished' || typedText.length === 0) return;

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

    // 记录 WPM 历史
    const wpmHistory = [...get().wpmHistory, {
      time: Math.floor(elapsedSeconds),
      wpm: currentWpm,
      accuracy: currentAccuracy
    }];

    if (newTimeLeft <= 0) {
      set({
        timeLeft: 0,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        wpmHistory
      });
      get().finishTest();
    } else {
      set({
        timeLeft: newTimeLeft,
        wpm: currentWpm,
        cpm: currentCpm,
        lpm: currentLpm,
        wpmHistory
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

    // 如果更改了模式或难度，重新生成文本
    if ((newSettings.mode && newSettings.mode !== settings.mode) ||
      (newSettings.difficulty && newSettings.difficulty !== settings.difficulty)) {
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
    } else if (newSettings.duration) {
      set({ timeLeft: newSettings.duration });
    }
  },
}));
