'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TypingMode } from '@/lib/constants';

const modes: { value: TypingMode; label: string; description: string }[] = [
    { value: 'english', label: 'English', description: 'Common phrases & quotes' },
    { value: 'chinese', label: '中文', description: '现代文、文言文' },
    { value: 'coder', label: 'Coder', description: 'Multi-language code' },
    { value: 'custom', label: 'Custom', description: 'Your own text' },
];

interface ModeSelectorProps {
    mode: TypingMode;
    onModeChange: (mode: TypingMode) => void;
    disabled?: boolean;
}

export function ModeSelector({ mode, onModeChange, disabled = false }: ModeSelectorProps) {
    const t = useTranslations('Settings');

    const modeDescriptions = {
        english: t('modeDescriptions.english'),
        chinese: t('modeDescriptions.chinese'),
        coder: t('modeDescriptions.coder'),
        custom: t('modeDescriptions.custom'),
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">{t('mode')}</span>
            <div className="flex relative gap-1 bg-gray-900/50 rounded-lg p-1">
                {modes.map((m) => (
                    <motion.button
                        key={m.value}
                        onClick={() => onModeChange(m.value)}
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
    );
}
