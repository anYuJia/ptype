'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useTypingStore } from '../store/typingStore'
import { useSoundEffects } from './useSoundEffects'
import {
  DifficultyLevel,
  EnglishOptions,
  ChineseStyle,
  ProgrammingLanguage,
  TypingOptions,
} from '@/lib/constants'
import {
  getIndentToConsume,
  getLeadingWhitespace,
} from '../utils/codeHelpers'

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
    cpmHistory,
    settings,
    initTest,
    startTest, // 添加 startTest
    handleInput,
    handleBackspace,
    tick,
    resetTest,
    updateSettings,
  } = useTypingStore()

  const { playClick, playSpace, playEnter, playBackspace } = useSoundEffects()

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isComposingRef = useRef(false)
  const inputValueRef = useRef('')

  // 初始化测试
  useEffect(() => {
    if (!targetText) {
      initTest()
    }
  }, [targetText, initTest])

  // 计时器逻辑
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        tick()
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [status, tick])

  // 重新开始测试
  const restart = useCallback(() => {
    resetTest()
    inputValueRef.current = ''
  }, [resetTest])

  // 更新设置
  const setDuration = useCallback(
    (duration: number) => {
      updateSettings({ duration })
    },
    [updateSettings]
  )

  const setMode = useCallback(
    (mode: 'english' | 'chinese' | 'coder') => {
      updateSettings({ mode })
    },
    [updateSettings]
  )

  const setDifficulty = useCallback(
    (difficulty: DifficultyLevel) => {
      updateSettings({ difficulty })
    },
    [updateSettings]
  )

  const setEnglishOptions = useCallback(
    (englishOptions: EnglishOptions) => {
      updateSettings({ englishOptions })
    },
    [updateSettings]
  )

  const setChineseStyle = useCallback(
    (chineseStyle: ChineseStyle) => {
      updateSettings({ chineseStyle })
    },
    [updateSettings]
  )

  const setProgrammingLanguage = useCallback(
    (programmingLanguage: ProgrammingLanguage) => {
      updateSettings({ programmingLanguage })
    },
    [updateSettings]
  )

  const setTypingOptions = useCallback(
    (typingOptions: TypingOptions) => {
      updateSettings({ typingOptions })
    },
    [updateSettings]
  )

  // Input change handler - 处理输入法确认后的输入
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 如果正在使用输入法，不处理 - 等待 compositionEnd
      if (isComposingRef.current) {
        return
      }

      if (status === 'finished') return

      const newValue = e.target.value
      const oldValue = inputValueRef.current

      // 如果两个值都是空，说明是在 handleKeyDown 中清空的，不需要处理
      if (newValue === '' && oldValue === '') {
        return
      }

      // 计算新增的字符
      if (newValue.length > oldValue.length) {
        const newChars = newValue.slice(oldValue.length)

        // 逐个字符添加
        for (const char of newChars) {
          if (char === ' ') playSpace()
          else if (char === '\n') playEnter()
          else playClick()
          handleInput(char)
        }
      } else if (newValue.length < oldValue.length) {
        // 处理删除
        const deleteCount = oldValue.length - newValue.length
        for (let i = 0; i < deleteCount; i++) {
          playBackspace()
          handleBackspace()
        }
      }

      inputValueRef.current = newValue

      // 清空input以准备下一次输入
      e.target.value = ''
      inputValueRef.current = ''
    },
    [status, handleInput, handleBackspace]
  )

  // Composition event handlers
  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true
    // 中文输入法开始时就开始计时
    if (status === 'idle') {
      startTest()
    }
  }, [status, startTest])

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false

      if (status === 'finished') return

      // 获取确认的文本（中文字符）
      const data = e.data
      if (data) {
        // 逐个字符添加
        for (const char of data) {
          // 中文输入一般当作普通点击，或者 specialized sound?
          // 暂时统一用 click，空格可能会比较少见
          playClick()
          handleInput(char)
        }
      }

      // 清空input
      const target = e.target as HTMLInputElement
      target.value = ''
      inputValueRef.current = ''
    },
    [status, handleInput]
  )

  // KeyDown handler - 处理特殊键
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 忽略输入法激活时的按键
      // 特殊处理：如果按的是 Enter，且原生状态显示不在 composing，说明我们的 ref 状态可能滞后，允许通过
      if (isComposingRef.current) {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
          // 允许通过
        } else {
          return
        }
      }

      if (status === 'finished') return

      // 处理 Tab 键
      if (e.key === 'Tab') {
        e.preventDefault()
        // 智能 Tab：消耗目标文本中的连续空格/制表符
        const indent = getIndentToConsume(displayText, typedText.length, 2)
        if (indent) {
          for (const char of indent) {
            playSpace()
            handleInput(char)
          }
        } else {
          // 如果目标不是缩进，则按默认插入空格（仅代码模式支持默认插入）
          if (settings.mode === 'coder') {
            playSpace(); playSpace()
            handleInput(' '); handleInput(' ')
          }
        }
        
        const target = e.target as HTMLInputElement
        target.value = ''; inputValueRef.current = ''
        return
      }

      // 处理 Backspace
      if (e.key === 'Backspace') {
        e.preventDefault()
        playBackspace()
        handleBackspace()
        const target = e.target as HTMLInputElement
        target.value = ''; inputValueRef.current = ''
        return
      }

      // 处理 Enter 换行
      if (e.key === 'Enter') {
        e.preventDefault()
        playEnter()
        handleInput('\n')
        
        // 智能 Enter：自动根据目标文本进行下一行缩进对齐 (所有模式适用)
        const targetIndent = getLeadingWhitespace(displayText, typedText.length + 1)
        if (targetIndent) {
          for (const char of targetIndent) {
            playSpace()
            handleInput(char)
          }
        }
        
        const target = e.target as HTMLInputElement
        target.value = ''; inputValueRef.current = ''
        return
      }
    },
    [status, settings.mode, handleBackspace, handleInput, displayText, typedText]
  )

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
    cpmHistory,
    settings,

    // 方法
    restart,
    setDuration,
    setMode,
    setDifficulty,
    setEnglishOptions,
    setChineseStyle,
    setProgrammingLanguage,
    setTypingOptions,

    // Input 事件处理器
    inputHandlers: {
      onChange: handleInputChange,
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      onKeyDown: handleKeyDown,
    },
  }
}
