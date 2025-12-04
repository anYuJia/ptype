import { useEffect, useState } from 'react';
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
        setError
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

    if (!isAuthModalOpen) return null;

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuthModal}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
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
