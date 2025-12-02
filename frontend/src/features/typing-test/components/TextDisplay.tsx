'use client';

import { memo, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { normalizeSpecialChars } from '../utils/wpmCalculator';

interface TextDisplayProps {
  targetText: string;
  displayText: string; // 处理后的文本（用于显示和比较）
  typedText: string;
  status: 'idle' | 'running' | 'finished';
  mode: 'english' | 'chinese' | 'coder';
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputHandlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCompositionStart: () => void;
    onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };
}

// 单个字符组件
const Character = memo(function Character({
  char,
  status,
  index,
}: {
  char: string;
  status: 'pending' | 'correct' | 'incorrect' | 'current';
  index: number;
}) {
  const baseClass = 'inline-block transition-colors duration-100';

  const statusClasses = {
    pending: 'text-gray-500',
    correct: 'text-emerald-400',  // 浅绿色 - 正确
    incorrect: 'text-red-400',     // 浅红色 - 错误
    current: 'text-white bg-teal-500/30 border-b-2 border-teal-400',
  };

  // 处理空格和换行显示
  let displayChar = char;
  if (char === ' ') displayChar = '\u00A0';
  if (char === '\n') displayChar = '↵'; // 程序员模式显示换行符

  return (
    <motion.span
      className={`${baseClass} ${statusClasses[status]}`}
      initial={status === 'correct' ? { scale: 1.1 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayChar}
    </motion.span>
  );
});

export function TextDisplay({ targetText, displayText, typedText, status, mode, inputRef, inputHandlers }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // 自动聚焦并定位input
  useEffect(() => {
    if (inputRef.current && status !== 'finished') {
      inputRef.current.focus();
    }
  }, [status, inputRef]);

  // 计算每个字符的状态 - 使用 displayText 进行比较
  const characters = useMemo(() => {
    // 1. 特殊字符标准化 - 确保符号正确匹配
    let normalizedDisplay = normalizeSpecialChars(displayText);
    let normalizedTyped = normalizeSpecialChars(typedText);

    // 2. Unicode 标准化 - 确保中文字符比较正确
    normalizedDisplay = normalizedDisplay.normalize('NFC');
    normalizedTyped = normalizedTyped.normalize('NFC');

    return normalizedDisplay.split('').map((char, index) => {
      let charStatus: 'pending' | 'correct' | 'incorrect' | 'current';

      if (index < normalizedTyped.length) {
        // 已输入的字符
        charStatus = normalizedTyped[index] === char ? 'correct' : 'incorrect';
      } else if (index === normalizedTyped.length && status !== 'finished') {
        // 当前待输入的字符
        charStatus = 'current';
      } else {
        // 未输入的字符
        charStatus = 'pending';
      }

      return { char, status: charStatus, index };
    });
  }, [displayText, typedText, status]);

  // 计算当前应该显示的两行内容（优化版：真正的两行滚动）
  const displayLines = useMemo(() => {
    if (mode === 'coder') {
      // 程序员模式：显示两行代码 - 使用 displayText
      const lines = displayText.split('\n');
      let charCount = 0;
      let currentLineIndex = 0;

      // 找到当前输入位置所在的行
      for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0); // +1 for \n

        if (charCount + lineLength > typedText.length) {
          currentLineIndex = i;
          break;
        }
        charCount += lineLength;
      }

      // 显示当前行和下一行
      const line1 = lines[currentLineIndex] || '';
      const line2 = lines[currentLineIndex + 1] || '';

      let line1Start = 0;
      for (let i = 0; i < currentLineIndex; i++) {
        line1Start += lines[i].length + 1; // +1 for \n

      }

      return {
        line1,
        line2,
        line1Start,
        line2Start: line1Start + line1.length + (line2 ? 1 : 0)
      };
    } else {
      // 英文和中文模式：两行滚动显示，单词不截断 - 使用 displayText
      const words = mode === 'english' ? displayText.split(' ') : displayText.split('');
      const separator = mode === 'english' ? ' ' : '';
      const maxCharsPerLine = mode === 'english' ? 55 : 35;

      // 将所有单词分成多行（每行不超过最大字符数）
      const allLines: { text: string; startIndex: number }[] = [];
      let currentLine: string[] = [];
      let currentLineLength = 0;
      let charIndex = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWithSeparator = word + (mode === 'english' && i < words.length - 1 ? ' ' : '');
        const wordLength = wordWithSeparator.length;

        // 检查是否需要换行
        if (currentLine.length > 0 && currentLineLength + wordLength > maxCharsPerLine) {
          // 保存当前行
          const lineStartIndex = charIndex - currentLineLength;
          allLines.push({
            text: currentLine.join(separator),
            startIndex: lineStartIndex
          });

          // 开始新行
          currentLine = [word];
          currentLineLength = wordLength;
        } else {
          // 继续当前行
          currentLine.push(word);
          currentLineLength += wordLength;
        }

        charIndex += wordLength;
      }

      // 添加最后一行
      if (currentLine.length > 0) {
        const lineStartIndex = charIndex - currentLineLength;
        allLines.push({
          text: currentLine.join(separator),
          startIndex: lineStartIndex
        });
      }

      // 找到当前输入位置所在的行
      let currentLineIndex = 0;
      for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];
        const lineEndIndex = line.startIndex + line.text.length + (mode === 'english' && i < allLines.length - 1 ? 1 : 0);

        if (typedText.length < lineEndIndex) {
          currentLineIndex = i;
          break;
        }
      }

      // 返回当前行和下一行
      const line1 = allLines[currentLineIndex] || { text: '', startIndex: 0 };
      const line2 = allLines[currentLineIndex + 1] || { text: '', startIndex: line1.startIndex + line1.text.length + (mode === 'english' ? 1 : 0) };

      return {
        line1: line1.text,
        line2: line2.text,
        line1Start: line1.startIndex,
        line2Start: line2.startIndex,
      };
    }
  }, [displayText, typedText, mode]);

  // 为两行中的每个字符添加状态
  const renderLine = (lineText: string, startOffset: number) => {
    return lineText.split('').map((char, i) => {
      const globalIndex = startOffset + i;
      const charData = characters[globalIndex];
      if (!charData) return null;

      // 如果是当前字符，添加ref用于定位input
      const isCurrent = charData.status === 'current';

      return (
        <span key={globalIndex} ref={isCurrent ? cursorRef : null} className="relative inline-block">
          <Character
            char={char}
            status={charData.status}
            index={globalIndex}
          />
        </span>
      );
    });
  };

  return (
    <div className="relative">
      {/* 提示文字 */}
      {status === 'idle' && (
        <motion.div
          className="absolute -top-8 left-0 text-sm text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          开始输入以开始测试...
        </motion.div>
      )}

      {/* 隐藏input - 定位在当前光标处 */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-auto caret-transparent"
        style={{
          position: 'absolute',
          left: cursorRef.current?.offsetLeft || 0,
          top: cursorRef.current?.offsetTop || 0,
          width: '1px',
          height: '1em',
          zIndex: 10,
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...inputHandlers}
      />

      {/* 文本显示区域 - 固定两行 */}
      <div
        ref={containerRef}
        className={`
          relative
          font-mono leading-relaxed
          p-6 rounded-xl
          bg-gray-900/50 backdrop-blur-sm
          border border-gray-800
          select-none
          ${mode === 'coder' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* 第一行 */}
        <div className="min-h-[2.5rem] mb-2">
          {renderLine(displayLines.line1, displayLines.line1Start)}
        </div>

        {/* 第二行 */}
        <div className="min-h-[2.5rem] text-gray-500">
          {renderLine(displayLines.line2, displayLines.line2Start)}
        </div>
      </div>

      {/* 模式提示 */}
      <div className="mt-2 text-xs text-gray-600 text-center">
        {mode === 'coder' && '程序员模式：每行是一行代码'}
        {mode === 'english' && '英文模式：单词不会被截断'}
        {mode === 'chinese' && '中文模式'}
      </div>
    </div>
  );
}
