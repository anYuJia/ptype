'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { WpmChart } from './WpmChart';
import { WpmHistoryPoint } from '../store/typingStore';
import { TypingMode, DifficultyLevel, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';

interface ResultsCardProps {
  mode: TypingMode;
  difficulty: DifficultyLevel;
  chineseStyle?: ChineseStyle;
  programmingLanguage?: ProgrammingLanguage;
  wpm: number;
  cpm: number;
  lpm: number;
  accuracy: number;
  correctChars: number;
  errors: number;
  wpmHistory: WpmHistoryPoint[];
  duration: number;
  onRestart: () => void;
}

export function ResultsCard({
  mode,
  difficulty,
  chineseStyle,
  programmingLanguage,
  wpm,
  cpm,
  lpm,
  accuracy,
  correctChars,
  errors,
  wpmHistory,
  duration,
  onRestart,
}: ResultsCardProps) {
  // 根据模式决定显示哪些速度指标
  const getSpeedStats = () => {
    switch (mode) {
      case 'english':
        return [
          { value: wpm, label: 'WPM', sublabel: '单词/分钟', color: 'text-teal-400' },
          { value: cpm, label: 'CPM', sublabel: '字符/分钟', color: 'text-cyan-400' },
        ];
      case 'chinese':
        return [
          { value: cpm, label: 'CPM', sublabel: '字符/分钟', color: 'text-teal-400' },
        ];
      case 'coder':
        return [
          { value: lpm, label: 'LPM', sublabel: '行/分钟', color: 'text-teal-400' },
          { value: cpm, label: 'CPM', sublabel: '字符/分钟', color: 'text-cyan-400' },
        ];
      default:
        return [{ value: wpm, label: 'WPM', sublabel: '单词/分钟', color: 'text-teal-400' }];
    }
  };

  const speedStats = getSpeedStats();

  // 获取模式显示文本
  const getModeLabel = () => {
    switch (mode) {
      case 'english':
        return 'English';
      case 'chinese':
        return `Chinese (${chineseStyle === 'modern' ? '现代文' : '古文'})`;
      case 'coder':
        return `Coder (${programmingLanguage})`;
      default:
        return mode;
    }
  };

  return (
    <motion.div
      className="
        bg-gray-900/80 backdrop-blur-lg
        border border-gray-700/50
        rounded-2xl p-8
        shadow-2xl shadow-teal-500/10
        max-w-2xl mx-auto
      "
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        测试完成！
      </motion.h2>

      {/* 测试详情 */}
      <motion.div
        className="flex justify-center gap-3 mb-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
          {getModeLabel()}
        </span>
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 capitalize">
          {difficulty}
        </span>
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
          {duration}s
        </span>
      </motion.div>

      {/* 主要统计 - 单行显示 */}
      <div className="flex items-center justify-center gap-8 md:gap-12 mb-8 flex-wrap">
        {/* 速度指标 - 根据模式显示 */}
        {speedStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className={`text-5xl md:text-6xl font-extrabold ${stat.color} tabular-nums`}>{stat.value}</div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.sublabel}</div>
          </motion.div>
        ))}

        {/* 准确率 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + speedStats.length * 0.1 }}
        >
          <div className="text-5xl md:text-6xl font-extrabold text-emerald-400 tabular-nums">{accuracy}%</div>
          <div className="text-sm text-gray-400 mt-1">ACC%</div>
          <div className="text-xs text-gray-500">准确率</div>
        </motion.div>

        {/* 错误数 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + speedStats.length * 0.1 }}
        >
          <div className="text-5xl md:text-6xl font-extrabold text-red-400 tabular-nums">{errors}</div>
          <div className="text-sm text-gray-400 mt-1">Errors</div>
          <div className="text-xs text-gray-500">错误</div>
        </motion.div>
      </div>

      {/* WPM 曲线图 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-sm text-gray-400 mb-4">
          {mode === 'english' ? 'WPM 变化曲线' : mode === 'coder' ? 'LPM 变化曲线' : 'CPM 变化曲线'}
        </h3>
        <WpmChart data={wpmHistory} />
      </motion.div>

      {/* 重新开始按钮 */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button size="lg" onClick={onRestart}>
          再来一次
        </Button>
      </motion.div>

      <motion.p
        className="text-center text-gray-500 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        按 <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">Tab</kbd> +{' '}
        <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">Enter</kbd> 重新开始
      </motion.p>
    </motion.div>
  );
}
