'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SoundType } from '@/lib/constants';
import { Checkbox } from '@/components/ui/Checkbox';

interface SoundSelectorProps {
    soundEnabled: boolean;
    soundType: SoundType;
    onSoundEnabledChange: (enabled: boolean) => void;
    onSoundTypeChange: (type: SoundType) => void;
    disabled?: boolean;
}

export function SoundSelector({
    soundEnabled,
    soundType,
    onSoundEnabledChange,
    onSoundTypeChange,
    disabled = false
}: SoundSelectorProps) {
    const t = useTranslations('Settings');

    const soundTypes: { value: SoundType; label: string }[] = [
        { value: 'cherry-blue', label: t('soundTypeLabels.cherry-blue') },
        { value: 'cherry-red', label: t('soundTypeLabels.cherry-red') },
    ];

    return (
        <div className="flex items-center gap-4">
            <Checkbox
                checked={soundEnabled}
                onChange={onSoundEnabledChange}
                label={t('soundEnabled')}
                disabled={disabled}
            />

            <AnimatePresence>
                {soundEnabled && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-px h-4 bg-gray-700 mx-1" />
                        <div className="flex relative gap-1 bg-gray-900/50 rounded-lg p-1">
                            {soundTypes.map((s) => (
                                <motion.button
                                    key={s.value}
                                    onClick={() => onSoundTypeChange(s.value)}
                                    className={`
                        px-3 py-1.5 rounded-md text-xs font-medium
                        transition-colors duration-200 relative
                        ${soundType === s.value ? 'text-white' : 'text-gray-400 hover:text-white'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                                    whileHover={!disabled ? { scale: 1.05 } : undefined}
                                    whileTap={!disabled ? { scale: 0.95 } : undefined}
                                    disabled={disabled}
                                >
                                    <span className="relative z-10">{s.label}</span>
                                    {soundType === s.value && (
                                        <motion.div
                                            layoutId="sound-highlight"
                                            className="absolute inset-0 bg-teal-500 rounded-md"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
