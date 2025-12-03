'use client';

import { useEffect, useCallback, useRef } from 'react';
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
      <header className="py-6 px-4">
        <motion.h1
          className="text-2xl font-bold text-center text-teal-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          PType
        </motion.h1>
        <motion.p
          className="text-center text-gray-500 text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Test your typing speed
        </motion.p>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-4xl">
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
                  onDurationChange={setDuration}
                  onModeChange={setMode}
                  onDifficultyChange={setDifficulty}
                  onChineseStyleChange={setChineseStyle}
                  onProgrammingLanguageChange={setProgrammingLanguage}
                  onEnglishOptionsChange={setEnglishOptions}
                  disabled={false}
                />

                {/* 控制按钮 */}
                <div className="flex justify-center gap-4">
                  {status === 'running' && (
                    <motion.button
                      onClick={restart}
                      className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      停止并重新开始
                    </motion.button>
                  )}
                  {status === 'idle' && (
                    <motion.button
                      onClick={restart}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      重新生成文本
                    </motion.button>
                  )}
                </div>

                {/* 统计显示 */}
                <StatsDisplay
                  mode={settings.mode}
                  wpm={wpm}
                  cpm={cpm}
                  lpm={lpm}
                  accuracy={accuracy}
                  timeLeft={timeLeft}
                  status={status}
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

                {/* 重新开始提示 */}
                {status === 'running' && (
                  <motion.div
                    className="text-center text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Press{' '}
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Tab</kbd>{' '}
                    +{' '}
                    <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Enter</kbd>{' '}
                    to restart
                  </motion.div>
                )}
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
