'use client';

import { memo, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  isCurrent,
}: {
  char: string;
  status: 'pending' | 'correct' | 'incorrect' | 'current';
  index: number;
  isCurrent: boolean;
}) {
  const baseClass = 'inline-block transition-colors duration-100 relative';

  const statusClasses = {
    pending: 'text-gray-500',
    correct: 'text-emerald-400',  // 浅绿色 - 正确
    incorrect: 'text-red-400',     // 浅红色 - 错误
    current: 'text-white',
  };

  // 处理空格和换行显示
  let displayChar = char;
  if (char === ' ') displayChar = '\u00A0';
  if (char === '\n') displayChar = '↵'; // 显示换行符
  if (char === '\t') displayChar = '→'; // Tab 显示为箭头

  const isSpecial = char === '\n' || char === '\t';

  return (
    <motion.span
      className={`${baseClass} ${statusClasses[status]} ${isSpecial ? 'opacity-50 font-bold' : ''}`}
      initial={status === 'correct' ? { scale: 1.1 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {/* 平滑移动的光标背景 */}
      {isCurrent && (
        <motion.span
          layoutId="cursor-highlight"
          className="absolute inset-0 bg-teal-500/30 border-b-2 border-teal-400 -z-10"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      )}
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

    const result = normalizedDisplay.split('').map((char, index) => {
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

    return result;
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

      // 检查第一行后面是否有换行符（只要不是最后一行就有）
      const line1HasNewline = currentLineIndex < lines.length - 1;

      const result = {
        line1,
        line2,
        line1Start,
        line2Start: line1Start + line1.length + (line1HasNewline ? 1 : 0),
        line1HasNewline,
      };

      return result;
    } else {
      // 英文和中文模式：两行滚动显示，单词不截断 - 使用 displayText
      // 1. 生成单词数组，保留换行符
      let words: string[] = [];
      if (mode === 'english') {
        // 英文模式：按换行符分割，再按空格分割，保留换行符作为独立项
        const lines = displayText.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].length > 0) {
            words.push(...lines[i].split(' '));
          }
          // 如果不是最后一行，添加换行符
          if (i < lines.length - 1) {
            words.push('\n');
          }
        }
      } else {
        // 中文模式：按字符分割
        words = displayText.split('');
      }

      const separator = mode === 'english' ? ' ' : '';
      const maxCharsPerLine = mode === 'english' ? 55 : 35;

      // 将所有单词分成多行（每行不超过最大字符数）
      const allLines: { text: string; startIndex: number; hasNewline: boolean }[] = [];
      let currentLine: string[] = [];
      let currentLineLength = 0;
      let charIndex = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // 处理换行符 (所有模式)
        if (word === '\n') {
          // 保存当前行，并标记有换行符
          const lineStartIndex = charIndex - currentLineLength;
          allLines.push({
            text: currentLine.join(separator),
            startIndex: lineStartIndex,
            hasNewline: true
          });

          // 重置当前行
          currentLine = [];
          currentLineLength = 0;
          charIndex += 1; // 换行符占一个字符位置
          continue;
        }

        // 计算单词长度（包含分隔符）
        // 英文模式下，如果下一个词是换行符，或者这是最后一个词，就不加空格
        const nextWord = words[i + 1];
        const shouldAddSeparator = mode === 'english' && nextWord !== '\n' && i < words.length - 1;
        const wordWithSeparator = word + (shouldAddSeparator ? separator : '');
        const wordLength = wordWithSeparator.length;

        // 检查是否需要自动换行（长度限制）
        if (currentLine.length > 0 && currentLineLength + wordLength > maxCharsPerLine) {
          // 保存当前行
          const lineStartIndex = charIndex - currentLineLength;
          allLines.push({
            text: currentLine.join(separator),
            startIndex: lineStartIndex,
            hasNewline: false // 自动换行，没有硬换行符
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
          startIndex: lineStartIndex,
          hasNewline: false
        });
      }

      // 找到当前输入位置所在的行
      let currentLineIndex = 0;
      for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];
        // 行结束位置 = 下一行的开始位置，如果不存在下一行，则为当前行的结束位置
        const nextLine = allLines[i + 1];
        const lineEndIndex = nextLine ? nextLine.startIndex : (line.startIndex + line.text.length + (line.hasNewline ? 1 : 0));

        if (typedText.length < lineEndIndex) {
          currentLineIndex = i;
          break;
        }
      }

      // 返回当前行和下一行
      const line1 = allLines[currentLineIndex] || { text: '', startIndex: 0, hasNewline: false };
      const line2 = allLines[currentLineIndex + 1] || { text: '', startIndex: 0, hasNewline: false }; // startIndex will be calculated if needed, but usually we just render text

      // 修正 line2Start 的计算，如果 line2 不存在，或者我们需要根据 line1 推算
      const line2Start = line2.text ? line2.startIndex : (line1.startIndex + line1.text.length + (line1.hasNewline ? 1 : 0) + (mode === 'english' && !line1.hasNewline ? 1 : 0));

      return {
        line1: line1.text,
        line2: line2.text,
        line1Start: line1.startIndex,
        line2Start: line2Start, // 使用实际计算出的 startIndex
        line1HasNewline: line1.hasNewline,
      };
    }
  }, [displayText, typedText, mode]);

  // 为两行中的每个字符添加状态
  const renderLine = (lineText: string, startOffset: number, hasNewline: boolean = false) => {
    const chars = lineText.split('');
    const result = chars.map((char, i) => {
      const globalIndex = startOffset + i;
      const charData = characters[globalIndex];
      if (!charData) return null;

      const isCurrent = charData.status === 'current';

      return (
        <span key={globalIndex} ref={isCurrent ? cursorRef : null} className="relative inline-block">
          <Character
            char={charData.char}
            status={charData.status}
            index={globalIndex}
            isCurrent={isCurrent}
          />
        </span>
      );
    });

    // 如果这一行后面有换行符，也要渲染它 (支持所有模式)
    if (hasNewline) {
      const newlineIndex = startOffset + chars.length;
      const newlineData = characters[newlineIndex];

      if (newlineData) {
        const isCurrent = newlineData.status === 'current';
        result.push(
          <span key={newlineIndex} ref={isCurrent ? cursorRef : null} className="relative inline-block">
            <Character
              char={newlineData.char}
              status={newlineData.status}
              index={newlineIndex}
              isCurrent={isCurrent}
            />
          </span>
        );
      }
    }

    return result;
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
          flex flex-col gap-2
          font-mono leading-relaxed
          p-6 rounded-xl
          bg-gray-900/50 backdrop-blur-sm
          border border-gray-800
          select-none
          ${mode === 'coder' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence mode="popLayout">
          {/* 第一行 */}
          <motion.div
            key={`line1-${displayLines.line1Start}`}
            className="min-h-[2.5rem] w-full break-words"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderLine(displayLines.line1, displayLines.line1Start, displayLines.line1HasNewline || false)}
          </motion.div>

          {/* 第二行 */}
          <motion.div
            key={`line2-${displayLines.line2Start}`}
            className="min-h-[2.5rem] w-full break-words text-gray-500"
            initial={{ y: 20, opacity: 0.3 }}
            animate={{ y: 0, opacity: 0.7 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderLine(displayLines.line2, displayLines.line2Start, false)}
          </motion.div>
        </AnimatePresence>
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
