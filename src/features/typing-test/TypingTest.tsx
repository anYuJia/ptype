'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '@/features/typing-test/store/typingStore';
import { TextDisplay } from '@/features/typing-test/components/TextDisplay';
import { StatsDisplay } from '@/features/typing-test/components/StatsDisplay';
import { Header } from '@/features/typing-test/components/Header';
import { useAuthStore } from '@/features/auth/store/authStore';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { SettingsPanel } from '@/features/settings/SettingsPanel';
import { useTypingEngine } from '@/features/typing-test/hooks/useTypingEngine';
import { saveTypingResult } from '@/features/history/actions';
import { sign } from '@/lib/security';
import { useTranslations } from 'next-intl';


// Lazy Load Heavy Components to optimize initial render and bundle size
const ResultsCard = dynamic(() => import('@/features/typing-test/components/ResultsCard').then(mod => mod.ResultsCard), {
  loading: () => <TabLoading />,
});

const Leaderboard = dynamic(() => import('@/features/leaderboard/components/Leaderboard').then(mod => mod.Leaderboard), {
  loading: () => <TabLoading />,
});

const History = dynamic(() => import('@/features/history/components/History').then(mod => mod.History), {
  loading: () => <TabLoading />,
});

const Profile = dynamic(() => import('@/features/profile/components/Profile').then(mod => mod.Profile), {
  loading: () => <TabLoading />,
});

// Loading Skeleton/Spinner for Tabs
function TabLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-gray-800 border-t-teal-500 rounded-full animate-spin" />
    </div>
  );
}

export function TypingTest() {
  const { openAuthModal, user, isAuthenticated, logout } = useAuthStore();

  // 只获取必要的 action 和 状态
  // status 用于切换视图
  // inputHandlers 用于 TextDisplay 输入控制 (保留 useTypingEngine hook 来处理复杂的输入逻辑)
  const { restart, inputHandlers } = useTypingEngine();

  // 使用 shallow selector 订阅 status，避免频繁重绘
  const status = useTypingStore(useShallow(state => state.status));

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

  // Save result when test finishes
  // 使用 subscribe 避免在 render 中依赖经常变化的 wpm 等状态
  const savedRef = useRef(false);
  useEffect(() => {
    // 重置 saved 标志
    if (status === 'running') {
      savedRef.current = false;
    }

    // 订阅 store 变化以检测完成时刻并保存
    const unsubscribe = useTypingStore.subscribe((state) => {
      // 当状态从 !finished 变为 finished 时 (或者就在 finished 状态且还没保存)
      if (state.status === 'finished' && !savedRef.current) {
        // 检查用户是否登录
        // 注意：这里需要从闭包中获取 isAuthenticated 和 user，或者直接从 AuthStore 获取
        // 由于 AuthStore 是外部 store，我们可以直接用 useAuthStore.getState()
        const { user, isAuthenticated } = useAuthStore.getState();

        if (isAuthenticated && user) {
          savedRef.current = true;
          const { cpm, accuracy, settings } = state;

          const saveResult = async () => {
            try {
              console.log('Saving result from TypingTest...');

              const resultData = {
                cpm, // Store CPM for ALL modes (Source of truth)
                accuracy,
                mode: settings.mode,
                subMode: settings.mode === 'chinese' ? settings.chineseStyle : settings.mode === 'coder' ? settings.programmingLanguage : null,
                difficulty: settings.difficulty,
                duration: settings.duration,
              };

              // 生成请求签名
              const signature = await sign(resultData);

              const res = await saveTypingResult(resultData, signature);

              if (res.success) {
                console.log('Result saved successfully');
              } else {
                console.error('Failed to save result:', res.error);
              }
            } catch (error) {
              console.error('Failed to save result:', error);
            }
          };
          saveResult();
        }
      }
    });

    return unsubscribe;
  }, [status]); // status 依赖主要是为了重置 savedRef

  // Tab state
  const [activeTab, setActiveTab] = useState<'practice' | 'leaderboard' | 'history' | 'profile'>('practice');

  // i18n
  const t = useTranslations('Navigation');

  const tabs = [
    { id: 'practice', label: t('practice') },
    { id: 'leaderboard', label: t('leaderboard') },
    { id: 'history', label: t('history') },
    { id: 'profile', label: t('profile') },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* 头部 */}
      {/* 头部 - 使用新组件 */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* 主内容区 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-12 pb-8 flex flex-col gap-6">
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'practice' ? (
              status === 'finished' ? (
                <ResultsCard key="results" />
              ) : (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* 设置面板 - 不再需要 props */}
                  <SettingsPanel />

                  {/* 统计显示 - 传入 actionButton，其他自动获取 */}
                  <StatsDisplay
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
      <AuthModal />
    </div>
  );
}
