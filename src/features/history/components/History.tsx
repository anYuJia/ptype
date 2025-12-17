import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/features/auth/store/authStore';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import {
    ChineseStyle,
    ProgrammingLanguage,
    CHINESE_STYLE_LABELS,
    PROGRAMMING_LANGUAGE_LABELS,
} from '@/lib/constants';
import { getHistory, getHistoryStats } from '../actions';

interface HistoryDataItem {
    id: string;
    wpm: number;
    cpm: number;
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
    createdAt: string | Date;
    date: string;
    index: number;
}

export function History() {
    const t = useTranslations('History');
    const tSettings = useTranslations('Settings');
    const locale = useLocale();
    const { isAuthenticated } = useAuthStore();

    const [historyData, setHistoryData] = useState<HistoryDataItem[]>([]);
    const [stats, setStats] = useState({
        totalTests: 0,
        avgCpm: 0,
        bestCpm: 0,
        totalTime: '0m'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If not authenticated, we might want to clear specific user data or show empty state.
                // But generally trying to fetch might return empty list or unauthorized error which is handled.
                // However, visually it's better to explicitly reload.

                const [historyResult, statsResult] = await Promise.all([
                    getHistory(),
                    getHistoryStats()
                ]);

                if (historyResult.success && historyResult.data) {
                    // API 返回的数据是按时间倒序（最新在前）
                    // 图表需要按时间正序显示（最旧在左，最新在右）
                    const chronologicalData = [...historyResult.data].reverse();

                    const formattedHistory = chronologicalData.map((item, index) => ({
                        ...item,
                        index, // Add unique index for X-axis
                        date: new Date(item.createdAt).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }),
                        cpm: Number(item.cpm),
                        accuracy: Number(item.accuracy),
                    }));

                    setHistoryData(formattedHistory);
                } else {
                    // Handle logout case or empty state
                    setHistoryData([]);
                }

                if (statsResult.success && statsResult.data) {
                    setStats(statsResult.data);
                } else {
                    setStats({
                        totalTests: 0,
                        avgCpm: 0,
                        bestCpm: 0,
                        totalTime: '0m'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch history data', error);
                setHistoryData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [locale, isAuthenticated]);

    const getSubModeLabel = (mode: string, subMode: string | null) => {
        if (!subMode) return null;
        if (mode === 'chinese') return CHINESE_STYLE_LABELS[subMode as ChineseStyle];
        if (mode === 'coder') return PROGRAMMING_LANGUAGE_LABELS[subMode as ProgrammingLanguage];
        // Special mapping for 'english' subModes if any, or just return subMode
        return subMode;
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto space-y-8 animate-pulse">
                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-900/50 border border-white/5 p-4 rounded-xl h-24">
                            <div className="h-4 w-20 bg-gray-800 rounded mb-4"></div>
                            <div className="h-8 w-16 bg-gray-800 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Chart Skeleton */}
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 h-[300px]">
                    <div className="h-full w-full bg-gray-800/20 rounded-xl"></div>
                </div>

                {/* List Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 w-24 bg-gray-800 rounded"></div>
                    <div className="bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden">
                        <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02] h-10"></div>
                        <div className="divide-y divide-white/5">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="px-6 py-4 h-16 bg-gray-800/10"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl mx-auto space-y-8"
        >
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: t('totalTests'), value: stats.totalTests, icon: '📝' },
                    { label: t('averageSpeed'), value: stats.avgCpm, unit: 'CPM', icon: '⚡' },
                    { label: t('bestSpeed'), value: stats.bestCpm, unit: 'CPM', icon: '🏆' },
                    { label: t('totalTime'), value: stats.totalTime, icon: '⏱️' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900/50 border border-white/5 p-4 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-gray-400 text-xs font-medium">{stat.label}</span>
                            <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{stat.icon}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                            {stat.unit && <span className="text-xs text-teal-500 font-medium">{stat.unit}</span>}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm h-[300px] relative"
            >
                <h3 className="text-sm font-medium text-gray-400 mb-4 absolute top-6 left-6 z-10">{t('cpmTrend')}</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCpm" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.3} />
                        <XAxis
                            dataKey="index"
                            stroke="#6b7280"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            tickFormatter={(index) => historyData[index]?.date ?? ''}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                fontSize: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                            labelFormatter={(index) => historyData[index]?.date ?? ''}
                            cursor={{ stroke: '#14b8a6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="cpm"
                            stroke="#14b8a6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCpm)"
                            activeDot={{ r: 5, strokeWidth: 2, stroke: '#14b8a6', fill: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Recent Activity List */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 px-1">{t('recentActivity')}</h3>
                <div className="bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider bg-white/[0.02]">
                        <div className="col-span-2">{t('table.date')}</div>
                        <div className="col-span-3">{t('table.mode')}</div>
                        <div className="col-span-2 text-center">{t('table.difficulty')}</div>
                        <div className="col-span-1 text-center">{t('table.time')}</div>
                        <div className="col-span-2 text-center">{t('table.cpm')}</div>
                        <div className="col-span-2 text-center">{t('table.accuracy')}</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {historyData.slice().reverse().map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-white/5 transition-colors group text-sm"
                            >
                                <div className="col-span-2 text-gray-400 font-mono text-xs">
                                    {item.date}
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <span className={`
px - 2 py - 0.5 rounded text - [10px] uppercase font - bold tracking - wider border
                    ${item.mode === 'english' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            item.mode === 'chinese' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                        }
`}>
                                        {tSettings(`modeLabels.${item.mode}`)}
                                    </span>
                                    {item.subMode && (
                                        <span className="text-xs text-gray-500 truncate max-w-[100px]" title={getSubModeLabel(item.mode, item.subMode) || ''}>
                                            {getSubModeLabel(item.mode, item.subMode)}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 text-center">
                                    <span className={`
text - xs font - medium
                    ${item.difficulty === 'easy' ? 'text-green-400' :
                                            item.difficulty === 'medium' ? 'text-yellow-400' :
                                                'text-red-400'
                                        }
`}>
                                        {tSettings(`difficultyLabels.${item.difficulty}`)}
                                    </span>
                                </div>
                                <div className="col-span-1 text-center text-gray-500 font-mono text-xs">
                                    {item.duration}s
                                </div>
                                <div className="col-span-2 text-center font-mono font-bold text-teal-400">
                                    {item.cpm}
                                </div>
                                <div className="col-span-2 text-center font-mono text-gray-400">
                                    {Math.floor(item.accuracy)}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

