'use client';

import { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '@/features/typing-test/store/typingStore';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Checkbox } from '@/components/ui/Checkbox';
import { CustomTextModal } from '../typing-test/components/CustomTextModal';
import { getCustomTexts, CustomText } from '@/features/custom-text/actions';
import { getUserSettings, saveCustomDuration } from './actions';
import { TypingMode } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import {
  TimeSelector,
  ModeSelector,
  DifficultySelector,
  ModeSpecificOptions,
} from './components';

interface SettingsPanelProps {
  disabled?: boolean;
}

export function SettingsPanel({
  disabled = false,
}: SettingsPanelProps) {
  const t = useTranslations('Settings');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [savedTexts, setSavedTexts] = useState<CustomText[]>([]);
  const [customDuration, setCustomDuration] = useState<number>(0);
  const { isAuthenticated } = useAuthStore();

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
    customText,
  } = settings;

  // Load custom texts
  useEffect(() => {
    let isMounted = true;
    const loadTexts = async () => {
      const res = await getCustomTexts();
      if (isMounted && res.success && res.data) {
        setSavedTexts(res.data);
      } else {
        // If failed (e.g. unauthorized), clear list
        setSavedTexts([]);
      }
    };
    loadTexts();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  // Load user settings (custom duration)
  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      const res = await getUserSettings();
      if (isMounted && res.success && res.settings) {
        const saved = (res.settings as any).customDuration;
        if (saved && typeof saved === 'number') {
          setCustomDuration(saved);
        }
      } else {
        setCustomDuration(0);
      }
    };
    loadSettings();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  // Refresh list when modal closes
  useEffect(() => {
    if (!isCustomModalOpen) {
      let isMounted = true;
      const loadTexts = async () => {
        const res = await getCustomTexts();
        if (isMounted && res.success && res.data) {
          setSavedTexts(res.data);
        }
      };
      loadTexts();
      return () => { isMounted = false; };
    }
  }, [isCustomModalOpen]);

  // Compute selectedId as derived state
  const selectedTextId = useMemo(() => {
    if (mode === 'custom' && customText && savedTexts.length > 0) {
      const match = savedTexts.find(t => t.content === customText);
      return match ? match.id : '';
    }
    return '';
  }, [mode, customText, savedTexts]);

  const formattedSavedTexts = useMemo(() =>
    savedTexts.map(t => ({ id: t.id, title: t.title, content: t.content })),
    [savedTexts]
  );

  const handleModeChange = useCallback((newMode: TypingMode) => {
    if (disabled) return;

    if (newMode === 'custom') {
      if (customText && customText.trim().length > 0) {
        updateSettings({ mode: 'custom' });
        return;
      }
      if (savedTexts.length > 0) {
        const mostRecent = savedTexts[0];
        updateSettings({ mode: 'custom', customText: mostRecent.content });
        setTimeout(() => initTest(), 0);
        return;
      }
      setIsCustomModalOpen(true);
    } else {
      updateSettings({ mode: newMode });
    }
  }, [disabled, customText, savedTexts, updateSettings, initTest]);

  const handleCustomTextConfirm = useCallback((text: string) => {
    updateSettings({ mode: 'custom', customText: text });
    setTimeout(() => initTest(), 0);
  }, [updateSettings, initTest]);

  const handleCustomSelectChange = useCallback((id: string) => {
    const selected = savedTexts.find(t => t.id === id);
    if (selected) {
      updateSettings({ mode: 'custom', customText: selected.content });
      setTimeout(() => initTest(), 0);
    }
  }, [savedTexts, updateSettings, initTest]);

  const handleProgrammingLanguageChange = useCallback((lang: typeof programmingLanguage) => {
    updateSettings({ programmingLanguage: lang });
    setTimeout(() => initTest(true), 0);
  }, [updateSettings, initTest]);

  const handleCustomDurationChange = useCallback(async (newDuration: number) => {
    setCustomDuration(newDuration);
    await saveCustomDuration(newDuration);
  }, []);

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
        <TimeSelector
          duration={duration}
          onDurationChange={(d) => updateSettings({ duration: d })}
          customDuration={customDuration}
          onCustomDurationChange={handleCustomDurationChange}
          disabled={disabled}
        />

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-8 bg-gray-700" />

        {/* 模式选择 */}
        <ModeSelector
          mode={mode}
          onModeChange={handleModeChange}
          disabled={disabled}
        />

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-8 bg-gray-700" />

        {/* 难度选择 */}
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={(d) => updateSettings({ difficulty: d })}
          disabled={disabled}
        />
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

          {/* 模式特定选项 */}
          <ModeSpecificOptions
            mode={mode}
            englishOptions={englishOptions}
            onEnglishOptionsChange={(opts) => updateSettings({ englishOptions: opts })}
            chineseStyle={chineseStyle}
            onChineseStyleChange={(style) => updateSettings({ chineseStyle: style })}
            programmingLanguage={programmingLanguage}
            onProgrammingLanguageChange={handleProgrammingLanguageChange}
            savedTexts={formattedSavedTexts}
            selectedTextId={selectedTextId}
            onCustomSelectChange={handleCustomSelectChange}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
            disabled={disabled}
          />
        </div>

        {/* 右侧：重新生成按钮 */}
        {status === 'idle' && (
          <motion.button
            onClick={() => initTest(true)}
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
