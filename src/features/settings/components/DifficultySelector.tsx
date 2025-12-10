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
    );
}
