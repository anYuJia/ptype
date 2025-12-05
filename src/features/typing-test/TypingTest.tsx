'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEngine } from '@/features/typing-test/hooks/useTypingEngine';
import { TextDisplay } from '@/features/typing-test/components/TextDisplay';
import { StatsDisplay } from '@/features/typing-test/components/StatsDisplay';
import { ResultsCard } from '@/features/typing-test/components/ResultsCard';
import { useAuthStore } from '@/features/auth/store/authStore';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { SettingsPanel } from '@/features/settings/SettingsPanel';
import { Leaderboard } from '@/features/leaderboard/components/Leaderboard';
import { History } from '@/features/history/components/History';
import { Profile } from '@/features/profile/components/Profile';

export function TypingTest() {
  const { openAuthModal, user, isAuthenticated, logout } = useAuthStore();
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

  // Title typing animation
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const targetTitle = 'PType';
    let currentIndex = 0;

    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < targetTitle.length) {
          setDisplayedTitle(targetTitle.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setShowCursor(false);
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startTimeout);
  }, []);

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

  // Save result when test finishes
  const savedRef = useRef(false);
  useEffect(() => {
    if (status === 'running') {
      savedRef.current = false;
    } else if (status === 'finished' && !savedRef.current && isAuthenticated && user) {
      const saveResult = async () => {
        try {
          console.log('Saving result from TypingTest...');
          const res = await fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              wpm,
              accuracy,
              mode: settings.mode,
              subMode: settings.mode === 'chinese' ? settings.chineseStyle : settings.mode === 'coder' ? settings.programmingLanguage : null,
              difficulty: settings.difficulty,
              duration: settings.duration,
            }),
          });

          if (res.ok) {
            console.log('Result saved successfully');
            savedRef.current = true;
          } else {
            console.error('Failed to save result:', await res.text());
          }
        } catch (error) {
          console.error('Failed to save result:', error);
        }
      };
      saveResult();
    }
  }, [status, isAuthenticated, user, wpm, accuracy, settings]);

  // Tab state
  const [activeTab, setActiveTab] = useState<'practice' | 'leaderboard' | 'history' | 'profile'>('practice');

  const tabs = [
    { id: 'practice', label: '练习' },
    { id: 'leaderboard', label: '排行' },
    { id: 'history', label: '历史' },
    { id: 'profile', label: '我的' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* 头部 */}
      <header className="pt-8 pb-2 px-4 max-w-6xl mx-auto w-full">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Logo & Title */}
          <div className="flex items-center gap-4 w-[240px]">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.png"
                alt="PType Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-teal-400 tracking-tight leading-none min-h-[40px] flex items-center">
                {displayedTitle}
                {showCursor && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block ml-1 -translate-y-0.5"
                  >
                    |
                  </motion.span>
                )}
              </h1>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-8 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative py-2 text-base font-medium transition-colors duration-300
                  ${activeTab === tab.id ? 'text-teal-400' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* User & Actions */}
          <div className="flex items-center justify-end gap-6 w-[240px]">
            <motion.a
              href="https://github.com/anYuJia/ptype/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              title="View on GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-gray-900/30 transition-colors cursor-default"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-gray-950 font-bold text-sm shadow-lg shadow-teal-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </motion.div>
                  <span className="text-sm font-semibold text-gray-200">{user.username}</span>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  退出
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    openAuthModal('login', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  登录
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-400 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    openAuthModal('register', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  注册
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-400 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-12 pb-8 flex flex-col gap-6">
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'practice' ? (
              status === 'finished' ? (
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
              )
            ) : activeTab === 'leaderboard' ? (
              <Leaderboard key="leaderboard" />
            ) : activeTab === 'history' ? (
              <History key="history" />
            ) : activeTab === 'profile' ? (
              <Profile key="profile" />
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-gray-500"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-900/50 flex items-center justify-center">
                  <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  {tabs.find(t => t.id === activeTab)?.label} 模块开发中
                </h3>
                <p className="text-sm">敬请期待更多精彩功能</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-4 text-center text-gray-600 text-sm">
        <p>由 Next.js, Tailwind CSS & Framer Motion 驱动</p>
      </footer>
      <AuthModal />
    </div>
  );
}
