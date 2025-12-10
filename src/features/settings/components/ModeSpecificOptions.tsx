'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/Checkbox';
import { CustomSelect } from '@/components/CustomSelect';
import {
    TypingMode,
    ChineseStyle,
    ProgrammingLanguage,
    EnglishOptions,
    CHINESE_STYLE_OPTIONS,
    CHINESE_STYLE_LABELS,
    PROGRAMMING_LANGUAGE_OPTIONS,
    PROGRAMMING_LANGUAGE_LABELS,
} from '@/lib/constants';

interface ModeSpecificOptionsProps {
    mode: TypingMode;
    // English options
    englishOptions: EnglishOptions;
    onEnglishOptionsChange: (options: EnglishOptions) => void;
    // Chinese options
    chineseStyle: ChineseStyle;
    onChineseStyleChange: (style: ChineseStyle) => void;
    // Coder options
    programmingLanguage: ProgrammingLanguage;
    onProgrammingLanguageChange: (lang: ProgrammingLanguage) => void;
    // Custom options
    savedTexts: { id: string; title: string; content: string }[];
    selectedTextId: string;
    onCustomSelectChange: (id: string) => void;
    onOpenCustomModal: () => void;
    // Common
    disabled?: boolean;
}

export function ModeSpecificOptions({
    mode,
    englishOptions,
    onEnglishOptionsChange,
    chineseStyle,
    onChineseStyleChange,
    programmingLanguage,
    onProgrammingLanguageChange,
    savedTexts,
    selectedTextId,
    onCustomSelectChange,
    onOpenCustomModal,
    disabled = false,
}: ModeSpecificOptionsProps) {
    const t = useTranslations('Settings');

    const customTextOptions = savedTexts.map(t => t.id);
    const customTextLabels: Record<string, string> = {};
    savedTexts.forEach(t => customTextLabels[t.id] = t.title);

    return (
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
                            onEnglishOptionsChange({ ...englishOptions, caseSensitive: checked })
                        }
                        label={t('caseSensitive')}
                        disabled={disabled}
                    />

                    {/* 忽略标点符号 */}
                    <Checkbox
                        checked={englishOptions.ignorePunctuation}
                        onChange={(checked) =>
                            onEnglishOptionsChange({ ...englishOptions, ignorePunctuation: checked })
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
                                onClick={() => !disabled && onChineseStyleChange(style)}
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
                        onChange={onProgrammingLanguageChange}
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
                    {savedTexts.length > 0 && (
                        <CustomSelect
                            value={selectedTextId}
                            options={customTextOptions}
                            labels={customTextLabels}
                            onChange={onCustomSelectChange}
                            disabled={disabled}
                            className="w-32"
                        />
                    )}
                    <button
                        onClick={() => !disabled && onOpenCustomModal()}
                        className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors hover:underline px-2"
                    >
                        {t('editCustomText')}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
