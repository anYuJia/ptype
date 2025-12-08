'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'zh' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <motion.button
            onClick={toggleLocale}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
        >
            <span className="font-bold text-sm">
                {locale === 'en' ? 'EN' : '中'}
            </span>
        </motion.button>
    );
}
