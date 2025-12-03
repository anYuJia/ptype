'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '@/features/typing-test/hooks/useTypingEngine';
import { TextDisplay } from '@/features/typing-test/components/TextDisplay';
import { StatsDisplay } from '@/features/typing-test/components/StatsDisplay';
import { ResultsCard } from '@/features/typing-test/components/ResultsCard';
import { SettingsPanel } from '@/features/settings/SettingsPanel';

export function TypingTest() {
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
    restart,
    setDuration,
    setMode,
    setDifficulty,
    setEnglishOptions,
    setChineseStyle,
    setProgrammingLanguage,
    setTypingOptions,
    inputHandlers,
  } = useTypingEngine();

  const inputRef = useRef<HTMLInputElement>(null);

  // 自动聚焦到隐藏的 input
  useEffect(() => {
    if (inputRef.current && status !== 'finished') {
      inputRef.current.focus();
    }
  }, [status]);

  // Tab + Enter 快捷键重新开始
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.getModifierState('Tab')) {
        e.preventDefault();
        restart();
        // 重新聚焦
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    },
    [restart]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* 头部 */}
      <header className="pt-8 pb-2 px-4 max-w-5xl mx-auto w-full">
        <motion.div
          className="flex items-center justify-start gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative w-20 h-20">
            <Image
              src="/logo.png"
              alt="PType Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-6xl font-bold text-teal-400 tracking-tight leading-none">
              PType
            </h1>
            <motion.p
              className="text-gray-500 text-lg mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Test your typing speed
            </motion.p>
          </div>
        </motion.div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-12 pb-8 flex flex-col gap-6">
        <div className="w-full">
          <AnimatePresence mode="wait">
            {status === 'finished' ? (
              <ResultsCard
                key="results"
                mode={settings.mode}
                difficulty={settings.difficulty}
                chineseStyle={settings.chineseStyle}
                programmingLanguage={settings.programmingLanguage}
                wpm={wpm}
                cpm={cpm}
                lpm={lpm}
                accuracy={accuracy}
                correctChars={correctChars}
                errors={errors}
                wpmHistory={wpmHistory}
                duration={settings.duration}
                onRestart={restart}
              />
            ) : (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* 设置面板 */}
                <SettingsPanel
                  duration={settings.duration}
                  mode={settings.mode}
                  difficulty={settings.difficulty}
                  chineseStyle={settings.chineseStyle}
                  programmingLanguage={settings.programmingLanguage}
                  englishOptions={settings.englishOptions}
                  typingOptions={settings.typingOptions}
                  status={status}
                  onDurationChange={setDuration}
                  onModeChange={setMode}
                  onDifficultyChange={setDifficulty}
                  onChineseStyleChange={setChineseStyle}
                  onProgrammingLanguageChange={setProgrammingLanguage}
                  onEnglishOptionsChange={setEnglishOptions}
                  onTypingOptionsChange={setTypingOptions}
                  onRestart={restart}
                  disabled={false}
                />

                {/* 统计显示 */}
                <StatsDisplay
                  mode={settings.mode}
                  wpm={wpm}
                  cpm={cpm}
                  lpm={lpm}
                  accuracy={accuracy}
                  timeLeft={timeLeft}
                  status={status}
                  actionButton={
                    status === 'running' ? (
                      <motion.button
                        onClick={restart}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        停止并重新开始
                      </motion.button>
                    ) : null
                  }
                />

                {/* 文本显示 - 包含输入框 */}
                <TextDisplay
                  targetText={targetText}
                  displayText={displayText}
                  typedText={typedText}
                  status={status}
                  mode={settings.mode}
                  inputRef={inputRef}
                  inputHandlers={inputHandlers}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-4 text-center text-gray-600 text-sm">
        <p>Built with Next.js, Tailwind CSS & Framer Motion</p>
      </footer>
    </div>
  );
}
