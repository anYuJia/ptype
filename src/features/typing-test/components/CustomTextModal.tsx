import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    getCustomTexts,
    createCustomText,
    updateCustomText,
    deleteCustomText,
    CustomText
} from '@/features/custom-text/actions';
import { sign } from '@/lib/security';

interface CustomTextModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (text: string) => void;
}

export function CustomTextModal({ isOpen, onClose, onConfirm }: CustomTextModalProps) {
    const t = useTranslations('Settings');

    // Editor State
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Data State
    const [savedTexts, setSavedTexts] = useState<CustomText[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch custom texts function
    const fetchTexts = async () => {
        setIsLoading(true);
        const res = await getCustomTexts();
        if (res.success && res.data) {
            setSavedTexts(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchTexts();
        }
    }, [isOpen]);

    const handleSelect = (item: CustomText) => {
        setSelectedId(item.id);
        setTitle(item.title);
        setText(item.content);
        setError(null);
    };

    const handleNew = () => {
        setSelectedId(null);
        setTitle('');
        setText('');
        setError(null);
    };

    const handleSave = async () => {
        if (!title.trim() || !text.trim()) {
            setError(t('titleAndContentRequired'));
            return;
        }

        setIsSaving(true);
        let res;
        if (selectedId) {
            const input = { id: selectedId, title, content: text };
            const signature = await sign(input);
            res = await updateCustomText(input, signature);
        } else {
            const input = { title, content: text };
            const signature = await sign(input);
            res = await createCustomText(input, signature);
        }

        if (res.success && res.data) {
            await fetchTexts();
            // If created new, select it
            if (!selectedId) {
                handleSelect(res.data);
            } else {
                // If updated, refresh current selection (in case title changed)
                handleSelect(res.data);
            }
        } else {
            setError(res.error || 'Failed to save');
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this text?')) return;

        const input = { id };
        const signature = await sign(input);
        const res = await deleteCustomText(input, signature);
        if (res.success) {
            if (selectedId === id) {
                handleNew();
            }
            fetchTexts();
        }
    };

    const handleStart = () => {
        if (text.trim()) {
            onConfirm(text);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[600px]"
                    >
                        <div className="flex h-full">
                            {/* Sidebar: List */}
                            <div className="w-1/3 border-r border-gray-800 flex flex-col bg-gray-900/80 backdrop-blur-sm">
                                <div className="p-5 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900/95 z-10">
                                    <h3 className="font-bold text-gray-200 text-sm tracking-wide uppercase">{t('savedTexts')}</h3>
                                    <button
                                        onClick={handleNew}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        {t('new')}
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-gray-500 space-y-2">
                                            <div className="w-5 h-5 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
                                            <span className="text-xs">Loading...</span>
                                        </div>
                                    ) : savedTexts.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 text-gray-600 text-center space-y-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                            <span className="text-sm">{t('noSavedTexts')}</span>
                                        </div>
                                    ) : (
                                        savedTexts.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleSelect(item)}
                                                className={`
                                                    group relative w-full text-left p-3.5 rounded-xl cursor-pointer transition-all duration-200
                                                    ${selectedId === item.id
                                                        ? 'bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                                        : 'bg-transparent hover:bg-gray-800/40'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className={`text-sm font-semibold truncate mb-1 transition-colors ${selectedId === item.id ? 'text-teal-400' : 'text-gray-300 group-hover:text-white'}`}>
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[10px] text-gray-500 font-mono">
                                                            {new Date(item.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>

                                                    {/* Indicator for selection */}
                                                    {selectedId === item.id && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(20,184,166,0.8)] mt-1.5" />
                                                    )}
                                                </div>

                                                <button
                                                    onClick={(e) => handleDelete(item.id, e)}
                                                    className={`
                                                        absolute bottom-3 right-3 p-1.5 rounded-lg
                                                        text-gray-500 hover:text-red-400 hover:bg-red-400/10
                                                        transition-all opacity-0 group-hover:opacity-100
                                                        ${selectedId === item.id ? 'opacity-0' : ''} 
                                                    `}
                                                    title={t('delete')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Main: Editor */}
                            <div className="flex-1 flex flex-col p-6 bg-gray-900 h-full overflow-y-auto">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={10}
                                        placeholder={t('customTitlePlaceholder')}
                                        className="w-full bg-transparent text-xl font-bold text-white placeholder-gray-600 focus:outline-none border-b border-transparent focus:border-teal-500/50 pb-2 transition-colors"
                                    />
                                </div>

                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('customTextPlaceholder')}
                                    className="flex-1 w-full bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-colors resize-none mb-4 custom-scrollbar"
                                />

                                {error && (
                                    <div className="text-red-400 text-sm mb-4 px-2">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving || !title.trim() || !text.trim()}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : t('save')}
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={onClose}
                                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                                        >
                                            {t('cancel')}
                                        </button>
                                        <button
                                            onClick={handleStart}
                                            disabled={!text.trim()}
                                            className="px-6 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium rounded-lg transition-colors text-sm"
                                        >
                                            {t('startCustomTest')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
