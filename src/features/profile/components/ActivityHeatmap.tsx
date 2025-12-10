
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityData } from '../actions';
import { useTranslations } from 'next-intl';

interface ActivityHeatmapProps {
    data: ActivityData[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
    const t = useTranslations('Profile');
    const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

    const calendarData = useMemo(() => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);

        // Adjust start date to be a Sunday to align the grid properly (or Monday depending on locale, sticking to Sun for now)
        // 0 = Sunday
        while (startDate.getDay() !== 0) {
            startDate.setDate(startDate.getDate() - 1);
        }

        const dates: { date: string; count: number; level: number }[] = [];
        const dateMap = new Map(data.map(d => [d.date, d.count]));

        let maxCount = 0;
        data.forEach(d => {
            if (d.count > maxCount) maxCount = d.count;
        });

        const currentDate = new Date(startDate);
        while (currentDate <= today) {
            const dateParams = currentDate.toISOString().split('T')[0];
            const count = dateMap.get(dateParams) || 0;

            // Calculate level (0-4)
            let level = 0;
            if (count > 0) {
                if (count >= maxCount) level = 4;
                else if (count >= maxCount * 0.75) level = 3;
                else if (count >= maxCount * 0.5) level = 2;
                else level = 1;
            }

            dates.push({ date: dateParams, count, level });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }, [data]);

    // Group into weeks (columns) - wrapped in useMemo
    const weeks = useMemo(() => {
        const result: typeof calendarData[] = [];
        let currentWeek: typeof calendarData = [];

        calendarData.forEach((day, index) => {
            currentWeek.push(day);
            if (currentWeek.length === 7 || index === calendarData.length - 1) {
                result.push(currentWeek);
                currentWeek = [];
            }
        });

        return result;
    }, [calendarData]);

    const getLevelStyle = (level: number) => {
        switch (level) {
            case 0: return 'bg-gray-800/50 border-gray-700/30';
            case 1: return 'bg-teal-900/40 border-teal-800/50';
            case 2: return 'bg-teal-700/50 border-teal-600/50';
            case 3: return 'bg-teal-500/60 border-teal-400/50';
            case 4: return 'bg-teal-400 border-teal-300';
            default: return 'bg-gray-800/50 border-gray-700/30';
        }
    };

    // Generate month labels
    const months = useMemo(() => {
        const monthLabels: { name: string; weekIndex: number }[] = [];
        let currentMonth = -1;

        weeks.forEach((week, index) => {
            const firstDay = new Date(week[0].date);
            const month = firstDay.getMonth();

            if (month !== currentMonth) {
                // Determine label (short month name)
                const monthName = firstDay.toLocaleDateString('en-US', { month: 'short' });
                monthLabels.push({ name: monthName, weekIndex: index });
                currentMonth = month;
            }
        });
        return monthLabels;
    }, [weeks]);

    // ... (rest of render) ...

    return (
        <div className="bg-black/20 border border-white/5 rounded-2xl p-6 backdrop-blur-xl relative overflow-visible">
            {/* Changed from overflow-hidden to overflow-visible to allow tooltip to potentially escape if needed, though fixed positioning handles that. 
                However, sometimes stacking contexts clip. But fixed should break out. 
                Wait, 'backdrop-blur-xl' creates a stacking context. Fixed children are relative to viewport, usually fine.
                Let's ensure the tooltip container is rendered at root or check z-indexes. 
                The tooltip has z-50.
            */}

            {/* Ambient background glow - kept inside but ensure it doesn't block interactions */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-end mb-4 relative z-10">
                <h3 className="text-sm font-medium text-gray-400">{t('activityHeatmap')}</h3>
            </div>

            {/* Heatmap Grid */}
            <div className="relative z-10">
                <div className="flex gap-1 overflow-x-auto pb-1 custom-scrollbar">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-1">
                            {week.map((day) => (
                                <motion.div
                                    key={day.date}
                                    className={`w-3 h-3 rounded-[2px] border ${getLevelStyle(day.level)} cursor-pointer relative`}
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: Math.random() * 0.5, duration: 0.3 }}
                                    onMouseEnter={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setHoveredDay({
                                            date: day.date,
                                            count: day.count,
                                            x: rect.left + rect.width / 2,
                                            y: rect.top
                                        });
                                    }}
                                    onMouseLeave={() => setHoveredDay(null)}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Month Labels */}
                <div className="flex relative mt-2 h-4 text-[10px] text-gray-500 font-medium overflow-hidden pointer-events-none" aria-hidden="true">
                    {months.map((month, index) => (
                        <span
                            key={`${month.name}-${index}`}
                            style={{
                                position: 'absolute',
                                left: `${month.weekIndex * 16}px` // 3px width + 1px gap = 4px? No, w-3 is 0.75rem = 12px. Gap 1 (4px). Total 16px per col.
                                // w-3 in tailwind default theme is 12px. gap-1 is 4px. So 16px per column.
                            }}
                        >
                            {month.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Global Tooltip: Rendered via Portal to escape all stacking contexts */}
            {typeof document !== 'undefined' && hoveredDay && createPortal(
                <AnimatePresence>
                    {hoveredDay && (
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="fixed z-[9999] pointer-events-none"
                            style={{
                                left: hoveredDay.x,
                                top: hoveredDay.y - 8
                            }}
                        >
                            <div className="bg-gray-900/95 text-xs text-gray-200 px-3 py-2 rounded-lg border border-white/10 shadow-2xl backdrop-blur-md transform -translate-x-1/2 -translate-y-full whitespace-nowrap">
                                <span className="font-bold text-teal-400">{hoveredDay.count}</span> tests on <span className="text-gray-400">{hoveredDay.date}</span>
                                {/* Arrow */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900/95" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-gray-500 font-medium uppercase tracking-wider relative z-10">
                <span>Less</span>
                <div className={`w-3 h-3 rounded-[2px] border ${getLevelStyle(0)}`}></div>
                <div className={`w-3 h-3 rounded-[2px] border ${getLevelStyle(2)}`}></div>
                <div className={`w-3 h-3 rounded-[2px] border ${getLevelStyle(4)}`}></div>
                <span>More</span>
            </div>
        </div>
    );
}

