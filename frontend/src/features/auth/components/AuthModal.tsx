import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { AuthInput } from './AuthInput';
import { authService } from '../services/authService';

export function AuthModal() {
    const {
        isAuthModalOpen,
        closeAuthModal,
        authModalView,
        setAuthModalView,
        login,
        setLoading,
        isLoading,
        error,
        setError,
        triggerPosition
    } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    // Reset state when view changes
    useEffect(() => {
        setError(null);
        setEmail('');
        setPassword('');
        setUsername('');
    }, [authModalView, setError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let user;
            if (authModalView === 'login') {
                user = await authService.login({ email, password });
            } else {
                user = await authService.register({ email, password, username: username || email.split('@')[0] });
            }

            login(user);
            closeAuthModal();
        } catch (err: any) {
            setError(err.message || '操作失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    // Calculate animation origin based on trigger position
    const getAnimationVariants = () => {
        if (!triggerPosition) {
            // Fallback if no position (e.g. direct open)
            return {
                initial: { opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" },
                animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%", filter: "blur(0px)" },
                exit: { opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }
            };
        }

        // Calculate offset from center of screen (where modal lives) to the trigger button
        // Modal is fixed at left-1/2 top-1/2, so (0,0) relative to it is the center of screen.
        // We need to find the vector from Center to Trigger.
        // Trigger (tx, ty)
        // Center (cx, cy) = (window.innerWidth / 2, window.innerHeight / 2)
        // Offset = (tx - cx, ty - cy)

        // Note: Since we are in SSR context initially, we should be careful, but this runs on client.
        const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
        const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

        const x = triggerPosition.x - cx;
        const y = triggerPosition.y - cy;

        return {
            initial: {
                opacity: 0,
                scale: 0.1,
                x: `calc(${x}px - 50%)`,
                y: `calc(${y}px - 50%)`,
                filter: "blur(10px)"
            },
            animate: {
                opacity: 1,
                scale: 1,
                x: "-50%",
                y: "-50%",
                filter: "blur(0px)"
            },
            exit: {
                opacity: 0,
                scale: 0.1,
                x: `calc(${x}px - 50%)`,
                y: `calc(${y}px - 50%)`,
                filter: "blur(10px)"
            }
        };
    };

    const variants = useMemo(() => getAnimationVariants(), [triggerPosition]);

    return (
        <AnimatePresence mode="wait">
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="auth-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeAuthModal}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        key="auth-modal"
                        initial={variants.initial}
                        animate={variants.animate}
                        exit={variants.exit}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 250,
                            mass: 0.8
                        }}
                        className="fixed left-1/2 top-1/2 w-full max-w-md z-50 origin-center"
                    >
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-black/50 overflow-hidden relative">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />

                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {authModalView === 'login' ? '欢迎回来' : '创建账号'}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {authModalView === 'login'
                                        ? '登录以保存您的进度和统计数据'
                                        : '注册以开始记录您的打字旅程'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {authModalView === 'register' && (
                                    <AuthInput
                                        label="用户名"
                                        placeholder="您的昵称"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                )}

                                <AuthInput
                                    label="电子邮箱"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <AuthInput
                                    label="密码"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                                        {error}
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            处理中...
                                        </span>
                                    ) : (
                                        authModalView === 'login' ? '登录' : '注册'
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                {authModalView === 'login' ? (
                                    <>
                                        还没有账号？{' '}
                                        <button
                                            onClick={() => setAuthModalView('register')}
                                            className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                                        >
                                            立即注册
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        已有账号？{' '}
                                        <button
                                            onClick={() => setAuthModalView('login')}
                                            className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                                        >
                                            直接登录
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
