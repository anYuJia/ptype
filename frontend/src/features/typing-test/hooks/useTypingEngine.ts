'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useTypingStore } from '../store/typingStore';
import { DifficultyLevel, EnglishOptions, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';

/**
 * 打字引擎 Hook
 * 处理键盘事件监听和计时器逻辑
 */
export function useTypingEngine() {
  const {
    status,
    targetText,
    displayText,
    typedText,
    wpm,
    cpm,
    lpm,
    accuracy,
    timeLeft,
    errors,
    correctChars,
    wpmHistory,
    settings,
    initTest,
    handleInput,
    handleBackspace,
    tick,
    resetTest,
    updateSettings,
  } = useTypingStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isComposingRef = useRef(false);
  const inputValueRef = useRef('');

  // 初始化测试
  useEffect(() => {
    if (!targetText) {
      initTest();
    }
  }, [targetText, initTest]);

  // 计时器逻辑
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, tick]);

  // 重新开始测试
  const restart = useCallback(() => {
    resetTest();
    inputValueRef.current = '';
  }, [resetTest]);

  // 更新设置
  const setDuration = useCallback(
    (duration: number) => {
      updateSettings({ duration });
    },
    [updateSettings]
  );

  const setMode = useCallback(
    (mode: 'english' | 'chinese' | 'coder') => {
      updateSettings({ mode });
    },
    [updateSettings]
  );

  const setDifficulty = useCallback(
    (difficulty: DifficultyLevel) => {
      updateSettings({ difficulty });
    },
    [updateSettings]
  );

  const setEnglishOptions = useCallback(
    (englishOptions: EnglishOptions) => {
      updateSettings({ englishOptions });
    },
    [updateSettings]
  );

  const setChineseStyle = useCallback(
    (chineseStyle: ChineseStyle) => {
      updateSettings({ chineseStyle });
    },
    [updateSettings]
  );

  const setProgrammingLanguage = useCallback(
    (programmingLanguage: ProgrammingLanguage) => {
      updateSettings({ programmingLanguage });
    },
    [updateSettings]
  );

  // Input change handler - 处理输入法确认后的输入
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 如果正在使用输入法，不处理 - 等待 compositionEnd
      if (isComposingRef.current) {
        return;
      }

      if (status === 'finished') return;

      const newValue = e.target.value;
      const oldValue = inputValueRef.current;

      // 计算新增的字符
      if (newValue.length > oldValue.length) {
        const newChars = newValue.slice(oldValue.length);

        // 逐个字符添加
        for (const char of newChars) {
          handleInput(char);
        }
      } else if (newValue.length < oldValue.length) {
        // 处理删除
        const deleteCount = oldValue.length - newValue.length;
        for (let i = 0; i < deleteCount; i++) {
          handleBackspace();
        }
      }

      inputValueRef.current = newValue;

      // 清空input以准备下一次输入
      e.target.value = '';
      inputValueRef.current = '';
    },
    [status, handleInput, handleBackspace]
  );

  // Composition event handlers
  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;

      if (status === 'finished') return;

      // 获取确认的文本（中文字符）
      const data = e.data;
      if (data) {
        // 逐个字符添加
        for (const char of data) {
          handleInput(char);
        }
      }

      // 清空input
      const target = e.target as HTMLInputElement;
      target.value = '';
      inputValueRef.current = '';
    },
    [status, handleInput]
  );

  // KeyDown handler - 处理特殊键
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 忽略输入法激活时的按键
      if (isComposingRef.current) return;

      if (status === 'finished') return;

      // 处理 Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        const target = e.target as HTMLInputElement;
        target.value = '';
        inputValueRef.current = '';
        return;
      }

      // 处理 Enter 换行（程序员模式）
      if (e.key === 'Enter' && settings.mode === 'coder') {
        e.preventDefault();
        handleInput('\n');
        const target = e.target as HTMLInputElement;
        target.value = '';
        inputValueRef.current = '';
        return;
      }
    },
    [status, settings.mode, handleBackspace, handleInput]
  );

  return {
    // 状态
    status,
    targetText,
    displayText,
    typedText,
    wpm,
    cpm,
    lpm,
    accuracy,
    timeLeft,
    errors,
    correctChars,
    wpmHistory,
    settings,

    // 方法
    restart,
    setDuration,
    setMode,
    setDifficulty,
    setEnglishOptions,
    setChineseStyle,
    setProgrammingLanguage,

    // Input 事件处理器
    inputHandlers: {
      onChange: handleInputChange,
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      onKeyDown: handleKeyDown,
    },
  };
}
