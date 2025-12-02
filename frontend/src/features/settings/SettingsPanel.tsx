'use client';

import { motion } from 'framer-motion';
import {
  DURATION_OPTIONS,
  DIFFICULTY_OPTIONS,
  TypingMode,
  DifficultyLevel,
  EnglishOptions
} from '@/lib/constants';

interface SettingsPanelProps {
  duration: number;
  mode: TypingMode;
  difficulty: DifficultyLevel;
  englishOptions: EnglishOptions;
  onDurationChange: (duration: number) => void;
  onModeChange: (mode: TypingMode) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onEnglishOptionsChange: (options: EnglishOptions) => void;
  disabled?: boolean;
}

const modes: { value: TypingMode; label: string; description: string }[] = [
  { value: 'english', label: 'English', description: 'Common phrases & quotes' },
  { value: 'chinese', label: '中文', description: '名言警句、诗词' },
  { value: 'coder', label: 'Coder', description: 'Code snippets & syntax' },
];

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export function SettingsPanel({
  duration,
  mode,
  difficulty,
  englishOptions,
  onDurationChange,
  onModeChange,
  onDifficultyChange,
  onEnglishOptionsChange,
  disabled = false,
}: SettingsPanelProps) {
  return (
    <div className="space-y-4">
      {/* 第一行：时间、模式、难度 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* 时间选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Time:</span>
          <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
            {DURATION_OPTIONS.map((d) => (
              <motion.button
                key={d}
                onClick={() => !disabled && onDurationChange(d)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${duration === d
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={!disabled ? { scale: 1.05 } : undefined}
                whileTap={!disabled ? { scale: 0.95 } : undefined}
                disabled={disabled}
              >
                {d}s
              </motion.button>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-8 bg-gray-700" />

        {/* 模式选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Mode:</span>
          <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
            {modes.map((m) => (
              <motion.button
                key={m.value}
                onClick={() => !disabled && onModeChange(m.value)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${mode === m.value
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={!disabled ? { scale: 1.05 } : undefined}
                whileTap={!disabled ? { scale: 0.95 } : undefined}
                disabled={disabled}
                title={m.description}
              >
                {m.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-8 bg-gray-700" />

        {/* 难度选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Difficulty:</span>
          <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
            {DIFFICULTY_OPTIONS.map((d) => (
              <motion.button
                key={d}
                onClick={() => !disabled && onDifficultyChange(d)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${difficulty === d
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={!disabled ? { scale: 1.05 } : undefined}
                whileTap={!disabled ? { scale: 0.95 } : undefined}
                disabled={disabled}
              >
                {difficultyLabels[d]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 第二行：英文选项（只在英文模式下显示） */}
      {mode === 'english' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="text-sm text-gray-400">Options:</span>

          {/* 区分大小写 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={englishOptions.caseSensitive}
              onChange={(e) =>
                !disabled &&
                onEnglishOptionsChange({
                  ...englishOptions,
                  caseSensitive: e.target.checked,
                })
              }
              disabled={disabled}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
            />
            <span className="text-sm text-gray-300">区分大小写</span>
          </label>

          {/* 忽略标点符号 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={englishOptions.ignorePunctuation}
              onChange={(e) =>
                !disabled &&
                onEnglishOptionsChange({
                  ...englishOptions,
                  ignorePunctuation: e.target.checked,
                })
              }
              disabled={disabled}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
            />
            <span className="text-sm text-gray-300">忽略标点符号</span>
          </label>
        </motion.div>
      )}
    </div>
  );
}
