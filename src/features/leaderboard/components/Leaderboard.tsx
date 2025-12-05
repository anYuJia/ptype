import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CustomSelect } from '@/components/CustomSelect';
import {
    DifficultyLevel,
    ChineseStyle,
    ProgrammingLanguage,
    DIFFICULTY_OPTIONS,
    CHINESE_STYLE_OPTIONS,
    PROGRAMMING_LANGUAGE_OPTIONS,
    PROGRAMMING_LANGUAGE_LABELS,
    CHINESE_STYLE_LABELS
} from '@/lib/constants';

// Mock Data
const MOCK_DATA = {
    english: [
        { id: '1', rank: 1, username: 'SpeedDemon', wpm: 156, accuracy: 99.5, date: '2h ago', avatar: null },
        { id: '2', rank: 2, username: 'TypingMaster', wpm: 142, accuracy: 98.2, date: '5h ago', avatar: null },
        { id: '3', rank: 3, username: 'KeyboardWarrior', wpm: 138, accuracy: 97.8, date: '1d ago', avatar: null },
        { id: '4', rank: 4, username: 'CodeNinja', wpm: 125, accuracy: 96.5, date: '2d ago', avatar: null },
        { id: '5', rank: 5, username: 'PixelPerfect', wpm: 118, accuracy: 98.0, date: '3d ago', avatar: null },
        { id: '6', rank: 6, username: 'ByteMe', wpm: 112, accuracy: 95.5, date: '1w ago', avatar: null },
        { id: '7', rank: 7, username: 'NullPointer', wpm: 105, accuracy: 94.2, date: '1w ago', avatar: null },
    ],
    chinese: [
        { id: '1', rank: 1, username: '打字机神', wpm: 220, accuracy: 99.8, date: '1h ago', avatar: null },
        { id: '2', rank: 2, username: '键道中人', wpm: 198, accuracy: 98.5, date: '3h ago', avatar: null },
        { id: '3', rank: 3, username: '极速蜗牛', wpm: 185, accuracy: 97.2, date: '1d ago', avatar: null },
        { id: '4', rank: 4, username: '指尖飞舞', wpm: 170, accuracy: 96.8, date: '2d ago', avatar: null },
        { id: '5', rank: 5, username: '键盘侠', wpm: 165, accuracy: 95.0, date: '4d ago', avatar: null },
    ],
    coder: [
        { id: '1', rank: 1, username: 'VimUser', wpm: 98, accuracy: 99.0, date: '30m ago', avatar: null },
        { id: '2', rank: 2, username: 'FullStack', wpm: 85, accuracy: 97.5, date: '2h ago', avatar: null },
        { id: '3', rank: 3, username: 'BugHunter', wpm: 82, accuracy: 96.8, date: '5h ago', avatar: null },
        { id: '4', rank: 4, username: 'DevOps', wpm: 78, accuracy: 95.5, date: '1d ago', avatar: null },
        { id: '5', rank: 5, username: 'GitPush', wpm: 75, accuracy: 98.2, date: '3d ago', avatar: null },
    ]
};

type Mode = 'english' | 'chinese' | 'coder';

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
};

