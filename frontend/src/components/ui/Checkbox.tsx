'use client';

import { motion } from 'framer-motion';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export function Checkbox({
    checked,
    onChange,
    label,
    disabled = false,
    className = '',
}: CheckboxProps) {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e.target.checked)}
                    disabled={disabled}
                />
                <motion.div
                    className={`
            w-5 h-5 rounded border transition-colors duration-200
            flex items-center justify-center
            ${checked
                            ? 'bg-teal-500 border-teal-500'
                            : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                        }
          `}
                    initial={false}
                    animate={checked ? { scale: 1 } : { scale: 1 }}
                    whileHover={!disabled ? { scale: 1.05 } : undefined}
                    whileTap={!disabled ? { scale: 0.95 } : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-white"
                    >
                        <motion.path
                            d="M20 6L9 17l-5-5"
                            initial={false}
                            animate={{
                                pathLength: checked ? 1 : 0,
                                opacity: checked ? 1 : 0
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </svg>
                </motion.div>
            </div>
            {label && <span className="text-sm text-gray-300 select-none">{label}</span>}
        </label>
    );
}
