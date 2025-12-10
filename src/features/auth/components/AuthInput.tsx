import { InputHTMLAttributes, forwardRef } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    checkStatus?: 'checking' | 'available' | 'taken' | null;
    passwordRequirements?: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
    };
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, checkStatus, passwordRequirements, className, ...props }, ref) => {
        // Calculate strength score (0-4)
        const strengthScore = passwordRequirements
            ? [passwordRequirements.length, passwordRequirements.uppercase, passwordRequirements.lowercase, passwordRequirements.number].filter(Boolean).length
            : 0;

        return (
            <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400 ml-1">
                    {label}
                </label>
                <div className="relative group">
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border
              ${error || checkStatus === 'taken' ? 'border-red-500/50 focus:border-red-500' :
                                checkStatus === 'available' ? 'border-green-500/50 focus:border-green-500' :
                                    'border-gray-800 focus:border-teal-500/50'}
              text-gray-200 placeholder-gray-600 outline-none transition-all duration-200
              focus:bg-gray-900 focus:ring-1 focus:ring-teal-500/20
              ${className}
            `}
                        {...props}
                    />

                    {/* Status Icons / Strength Indicator */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        {/* Only show check status icons if not a password field */}
                        {!passwordRequirements && checkStatus === 'checking' && (
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-teal-500 rounded-full animate-spin" />
                        )}
                        {!passwordRequirements && checkStatus === 'available' && !error && (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {!passwordRequirements && (error || checkStatus === 'taken') && (
                            <span className="text-xs text-red-400">
                                {error || '已被使用'}
                            </span>
                        )}

                        {/* Password Strength Indicator */}
                        {passwordRequirements && !error && (
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i <= strengthScore
                                            ? strengthScore === 4 ? 'bg-green-400'
                                                : strengthScore >= 2 ? 'bg-yellow-400'
                                                    : 'bg-red-400'
                                            : 'bg-gray-700'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Password Requirements Tooltip (Only on focus/hover) */}
                    {passwordRequirements && (
                        <div className="absolute right-0 top-full mt-2 p-3 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none w-48">
                            <div className="space-y-1.5">
                                <RequirementItem met={passwordRequirements.length} text="8+ 字符" />
                                <RequirementItem met={passwordRequirements.uppercase} text="大写字母" />
                                <RequirementItem met={passwordRequirements.lowercase} text="小写字母" />
                                <RequirementItem met={passwordRequirements.number} text="数字" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

function RequirementItem({ met, text }: { met: boolean; text: string }) {
    return (
        <div className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-1 h-1 rounded-full ${met ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span>{text}</span>
        </div>
    );
}

AuthInput.displayName = 'AuthInput';
