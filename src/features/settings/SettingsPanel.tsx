import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '@/features/typing-test/store/typingStore';
import { CustomSelect } from '@/components/CustomSelect';
import { Checkbox } from '@/components/ui/Checkbox';
import { CustomTextModal } from '../typing-test/components/CustomTextModal';
import {
  DURATION_OPTIONS,
  DIFFICULTY_OPTIONS,
  CHINESE_STYLE_OPTIONS,
  PROGRAMMING_LANGUAGE_OPTIONS,
  CHINESE_STYLE_LABELS,
  PROGRAMMING_LANGUAGE_LABELS,
  TypingMode,
  DifficultyLevel,
} from '@/lib/constants';
import { useTranslations } from 'next-intl';

interface SettingsPanelProps {
  disabled?: boolean;
}

const modes: { value: TypingMode; label: string; description: string }[] = [
  { value: 'english', label: 'English', description: 'Common phrases & quotes' },
  { value: 'chinese', label: '中文', description: '现代文、文言文' },
  { value: 'coder', label: 'Coder', description: 'Multi-language code' },
  { value: 'custom', label: 'Custom', description: 'Your own text' },
];

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export function SettingsPanel({
  disabled = false,
}: SettingsPanelProps) {
  const t = useTranslations('Settings');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // 从 Store 获取设置和 actions
  const {
    settings,
    status,
    updateSettings,
    initTest
  } = useTypingStore(
    useShallow((state) => ({
      settings: state.settings,
      status: state.status,
      updateSettings: state.updateSettings,
      initTest: state.initTest,
    }))
  );

  const {
    duration,
    mode,
    difficulty,
    chineseStyle,
    programmingLanguage,
    englishOptions,
    typingOptions,
  } = settings;

  const modeDescriptions = {
    english: t('modeDescriptions.english'),
    chinese: t('modeDescriptions.chinese'),
    coder: t('modeDescriptions.coder'),
    custom: t('modeDescriptions.custom'),
  };

  const handleModeChange = (newMode: TypingMode) => {
    if (disabled) return;

    if (newMode === 'custom') {
      setIsCustomModalOpen(true);
    } else {
      updateSettings({ mode: newMode });
    }
  };

  const handleCustomTextConfirm = (text: string) => {
    updateSettings({ mode: 'custom', customText: text });
    // updateSettings calls initTest internally if mode changes, but if we are already in custom mode and just changing text,
    // we might need to force re-init or ensure updateSettings handles it.
    // Our typingStore implementation of updateSettings will call initTest if mode changes.
    // If mode is same but customText changes, we need to ensure initTest is called.
    // Let's modify typingStore to handle customText change or just manually call initTest here.
    // Checking typingStore: it checks specifics properties. It doesn't check customText.
    // So we should probably manually call initTest here just in case, or update typingStore to watch customText.
    // For now, let's just calling initTest() is safer after update.
    // Actually, `updateSettings` runs asynchronously in React state terms? No, Zustand is sync usually.
    // Let's rely on updateSettings logic. Wait, I should double check typingStore updateSettings.
    /*
      if ((newSettings.mode && newSettings.mode !== settings.mode) || ... ) { initTest() }
    */
    // If I'm already in custom mode, changing text won't trigger initTest automatically unless I add customText to that condition in store.
    // Plan: I'll manually call initTest() here after updateSettings to be sure.
    setTimeout(() => initTest(), 0);
  };

  return (
    <div className="space-y-3">
      <CustomTextModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onConfirm={handleCustomTextConfirm}
      />

      {/* 第一行：时间、模式、难度 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* 时间选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">{t('time')}</span>
          <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
            {DURATION_OPTIONS.map((d) => (
              <motion.button
                key={d}
                onClick={() => !disabled && updateSettings({ duration: d })}
                // ... (keep className and props)
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
          <span className="text-sm text-gray-400 mr-2">{t('mode')}</span>
          <div className="flex relative gap-1 bg-gray-900/50 rounded-lg p-1">
            {modes.map((m) => (
              <motion.button
                key={m.value}
                onClick={() => handleModeChange(m.value)}
                // ... (keep className and props)
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200 relative
                  ${mode === m.value ? 'text-white' : 'text-gray-400 hover:text-white'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={!disabled ? { scale: 1.05 } : undefined}
                whileTap={!disabled ? { scale: 0.95 } : undefined}
                disabled={disabled}
                title={modeDescriptions[m.value as keyof typeof modeDescriptions]}
              >
                <span className="relative z-10">{t(`modeLabels.${m.value}`)}</span>
                {mode === m.value && (
                  <motion.div
                    layoutId="mode-highlight"
                    className="absolute inset-0 bg-teal-500 rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-8 bg-gray-700" />

        {/* 难度选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">{t('difficulty')}</span>
          <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
            {DIFFICULTY_OPTIONS.map((d) => (
              <motion.button
                key={d}
                onClick={() => !disabled && updateSettings({ difficulty: d })}
                // ... (keep className and props)
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
                {t(`difficultyLabels.${d}`)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 第二行：共享选项 + 模式特定选项 */}
      <div className="flex items-center justify-between gap-4">
        {/* 左侧：允许删除（共享） + 模式特定选项 */}
        <div className="flex items-center gap-6">
          {/* 允许删除 - 所有模式共享，不重新渲染 */}
          <Checkbox
            checked={typingOptions.allowBackspace}
            onChange={(checked) =>
              updateSettings({
                typingOptions: { ...typingOptions, allowBackspace: checked }
              })
            }
            label={t('allowBackspace')}
            disabled={disabled}
          />

          {/* 模式特定选项 - 平滑过渡 */}
          <AnimatePresence mode="wait" initial={false}>
            {mode === 'english' && (
              <motion.div
                key="english-options"
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                {/* 区分大小写 */}
                <Checkbox
                  checked={englishOptions.caseSensitive}
                  onChange={(checked) =>
                    updateSettings({
                      englishOptions: { ...englishOptions, caseSensitive: checked }
                    })
                  }
                  label={t('caseSensitive')}
                  disabled={disabled}
                />

                {/* 忽略标点符号 */}
                <Checkbox
                  checked={englishOptions.ignorePunctuation}
                  onChange={(checked) =>
                    updateSettings({
                      englishOptions: { ...englishOptions, ignorePunctuation: checked }
                    })
                  }
                  label={t('ignorePunctuation')}
                  disabled={disabled}
                />
              </motion.div>
            )}

            {mode === 'chinese' && (
              <motion.div
                key="chinese-options"
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-sm text-gray-400 mr-2">{t('chineseStyle')}</span>
                <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
                  {CHINESE_STYLE_OPTIONS.map((style) => (
                    <motion.button
                      key={style}
                      onClick={() => !disabled && updateSettings({ chineseStyle: style })}
                      className={`
                        px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                        ${chineseStyle === style
                          ? 'bg-teal-500 text-white'
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
              </motion.div>
            )}

            {mode === 'coder' && (
              <motion.div
                key="coder-options"
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-sm text-gray-400 mr-2">{t('programmingLanguage')}</span>
                <CustomSelect
                  value={programmingLanguage}
                  options={PROGRAMMING_LANGUAGE_OPTIONS}
                  labels={PROGRAMMING_LANGUAGE_LABELS}
                  onChange={(lang) => updateSettings({ programmingLanguage: lang })}
                  disabled={disabled}
                  className="w-40"
                />
              </motion.div>
            )}

            {mode === 'custom' && (
              <motion.div
                key="custom-options"
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  onClick={() => !disabled && setIsCustomModalOpen(true)}
                  className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors hover:underline"
                >
                  {t('editCustomText')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 右侧：重新生成按钮 */}
        {status === 'idle' && (
          <motion.button
            onClick={() => initTest()}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('regenerate')}
          </motion.button>
        )}
      </div>
    </div>
  );
}
