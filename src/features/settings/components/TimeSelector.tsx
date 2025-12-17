import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { DURATION_OPTIONS } from '@/lib/constants';

interface TimeSelectorProps {
    duration: number;
    onDurationChange: (duration: number) => void;
    customDuration?: number; // User's saved custom duration
    onCustomDurationChange?: (duration: number) => void; // Save to server/local
    disabled?: boolean;
}

export function TimeSelector({
    duration,
    onDurationChange,
    customDuration: initialCustomDuration = 0,
    onCustomDurationChange,
    disabled = false
}: TimeSelectorProps) {
    const t = useTranslations('Settings');

    // Local state for the custom value to display when not active
    // If we receive a prop, use it, otherwise default to something or current duration if custom
    const [savedCustom, setSavedCustom] = useState(initialCustomDuration > 0 ? initialCustomDuration : 0);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync state if prop updates (e.g. from server load)
    useEffect(() => {
        if (initialCustomDuration > 0) {
            setSavedCustom(initialCustomDuration);
        }
    }, [initialCustomDuration]);

    // Update saved custom if current duration is non-standard
    useEffect(() => {
        const isStandard = DURATION_OPTIONS.includes(duration as any);
        if (!isStandard && duration > 0) {
            setSavedCustom(duration);
        }
    }, [duration]);

    const isCustomActive = !DURATION_OPTIONS.includes(duration as any) && duration === savedCustom;

    const handleCustomClick = () => {
        if (savedCustom === 0) {
            // If no custom value set yet, go straight to edit
            setIsEditing(true);
            setTimeout(() => inputRef.current?.focus(), 0);
            return;
        }

        if (duration !== savedCustom) {
            // Switch to custom time
            onDurationChange(savedCustom);
        } else {
            // Already active, click again to edit
            setIsEditing(true);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    const submitCustomValue = () => {
        setIsEditing(false);
        if (!inputRef.current) return;

        const val = parseInt(inputRef.current.value, 10);
        if (val > 0 && !isNaN(val)) {
            setSavedCustom(val);
            onDurationChange(val);
            onCustomDurationChange?.(val);
        }
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitCustomValue();
    };

    const handleBlur = () => {
        submitCustomValue();
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">{t('time')}</span>
            <div className="flex gap-1 bg-gray-900/50 rounded-lg p-1">
                {DURATION_OPTIONS.map((d) => (
                    <motion.button
                        key={d}
                        onClick={() => !disabled && onDurationChange(d)}
                        className={`
              px-3 py-1.5 rounded-md text-sm font-medium
              transition-colors duration-200 relative
              ${duration === d
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                            }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
                        whileHover={!disabled ? { scale: 1.05 } : undefined}
                        whileTap={!disabled ? { scale: 0.95 } : undefined}
                        disabled={disabled}
                    >
                        <span className="relative z-10">{d}s</span>
                        {duration === d && (
                            <motion.div
                                layoutId="time-highlight"
                                className="absolute inset-0 bg-teal-500 rounded-md"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </motion.button>
                ))}

                {/* Custom Button */}
                <div className="relative min-w-[60px]">
                    {isEditing ? (
                        <form onSubmit={handleCustomSubmit} className="relative z-20">
                            <input
                                ref={inputRef}
                                type="number"
                                className="w-16 px-2 py-1.5 rounded-md text-sm font-medium bg-gray-800 text-white outline-none border border-teal-500 text-center mx-1 shadow-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                defaultValue={savedCustom > 0 ? savedCustom : ''}
                                placeholder="..."
                                onBlur={handleBlur}
                                min="1"
                                max="9999"
                                autoFocus
                            />
                        </form>
                    ) : (
                        <motion.button
                            onClick={!disabled ? handleCustomClick : undefined}
                            className={`
                  w-full px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200 relative
                  ${isCustomActive
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                            whileHover={!disabled ? { scale: 1.05 } : undefined}
                            whileTap={!disabled ? { scale: 0.95 } : undefined}
                            disabled={disabled}
                        >
                            <span className="relative z-10">
                                {savedCustom > 0 ? `${savedCustom}s` : <span className="opacity-50">...</span>}
                            </span>
                            {isCustomActive && (
                                <motion.div
                                    layoutId="time-highlight"
                                    className="absolute inset-0 bg-teal-500 rounded-md"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
