'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSelectProps<T extends string> {
    value: T;
    options: readonly T[];
    labels: Record<T, string>;
    onChange: (value: T) => void;
    disabled?: boolean;
    className?: string;
}

export function CustomSelect<T extends string>({
    value,
    options,
    labels,
    onChange,
    disabled = false,
    className = '',
}: CustomSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 关闭下拉框当点击外部时
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* 选择器按钮 */}
            <motion.button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          w-full px-1 py-2 rounded-none
          bg-transparent border-b border-gray-700
          text-white text-sm
          flex items-center justify-center gap-2
          transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-teal-500'}
        `}
                whileHover={!disabled ? { scale: 1.02 } : undefined}
                whileTap={!disabled ? { scale: 0.98 } : undefined}
            >
                <span className="truncate">{labels[value]}</span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </motion.svg>
            </motion.button>

            {/* 下拉选项列表 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="
              absolute top-full left-0 right-0 mt-2 z-50
              bg-gray-900 border border-gray-700 rounded-lg
              shadow-xl shadow-black/50
              max-h-60 overflow-y-auto
            "
                    >
                        {options.map((option) => (
                            <motion.button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full px-3 py-2 text-left text-sm
                  transition-colors
                  ${value === option
                                        ? 'bg-teal-500/20 text-teal-400'
                                        : 'text-gray-300 hover:bg-gray-800'
                                    }
                `}
                                whileHover={{ backgroundColor: value === option ? undefined : 'rgba(31, 41, 55, 1)' }}
                            >
                                {labels[option]}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
