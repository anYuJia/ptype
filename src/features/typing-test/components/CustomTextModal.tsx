import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface CustomTextModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (text: string) => void;
}

export function CustomTextModal({ isOpen, onClose, onConfirm }: CustomTextModalProps) {
    const t = useTranslations('Settings');
    const [text, setText] = useState('');

    const handleConfirm = () => {
        if (text.trim()) {
            onConfirm(text);
            setText('');
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
                        className="relative bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">{t('customText')}</h3>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('customTextPlaceholder')}
                            className="w-full h-64 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none mb-6"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!text.trim()}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-medium rounded-lg transition-colors"
                            >
                                {t('startCustomTest')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
