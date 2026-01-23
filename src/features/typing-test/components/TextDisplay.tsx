'use client';

import { memo, useMemo, useRef, useEffect, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '../store/typingStore';
import { normalizeSpecialChars } from '../utils/wpmCalculator';
import { getLinesView } from '../utils/lineUtils';

interface TextDisplayProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputHandlers: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCompositionStart: () => void;
    onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
}

// Single character component - Memoized
const Character = memo(function Character({
  char,
  status,
  isCurrent,
}: {
  char: string;
  status: 'pending' | 'correct' | 'incorrect' | 'current';
  isCurrent: boolean;
}) {
  const baseClass = 'inline-block transition-colors duration-100 relative';

  const statusClasses = {
    pending: 'text-gray-500',
    correct: 'text-emerald-400',
    incorrect: 'text-red-400',
    current: 'text-white',
  };

  // Handle special chars
  let displayChar = char;
  if (char === ' ') displayChar = '\u00A0';
  if (char === '\n') displayChar = '↵';
  if (char === '\t') displayChar = '→';

  const isSpecial = char === '\n' || char === '\t';
  const isSpace = char === ' ';

  const incorrectSpaceClass = (status === 'incorrect' && isSpace) ? 'bg-red-500/30' : '';

  return (
    <motion.span
      className={`${baseClass} ${statusClasses[status]} ${isSpecial ? 'opacity-50 font-bold' : ''} ${incorrectSpaceClass}`}
      initial={status === 'correct' ? { scale: 1.1 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayChar}
    </motion.span>
  );
});

import { useTranslations } from 'next-intl';

// ... 

export function TextDisplay({ inputRef, inputHandlers }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const cursorOverlayRef = useRef<HTMLDivElement>(null); // New ref for independent cursor
  const t = useTranslations('Common');
  const tSettings = useTranslations('Settings');

  // Removed cursorPosition state to prevent double-renders.
  // We now use direct DOM manipulation in useLayoutEffect.

  // 使用 selector 只订阅需要的状态
  const { displayText, typedText, status, mode, allLines } = useTypingStore(
    useShallow((state) => ({
      displayText: state.displayText,
      typedText: state.typedText,
      status: state.status,
      // 注意：mode 嵌套在 settings 中，直接获取可能会有问题如果 settings 更新
      // 但 store.settings 是一个对象，我们应该具体订阅
      mode: state.settings.mode,
      allLines: state.lines,
    }))
  );

  // 自动聚焦并定位input
  useEffect(() => {
    if (inputRef.current && status !== 'finished') {
      inputRef.current.focus();
    }
  }, [status, inputRef]);

  // Optimize cursor update: Direct DOM manipulation
  useLayoutEffect(() => {
    if (cursorRef.current && containerRef.current) {
      // Measure relative to the container usually, but here cursorRef is inside container.
      // We want the checks to be fast.
      const charEl = cursorRef.current;

      const left = charEl.offsetLeft;
      const top = charEl.offsetTop;
      const width = charEl.offsetWidth;
      const height = charEl.offsetHeight;

      // 1. Update Input Position (Invisible)
      if (inputRef.current) {
        inputRef.current.style.left = `${left}px`;
        inputRef.current.style.top = `${top}px`;
      }

      // 2. Update Visual Cursor Position (Direct transform)
      if (cursorOverlayRef.current) {
        cursorOverlayRef.current.style.display = 'block';
        cursorOverlayRef.current.style.transform = `translate(${left}px, ${top}px)`;
        cursorOverlayRef.current.style.width = `${width}px`;
        cursorOverlayRef.current.style.height = `${height}px`;
      }
    } else {
      // Hide cursor if no current char (e.g. finished?)
      if (cursorOverlayRef.current && status === 'finished') {
        cursorOverlayRef.current.style.display = 'none';
      }
    }
  }, [typedText, status]); // Re-run when text changes

  // 计算每个字符的状态 - 移除原有的大数组 map，改为渲染时计算
  // 保持 normalized 字符串缓存
  const normalizedDisplay = useMemo(() => {
    return normalizeSpecialChars(displayText).normalize('NFC');
  }, [displayText]);

  const normalizedTyped = useMemo(() => {
    return normalizeSpecialChars(typedText).normalize('NFC');
  }, [typedText]);

  // 1. 获取显示视图（每次输入变动时运行）- Light operation
  // allLines 已经在 store 中计算好了，直接使用
  const displayLines = useMemo(() => {
    return getLinesView(allLines, typedText.length);
  }, [allLines, typedText]);

  // 构建渲染列表
  const linesToRender = useMemo(() => {
    const lines = [];

    // 只有当 prevLine 有效且不与 currentLine 重叠（针对第一行的情况）时才添加
    if (displayLines.prevLineStart !== displayLines.currentLineStart) {
      lines.push({
        id: displayLines.prevLineStart,
        text: displayLines.prevLine,
        start: displayLines.prevLineStart,
        hasNewline: displayLines.prevLineHasNewline,
        type: 'prev' as const
      });
    }

    lines.push({
      id: displayLines.currentLineStart,
      text: displayLines.currentLine,
      start: displayLines.currentLineStart,
      hasNewline: displayLines.currentLineHasNewline,
      type: 'current' as const
    });

    // 只有当 nextLine 存在时才添加
    if (displayLines.nextLineStart > displayLines.currentLineStart) {
      lines.push({
        id: displayLines.nextLineStart,
        text: displayLines.nextLine,
        start: displayLines.nextLineStart,
        hasNewline: displayLines.nextLineHasNewline,
        type: 'next' as const
      });
    }

    return lines;
  }, [displayLines]);

  const renderLineContent = (lineText: string, startOffset: number, hasNewline: boolean) => {
    if (!lineText && !hasNewline) return <span className="inline-block w-full">&nbsp;</span>; // 保持空行高度

    // 注意：lineText 是原始文本，而我们需要显示 normalizedDisplay 对应的字符
    // 假设长度一致（normalizeSpecialChars 大多是 1:1 替换，除了省略号等少数情况）
    // 如果长度不一致，这里的逻辑会从 normalizedDisplay 取出对应的字符，保持对齐

    const chars = lineText.split('');
    const result = chars.map((_, i) => {
      const globalIndex = startOffset + i;

      // 直接获取 normalized 字符和状态
      // 如果超出 normalizedDisplay 范围（比如 TextDisplay logic bug），fallback 到 lineText char
      const displayChar = normalizedDisplay[globalIndex] ?? lineText[i];
      if (!displayChar) return null;

      let charStatus: 'pending' | 'correct' | 'incorrect' | 'current';

      if (globalIndex < normalizedTyped.length) {
        // 比较 normalized 的字符
        charStatus = normalizedTyped[globalIndex] === displayChar ? 'correct' : 'incorrect';
      } else if (globalIndex === normalizedTyped.length && status !== 'finished') {
        charStatus = 'current';
      } else {
        charStatus = 'pending';
      }

      const isCurrent = charStatus === 'current';

      return (
        <span key={globalIndex} ref={isCurrent ? cursorRef : null} className="relative inline-block">
          <Character
            char={displayChar}
            status={charStatus}
            isCurrent={isCurrent}
          />
        </span>
      );
    });

    if (hasNewline) {
      const newlineIndex = startOffset + chars.length;
      // 这里的 newline char 通常在 normalizedDisplay 也是 \n
      const newlineChar = normalizedDisplay[newlineIndex] ?? '\n';

      let newlineStatus: 'pending' | 'correct' | 'incorrect' | 'current';

      if (newlineIndex < normalizedTyped.length) {
        newlineStatus = normalizedTyped[newlineIndex] === newlineChar ? 'correct' : 'incorrect';
      } else if (newlineIndex === normalizedTyped.length && status !== 'finished') {
        newlineStatus = 'current';
      } else {
        newlineStatus = 'pending';
      }

      const isCurrent = newlineStatus === 'current';

      result.push(
        <span key={newlineIndex} ref={isCurrent ? cursorRef : null} className="relative inline-block">
          <Character
            char={newlineChar}
            status={newlineStatus}
            isCurrent={isCurrent}
          />
        </span>
      );
    }

    return result;
  };

  return (
    <div className="relative">
      {status === 'idle' && (
        <motion.div
          className="absolute -top-8 left-0 text-sm text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {t('startTyping')}
        </motion.div>
      )}

      <input
        ref={inputRef}
        type="text"
        aria-label="Typing Input"
        className="absolute opacity-0 pointer-events-auto caret-transparent"
        style={{
          position: 'absolute',
          left: 0, // Controlled by useLayoutEffect
          top: 0,  // Controlled by useLayoutEffect
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

      <div
        ref={containerRef}
        className={`
          relative
          flex flex-col gap-1
          font-mono leading-relaxed
          p-6 rounded-xl
          bg-gray-900/50 backdrop-blur-sm
          border border-gray-800
          select-none
          min-h-[160px] justify-center
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Optimized Visual Cursor - sibling to text to avoid per-character layout thrashing */}
        <div
          ref={cursorOverlayRef}
          className="absolute bg-teal-500/30 border-b-2 border-teal-400 transition-transform duration-100 ease-out will-change-transform z-0 rounded-sm pointer-events-none"
          style={{
            left: 0,
            top: 0,
            display: 'none' // Hidden until layout effect works
          }}
        />
        <AnimatePresence mode="popLayout" initial={false}>
          {linesToRender.map((line) => {
            const isCurrent = line.type === 'current';

            return (
              <motion.div
                key={`line-${line.id}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: isCurrent ? 1 : 0.5,
                  y: 0,
                  scale: isCurrent ? 1 : 0.9,
                  originX: 0
                }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1
                }}
                className={`w-full break-words ${isCurrent
                  ? (mode === 'coder' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl')
                  : 'text-base'
                  } min-h-[1.5em]`}
              >
                {renderLineContent(line.text, line.start, line.hasNewline)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-2 text-xs text-gray-600 text-center">
        {mode === 'coder' && tSettings('modeDescriptions.coder')}
        {mode === 'english' && tSettings('modeDescriptions.english')}
        {mode === 'chinese' && tSettings('modeDescriptions.chinese')}
      </div>
    </div>
  );
}