export function Leaderboard() {
    const [activeMode, setActiveMode] = useState<Mode>('english');
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
    const [chineseStyle, setChineseStyle] = useState<ChineseStyle>('modern');
    const [programmingLanguage, setProgrammingLanguage] = useState<ProgrammingLanguage>('python');

    const data = MOCK_DATA[activeMode];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Filters Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                {/* Left: Main Mode Toggle */}
                <div className="bg-gray-900/50 p-1 rounded-xl border border-white/5 backdrop-blur-sm flex gap-1">
                    {[
                        { id: 'english', label: 'English' },
                        { id: 'chinese', label: '中文' },
                        { id: 'coder', label: 'Code' }
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setActiveMode(mode.id as Mode)}
                            className={`
                relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300
                ${activeMode === mode.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
              `}
                        >
                            {activeMode === mode.id && (
                                <motion.div
                                    layoutId="leaderboardMode"
                                    className="absolute inset-0 bg-gray-800 rounded-lg shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{mode.label}</span>
                        </button>
                    ))}
                </div>

                {/* Right: Sub Filters (Dropdowns) */}
                <motion.div
                    layout
                    className="flex items-center gap-4 relative"
                >
                    {/* Difficulty - Available for ALL modes */}
                    <motion.div
                        layout
                        className="flex items-center gap-2"
                    >
                        <span className="text-sm text-gray-500">难度:</span>
                        <CustomSelect
                            value={difficulty}
                            options={DIFFICULTY_OPTIONS}
                            labels={DIFFICULTY_LABELS}
                            onChange={setDifficulty}
                            className="w-24"
                        />
                    </motion.div>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {/* Chinese Style - Only for Chinese mode */}
                        {activeMode === 'chinese' && (
                            <motion.div
                                key="chinese-style"
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-sm text-gray-500">文体:</span>
                                <CustomSelect
                                    value={chineseStyle}
                                    options={CHINESE_STYLE_OPTIONS}
                                    labels={CHINESE_STYLE_LABELS}
                                    onChange={setChineseStyle}
                                    className="w-24"
                                />
                            </motion.div>
                        )}

                        {/* Programming Language - Only for Coder mode */}
                        {activeMode === 'coder' && (
                            <motion.div
                                key="prog-lang"
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-sm text-gray-500">语言:</span>
                                <CustomSelect
                                    value={programmingLanguage}
                                    options={PROGRAMMING_LANGUAGE_OPTIONS}
                                    labels={PROGRAMMING_LANGUAGE_LABELS}
                                    onChange={setProgrammingLanguage}
                                    className="w-32"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Top 3 Podium */}
            <div className="flex justify-center items-end gap-6 mb-16 px-4">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-400 bg-gray-800 flex items-center justify-center mb-4 relative shadow-[0_0_20px_rgba(156,163,175,0.3)]">
                        <span className="text-2xl font-bold text-gray-400">2</span>
                        <div className="absolute -bottom-3 bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                            #2
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-200 mb-1">{data[1]?.username}</div>
                        <div className="text-teal-400 font-mono text-xl">{data[1]?.wpm} <span className="text-xs text-gray-500">WPM</span></div>
                    </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center -translate-y-4">
                    <div className="relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">👑</div>
                        <div className="w-28 h-28 rounded-full border-4 border-yellow-400 bg-gray-800 flex items-center justify-center mb-4 relative shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                            <span className="text-4xl font-bold text-yellow-400">1</span>
                            <div className="absolute -bottom-3 bg-gray-800 text-yellow-400 text-xs px-3 py-0.5 rounded-full border border-yellow-900/50">
                                #1
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-white text-lg mb-1">{data[0]?.username}</div>
                        <div className="text-teal-400 font-mono text-3xl font-bold">{data[0]?.wpm} <span className="text-sm text-gray-500 font-normal">WPM</span></div>
                        <div className="text-xs text-gray-500 mt-1">{data[0]?.accuracy}% Accuracy</div>
                    </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-orange-700 bg-gray-800 flex items-center justify-center mb-4 relative shadow-[0_0_20px_rgba(194,65,12,0.3)]">
                        <span className="text-2xl font-bold text-orange-700">3</span>
                        <div className="absolute -bottom-3 bg-gray-800 text-orange-700 text-xs px-2 py-0.5 rounded-full border border-gray-800">
                            #3
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-200 mb-1">{data[2]?.username}</div>
                        <div className="text-teal-400 font-mono text-xl">{data[2]?.wpm} <span className="text-xs text-gray-500">WPM</span></div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">User</div>
                    <div className="col-span-2 text-right">WPM</div>
                    <div className="col-span-2 text-right">Accuracy</div>
                    <div className="col-span-2 text-right">Date</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-white/5">
                    {data.slice(3).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors group"
                        >
                            <div className="col-span-1 font-mono text-gray-500 group-hover:text-gray-300">
                                #{item.rank}
                            </div>
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                                    {item.username[0].toUpperCase()}
                                </div>
                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                    {item.username}
                                </span>
                            </div>
                            <div className="col-span-2 text-right font-mono text-teal-400 font-bold">
                                {item.wpm}
                            </div>
                            <div className="col-span-2 text-right font-mono text-gray-400">
                                {item.accuracy}%
                            </div>
                            <div className="col-span-2 text-right text-xs text-gray-600">
                                {item.date}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div >
    );
}
