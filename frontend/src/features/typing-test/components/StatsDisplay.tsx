'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TypingMode } from '@/lib/constants';

interface StatsDisplayProps {
  mode: TypingMode;
  wpm: number;
  cpm: number;
  lpm: number;
  accuracy: number;
  timeLeft: number;
  status: 'idle' | 'running' | 'finished';
}

export function StatsDisplay({ mode, wpm, cpm, lpm, accuracy, timeLeft, status }: StatsDisplayProps) {
  // 根据模式决定显示哪些指标
  const getSpeedStats = () => {
    switch (mode) {
      case 'english':
        // 英文：显示 WPM 和 CPM
        return [
          { value: wpm, label: 'WPM', sublabel: '单词/分钟' },
          { value: cpm, label: 'CPM', sublabel: '字符/分钟' },
        ];
      case 'chinese':
        // 中文：只显示 CPM
        return [
          { value: cpm, label: 'CPM', sublabel: '字符/分钟' },
        ];
      case 'coder':
        // 代码：显示 LPM 和 CPM
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
    <div className="flex items-center justify-center gap-6 md:gap-12">
      {/* 速度指标 - 动态显示 */}
      {speedStats.map((stat, index) => (
        <div key={stat.label} className="text-center">
          <motion.div
            className="text-4xl md:text-6xl font-extrabold text-teal-400 tracking-tighter tabular-nums"
            key={stat.value}
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          <div className="text-xs text-gray-500">{stat.sublabel}</div>
        </div>
      ))}

      {/* 时间 */}
      <div className="text-center">
        <motion.div
          className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${timeLeft <= 10 && status === 'running' ? 'text-red-400' : 'text-white'
            }`}
          key={timeLeft}
          initial={timeLeft <= 10 ? { scale: 1.1 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {timeLeft}
        </motion.div>
        <div className="text-xs text-gray-400 mt-1">SEC</div>
        <div className="text-xs text-gray-500">秒</div>
      </div>

      {/* 准确率 */}
      <div className="text-center">
        <motion.div
          className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${accuracy < 90 ? 'text-yellow-400' : 'text-emerald-400'
            }`}
          key={accuracy}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {accuracy}
        </motion.div>
        <div className="text-xs text-gray-400 mt-1">ACC%</div>
        <div className="text-xs text-gray-500">准确率</div>
      </div>
    </div>
  );
}
