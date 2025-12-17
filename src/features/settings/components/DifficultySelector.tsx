'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { DIFFICULTY_OPTIONS, DifficultyLevel } from '@/lib/constants';

interface DifficultySelectorProps {
    difficulty: DifficultyLevel;
    onDifficultyChange: (difficulty: DifficultyLevel) => void;
    disabled?: boolean;
}

export function DifficultySelector({ difficulty, onDifficultyChange, disabled = false }: DifficultySelectorProps) {
    const t = useTranslations('Settings');

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">{t('difficulty')}</span>
            <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
                {DIFFICULTY_OPTIONS.map((d) => (
                    <motion.button
                        key={d}
                        onClick={() => !disabled && onDifficultyChange(d)}
                        className={`
              px-3 py-1.5 rounded-md text-sm font-medium
              transition-colors duration-200 relative
              ${difficulty === d
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                            }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
                        whileHover={!disabled ? { scale: 1.05 } : undefined}
                        whileTap={!disabled ? { scale: 0.95 } : undefined}
                        disabled={disabled}
                    >
                        <span className="relative z-10">{t(`difficultyLabels.${d}`)}</span>
                        {difficulty === d && (
                            <motion.div
                                layoutId="difficulty-highlight"
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
