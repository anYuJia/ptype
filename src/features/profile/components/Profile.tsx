
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useTranslations } from 'next-intl';
import { ActivityHeatmap } from './ActivityHeatmap';
import { getProfile, updateProfile, ActivityData } from '../actions';
import { sign } from '@/lib/security';

export function Profile() {
    const t = useTranslations('Profile');
    const { user, logout } = useAuthStore();
    // We can also update the global user store if needed when profile updates
    const [isEditing, setIsEditing] = useState(false);

    const [editUsername, setEditUsername] = useState(user?.username || '');

    const [stats, setStats] = useState({
        joinDate: '-',
        totalTests: 0,
        avgCpm: 0,
        bestCpm: 0,
        timeSpent: '0m',
    });
    const [activityHistory, setActivityHistory] = useState<ActivityData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                if (result.success && result.data) {
                    setStats(result.data.stats);
                    setActivityHistory(result.data.activityHistory);
                    // Optionally sync user data if it changed on server
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const input = { username: editUsername };
            const signature = await sign(input);
            const result = await updateProfile(input, signature);

            if (result.success) {
                setIsEditing(false);
                // Simple way to refresh user data in store/app
                window.location.reload();
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4" />
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <p>{t('pleaseLogin')}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto space-y-8"
        >
            {/* Profile Header Card */}
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl font-bold text-gray-400 border-4 border-gray-800 shadow-xl">
                            {user.username[0].toUpperCase()}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        {isEditing ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editUsername}
                                    onChange={(e) => setEditUsername(e.target.value)}
                                    className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 text-white text-xl font-bold focus:outline-none focus:border-teal-500 w-full md:w-auto"
                                    autoFocus
                                />
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-3 py-1 bg-teal-500 text-white text-xs rounded hover:bg-teal-600 transition-colors"
                                    >
                                        {t('save')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditUsername(user.username);
                                        }}
                                        className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600 transition-colors"
                                    >
                                        {t('cancel')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <h2 className="text-3xl font-bold text-white">{user.username}</h2>
                                </div>
                                <p className="text-gray-400">{user.email}</p>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 pt-2">
                                    <span>{t('joined', { date: stats.joinDate })}</span>
                                    <span>•</span>
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditUsername(user.username);
                                        }}
                                        className="text-teal-400 hover:text-teal-300 transition-colors"
                                    >
                                        {t('editProfile')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-8 border-l border-white/10 pl-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.avgCpm}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{t('avgSpeed')} (CPM)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.bestCpm}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{t('bestSpeed')} (CPM)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.totalTests}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{t('totalTests')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-8">
                {/* Detailed Stats */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">{t('statistics')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/30 border border-white/5 p-6 rounded-xl backdrop-blur-sm">
                            <div className="text-gray-400 text-sm mb-1">{t('avgSpeed')}</div>
                            <div className="text-3xl font-bold text-teal-400">{stats.avgCpm} <span className="text-sm text-gray-500 font-normal">CPM</span></div>
                        </div>
                        <div className="bg-gray-900/30 border border-white/5 p-6 rounded-xl backdrop-blur-sm">
                            <div className="text-gray-400 text-sm mb-1">{t('timeSpent')}</div>
                            <div className="text-3xl font-bold text-purple-400">{stats.timeSpent}</div>
                        </div>
                    </div>

                    {/* Activity Heatmap */}
                    <ActivityHeatmap data={activityHistory} />
                </div>

                {/* Settings / Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={logout}
                        className="px-8 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                    >
                        {t('logout')}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
