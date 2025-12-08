import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '../store/typingStore';
import { AnimatedNumber } from './AnimatedNumber';
import { useTranslations } from 'next-intl';

interface StatsDisplayProps {
  actionButton?: ReactNode; // 可选的右侧按钮
}

// 定义一个统一的、平滑的缓动动画，用于所有相关的动画效果
const transition = {
  duration: 0.4,
  ease: 'easeInOut' as const,
};

export function StatsDisplay({ actionButton }: StatsDisplayProps) {
  const t = useTranslations('Stats');

  // 使用 selector 订阅状态
  // 使用 selector 订阅状态
  const { mode, wpm, cpm, lpm, accuracy, timeLeft, status } = useTypingStore(
    useShallow((state) => ({
      mode: state.settings.mode,
      wpm: state.wpm,
      cpm: state.cpm,
      lpm: state.lpm,
      accuracy: state.accuracy,
      timeLeft: state.timeLeft,
      status: state.status,
    }))
  );

  // 根据模式决定显示哪些指标
  const getSpeedStats = () => {
    switch (mode) {
      case 'english':
        return [
          { value: wpm, label: t('wpm'), sublabel: t('sublabels.wordsPerMin') },
          { value: cpm, label: t('cpm'), sublabel: t('sublabels.charsPerMin') },
        ];
      case 'chinese':
        return [{ value: cpm, label: t('cpm'), sublabel: t('sublabels.charsPerMin') }];
      case 'coder':
        return [
          { value: lpm, label: t('lpm'), sublabel: t('sublabels.linesPerMin') },
          { value: cpm, label: t('cpm'), sublabel: t('sublabels.charsPerMin') },
        ];
      case 'custom':
        return [{ value: cpm, label: t('cpm'), sublabel: t('sublabels.charsPerMin') }];
      default:
        return [{ value: wpm, label: t('wpm'), sublabel: t('sublabels.wordsPerMin') }];
    }
  };

  const speedStats = getSpeedStats();

  return (
    <div className="flex items-center justify-between gap-4">
      <motion.div
        layout
        transition={transition}
        className="flex items-center justify-center gap-6 md:gap-12 flex-1"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {speedStats.map((stat) => (
            <motion.div
              layout
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <AnimatedNumber
                value={stat.value}
                className="text-4xl md:text-6xl font-extrabold text-teal-400 tracking-tighter tabular-nums"
              />
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div layout transition={transition} className="text-center">
          <AnimatedNumber
            value={timeLeft}
            className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${timeLeft <= 10 && status === 'running' ? 'text-red-400' : 'text-white'
              }`}
          />
          <div className="text-xs text-gray-400 mt-1">{t('sec')}</div>
          <div className="text-xs text-gray-500">{t('sublabels.seconds')}</div>
        </motion.div>

        <motion.div layout transition={transition} className="text-center">
          <AnimatedNumber
            value={accuracy}
            className={`text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${accuracy < 90 ? 'text-yellow-400' : 'text-emerald-400'
              }`}
          />
          <div className="text-xs text-gray-400 mt-1">{t('acc')}</div>
          <div className="text-xs text-gray-500">{t('sublabels.accuracy')}</div>
        </motion.div>
      </motion.div>

      {actionButton && <div className="flex items-end pb-2">{actionButton}</div>}
    </div>
  );
}