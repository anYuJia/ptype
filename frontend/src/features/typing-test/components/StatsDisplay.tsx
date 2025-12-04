'use client';

import { TypingMode } from '@/lib/constants';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedNumber } from './AnimatedNumber';

interface StatsDisplayProps {
  mode: TypingMode;
  wpm: number;
  cpm: number;
  lpm: number;
  accuracy: number;
  timeLeft: number;
  status: 'idle' | 'running' | 'finished';
  actionButton?: ReactNode; // 可选的右侧按钮
}

// 定义一个统一的、平滑的缓动动画，用于所有相关的动画效果
const transition = {
  duration: 0.4,
  ease: 'easeInOut' as const,
};

export function StatsDisplay({ mode, wpm, cpm, lpm, accuracy, timeLeft, status, actionButton }: StatsDisplayProps) {
  // 根据模式决定显示哪些指标
  const getSpeedStats = () => {
    switch (mode) {
      case 'english':
        return [
          { value: wpm, label: 'WPM', sublabel: '单词/分钟' },
          { value: cpm, label: 'CPM', sublabel: '字符/分钟' },
        ];
      case 'chinese':
        return [{ value: cpm, label: 'CPM', sublabel: '字符/分钟' }];
      case 'coder':
        return [
          { value: lpm, label: 'LPM', sublabel: '行/分钟' },
          { value: cpm, label: 'CPM', sublabel: '字符/分钟' },
        ];
      default:
        return [{ value: wpm, label: 'WPM', sublabel: '单词/分钟' }];
    }
  };

  const speedStats = getSpeedStats();

  return (
    <div className="flex items-center justify-between gap-4">
      <motion.div
        layout
        transition={transition}
        className="flex items-center justify-center gap-6 md:gap-12 flex-1"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {speedStats.map((stat) => (
            <motion.div
              layout
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <AnimatedNumber
                value={stat.value}
                className="text-4xl md:text-6xl font-extrabold text-teal-400 tracking-tighter tabular-nums"
              />
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div layout transition={transition} className="text-center">
          <AnimatedNumber
            value={timeLeft}
            className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${timeLeft <= 10 && status === 'running' ? 'text-red-400' : 'text-white'
              }`}
          />
          <div className="text-xs text-gray-400 mt-1">SEC</div>
          <div className="text-xs text-gray-500">秒</div>
        </motion.div>

        <motion.div layout transition={transition} className="text-center">
          <AnimatedNumber
            value={accuracy}
            className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${accuracy < 90 ? 'text-yellow-400' : 'text-emerald-400'
              }`}
          />
          <div className="text-xs text-gray-400 mt-1">ACC%</div>
          <div className="text-xs text-gray-500">准确率</div>
        </motion.div>
      </motion.div>

      {actionButton && <div className="flex items-end pb-2">{actionButton}</div>}
    </div>
  );
}