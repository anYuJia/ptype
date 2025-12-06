'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function TypewriterTitle() {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const targetTitle = 'PType';
        let currentIndex = 0;

        // Initial delay before typing starts
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < targetTitle.length) {
                    setDisplayedTitle(targetTitle.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    setShowCursor(false);
                    clearInterval(interval);
                }
            }, 500);

            return () => clearInterval(interval);
        }, 500);

        return () => clearTimeout(startTimeout);
    }, []);

    return (
        <div className="flex items-center gap-4 w-[240px]">
            <div className="relative w-16 h-16">
                <Image
                    src="/logo.png"
                    alt="PType Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-teal-400 tracking-tight leading-none min-h-[40px] flex items-center">
                    {displayedTitle}
                    {showCursor && (
                        <motion.span
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            className="inline-block ml-1 -translate-y-0.5"
                        >
                            |
                        </motion.span>
                    )}
                </h1>
            </div>
        </div>
    );
}
