import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400 ml-1">
                    {label}
                </label>
                <div className="relative">
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border 
              ${error ? 'border-red-500/50 focus:border-red-500' : 'border-gray-800 focus:border-teal-500/50'} 
              text-gray-200 placeholder-gray-600 outline-none transition-all duration-200
              focus:bg-gray-900 focus:ring-1 focus:ring-teal-500/20
              ${className}
            `}
                        {...props}
                    />
                    {error && (
                        <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-3 top-2.5 text-xs text-red-400"
                        >
                            {error}
                        </motion.span>
                    )}
                </div>
            </div>
        );
    }
);

AuthInput.displayName = 'AuthInput';
