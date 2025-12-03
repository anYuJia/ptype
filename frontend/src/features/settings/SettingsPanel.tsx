'use client';

import { motion } from 'framer-motion';
import { CustomSelect } from '@/components/CustomSelect';
import {
  DURATION_OPTIONS,
  DIFFICULTY_OPTIONS,
  CHINESE_STYLE_OPTIONS,
  PROGRAMMING_LANGUAGE_OPTIONS,
  CHINESE_STYLE_LABELS,
  PROGRAMMING_LANGUAGE_LABELS,
  TypingMode,
  DifficultyLevel,
  ChineseStyle,
  ProgrammingLanguage,
  EnglishOptions,
  TypingOptions,
} from '@/lib/constants';

interface SettingsPanelProps {
  duration: number;
  mode: TypingMode;
  difficulty: DifficultyLevel;
  chineseStyle: ChineseStyle;
  programmingLanguage: ProgrammingLanguage;
  englishOptions: EnglishOptions;
  typingOptions: TypingOptions;
  status: 'idle' | 'running' | 'finished';
  onDurationChange: (duration: number) => void;
  onModeChange: (mode: TypingMode) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onChineseStyleChange: (style: ChineseStyle) => void;
  onProgrammingLanguageChange: (lang: ProgrammingLanguage) => void;
  onEnglishOptionsChange: (options: EnglishOptions) => void;
  onTypingOptionsChange: (options: TypingOptions) => void;
  onRestart?: () => void;
  disabled?: boolean;
}

const modes: { value: TypingMode; label: string; description: string }[] = [
  { value: 'english', label: 'English', description: 'Common phrases & quotes' },
  { value: 'chinese', label: '中文', description: '现代文、文言文' },
  { value: 'coder', label: 'Coder', description: 'Multi-language code' },
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
  chineseStyle,
  programmingLanguage,
  englishOptions,
  typingOptions,
  status,
  onDurationChange,
  onModeChange,
  onDifficultyChange,
  onChineseStyleChange,
  onProgrammingLanguageChange,
  onEnglishOptionsChange,
  onTypingOptionsChange,
  onRestart,
  disabled = false,
}: SettingsPanelProps) {
  return (
    <div className="space-y-3">
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
          className="flex items-center justify-between gap-4"
        >
          {/* 左侧：允许删除 + 英文选项 */}
          <div className="flex items-center gap-6">
            {/* 允许删除 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={typingOptions.allowBackspace}
                onChange={(e) =>
                  !disabled &&
                  onTypingOptionsChange({
                    ...typingOptions,
                    allowBackspace: e.target.checked,
                  })
                }
                disabled={disabled}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
              />
              <span className="text-sm text-gray-300">允许删除</span>
            </label>

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
          </div>

          {/* 右侧：重新生成按钮 */}
          {status === 'idle' && onRestart && (
            <motion.button
              onClick={onRestart}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              重新生成文本
            </motion.button>
          )}
        </motion.div>
      )}

      {/* 中文选项：文体选择 */}
      {mode === 'chinese' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center justify-between gap-4"
        >
          {/* 左侧：允许删除 + 中文文体 */}
          <div className="flex items-center gap-6">
            {/* 允许删除 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={typingOptions.allowBackspace}
                onChange={(e) =>
                  !disabled &&
                  onTypingOptionsChange({
                    ...typingOptions,
                    allowBackspace: e.target.checked,
                  })
                }
                disabled={disabled}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
              />
              <span className="text-sm text-gray-300">允许删除</span>
            </label>

            {/* 文体选择 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-2">文体:</span>
              <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
                {CHINESE_STYLE_OPTIONS.map((style) => (
                  <motion.button
                    key={style}
                    onClick={() => !disabled && onChineseStyleChange(style)}
                    className={`
                      px-4 py-1.5 rounded-md text-sm font-medium transition-all
                      ${chineseStyle === style
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }
                      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    whileHover={!disabled ? { scale: 1.05 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    disabled={disabled}
                  >
                    {CHINESE_STYLE_LABELS[style]}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：重新生成按钮 */}
          {status === 'idle' && onRestart && (
            <motion.button
              onClick={onRestart}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              重新生成文本
            </motion.button>
          )}
        </motion.div>
      )}

      {/* 代码选项：编程语言选择 */}
      {mode === 'coder' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center justify-between gap-4"
        >
          {/* 左侧：允许删除 + 编程语言选择器 */}
          <div className="flex items-center gap-6">
            {/* 允许删除 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={typingOptions.allowBackspace}
                onChange={(e) =>
                  !disabled &&
                  onTypingOptionsChange({
                    ...typingOptions,
                    allowBackspace: e.target.checked,
                  })
                }
                disabled={disabled}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
              />
              <span className="text-sm text-gray-300">允许删除</span>
            </label>

            {/* 编程语言 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-2">编程语言:</span>
              <CustomSelect
                value={programmingLanguage}
                options={PROGRAMMING_LANGUAGE_OPTIONS}
                labels={PROGRAMMING_LANGUAGE_LABELS}
                onChange={onProgrammingLanguageChange}
                disabled={disabled}
                className="w-40"
              />
            </div>
          </div>

          {/* 右侧：重新生成按钮 */}
          {status === 'idle' && onRestart && (
            <motion.button
              onClick={onRestart}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              重新生成文本
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
