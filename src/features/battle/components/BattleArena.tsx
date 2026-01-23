import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BattlePlayer, BattleState, BattleConfig } from '../hooks/useBattleSocket';
import { TextDisplay } from '@/features/typing-test/components/TextDisplay';
import { useTypingStore } from '@/features/typing-test/store/typingStore';
import { useTypingEngine } from '@/features/typing-test/hooks/useTypingEngine';

// Need to reuse TextDisplay logic but hook it up to socket progress
interface BattleArenaProps {
    roomId: string;
    players: Record<string, BattlePlayer>;
    status: BattleState;
    countdown: number | null;
    startTime: number | null;
    winner: string | null;
    myId: string;
    onReady: (ready: boolean) => void;
    onUpdateProgress: (wpm: number, progress: number, correctChars: number) => void;
    onLeave: () => void;
    config?: BattleConfig | null;
}

export function BattleArena({
    roomId,
    players,
    status,
    countdown,
    startTime,
    winner,
    myId,
    onReady,
    onUpdateProgress,
    onLeave,
    config
}: BattleArenaProps) {
    const t = useTranslations('Battle.arena');
    // Use existing engine
    const { restart, inputHandlers } = useTypingEngine();
    const { wpm, status: engineStatus, targetText, typedText, initTest, updateSettings, correctChars } = useTypingStore();
    const inputRef = useRef<HTMLInputElement>(null);

    const progress = targetText.length > 0 ? (typedText.length / targetText.length) * 100 : 0;

    // Fallback to find "me" if myId logic is shaky, but players[socket.id] is standard
    console.log('BattleArena Render:', { myId, playersKeys: Object.keys(players) });
    const opponent = Object.values(players).find(p => p.id !== myId);

    // Initialize Game Config (Text & Mode)
    useEffect(() => {
        if (config) {
            console.log("Initializing Arena with config:", config);

            // 1. Set Custom Text
            updateSettings({
                mode: 'custom',
                customText: config.text,
                duration: config.mode === 'time' ? config.timeLimit : 0,
            });

            // 2. Init Test to apply text
            initTest(true);
        }
    }, [config, updateSettings, initTest]);

    // Sync engine progress to socket
    useEffect(() => {
        if (status === 'playing' && engineStatus === 'running') {
            // Recalculate progress based on latest state
            const currentProgress = targetText.length > 0 ? (typedText.length / targetText.length) * 100 : 0;
            onUpdateProgress(wpm, currentProgress, correctChars);
        }
    }, [wpm, typedText, targetText, correctChars, status, engineStatus, onUpdateProgress]);

    // Handle Game Start
    useEffect(() => {
        if (status === 'playing') {
            console.log("Battle Started! Focusing input...");
            // Force focus
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [status]);


    // Handle inputs
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (status !== 'playing') return;
        inputHandlers.onKeyDown(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (status !== 'playing') return;
        inputHandlers.onChange(e);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-8 flex flex-col gap-8 h-[600px] relative">
            {/* Header: Scoreboard */}
            <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                        {t('you')}
                    </div>
                    <div>
                        <div className="text-xl font-bold text-gray-200">{players[myId]?.wpm || 0} WPM</div>
                        <div className="w-32 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-teal-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${players[myId]?.progress || 0}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Message */}
                <div className="text-center">
                    {status === 'waiting' && <span className="text-yellow-400 font-bold animate-pulse">{t('waiting')}</span>}
                    {status === 'starting' && <span className="text-teal-400 font-bold text-4xl">{countdown}</span>}
                    {status === 'playing' && (
                        <div className="flex flex-col items-center">
                            <span className="text-green-400 font-bold">
                                {config?.mode === 'time' ? t('timeAttack') : t('raceProgress')}
                            </span>
                            {/* Server timer handles end, but we can show local timer if available */}
                        </div>
                    )}
                    {status === 'finished' && <span className="text-purple-400 font-bold">{t('gameOver')}</span>}
                </div>

                <div className="flex items-center gap-4 text-right">
                    <div>
                        <div className="text-xl font-bold text-gray-200">
                            {opponent ? `${opponent.wpm} WPM` : '---'}
                        </div>
                        <div className="w-32 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden flex justify-end">
                            <motion.div
                                className="h-full bg-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${opponent?.progress || 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                        {t('opponent')}
                    </div>
                </div>
            </div>

            {/* Arena: Text Display */}
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center">
                {status === 'finished' && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gray-800 p-8 rounded-2xl border border-teal-500/30 text-center space-y-4"
                        >
                            <h2 className="text-4xl font-bold text-white mb-2">
                                {winner === myId ? t('winner') : (winner ? t('gameOver') : t('tie'))}
                            </h2>
                            <p className="text-gray-400">{winner === myId ? `Good Job!` : `Better luck next time!`}</p>
                            <button
                                onClick={onLeave}
                                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold"
                            >
                                {t('leave')}
                            </button>
                        </motion.div>
                    </div>
                )}

                {status === 'idle' || status === 'waiting' || status === 'starting' ? (
                    <div className="text-center space-y-6">
                        <div className="text-gray-500">{t('spectating')}</div>
                        {status !== 'starting' && (
                            <button
                                onClick={() => onReady(!players[myId]?.ready)}
                                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${players[myId]?.ready ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            >
                                {players[myId]?.ready ? t('cancelReady') : t('ready')}
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <TextDisplay inputRef={inputRef} inputHandlers={inputHandlers} />
                        {/* Hidden Input for Typing */}
                        <input
                            ref={inputRef}
                            type="text"
                            className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default"
                            autoFocus
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            onBlur={() => {
                                // Keep focus if playing
                                if (status === 'playing') inputRef.current?.focus();
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
