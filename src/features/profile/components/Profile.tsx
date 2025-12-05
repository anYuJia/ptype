import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/features/auth/store/authStore';
import Image from 'next/image';

export function Profile() {
    const { user, logout } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);

    const [editUsername, setEditUsername] = useState(user?.username || '');

    const [stats, setStats] = useState({
        joinDate: '-',
        totalTests: 0,
        avgWpm: 0,
        bestWpm: 0,
        timeSpent: '0m',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    // Optionally update user in auth store if needed, but we rely on authStore for user info
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: editUsername }),
            });

            if (res.ok) {
                // Ideally update the global auth store user here
                // For now we just close edit mode as the UI will reflect the input value if we updated the store
                // But since we don't have updateStore method easily available here without checking authStore, 
                // we might need to reload or just assume success.
                // Let's assume we need to trigger a re-fetch or update local user object if possible.
                // Since `user` comes from `useAuthStore`, we should probably update it there.
                // Assuming `login` or a `setUser` exists. If not, we might see stale data.
                // For this step, let's just close editing.
                setIsEditing(false);
                window.location.reload(); // Simple way to refresh user data in store
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <p>Please login to view your profile</p>
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
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditUsername(user.username);
                                        }}
                                        className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
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
                                    <span>Joined {stats.joinDate}</span>
                                    <span>•</span>
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditUsername(user.username);
                                        }}
                                        className="text-teal-400 hover:text-teal-300 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-8 border-l border-white/10 pl-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.bestWpm}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Best WPM</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{stats.totalTests}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Tests</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-8">
                {/* Detailed Stats */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/30 border border-white/5 p-6 rounded-xl backdrop-blur-sm">
                            <div className="text-gray-400 text-sm mb-1">Average Speed</div>
                            <div className="text-3xl font-bold text-teal-400">{stats.avgWpm} <span className="text-sm text-gray-500 font-normal">WPM</span></div>
                        </div>
                        <div className="bg-gray-900/30 border border-white/5 p-6 rounded-xl backdrop-blur-sm">
                            <div className="text-gray-400 text-sm mb-1">Time Spent</div>
                            <div className="text-3xl font-bold text-purple-400">{stats.timeSpent}</div>
                        </div>
                    </div>

                    {/* Activity Heatmap Placeholder */}
                    <div className="bg-gray-900/30 border border-white/5 p-6 rounded-xl backdrop-blur-sm min-h-[200px] flex items-center justify-center text-gray-500">
                        Activity Heatmap Coming Soon
                    </div>
                </div>

                {/* Settings / Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={logout}
                        className="px-8 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
