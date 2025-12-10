import { motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useTypingStore } from '../store/typingStore';
import { Button } from '@/components/ui/Button';
import { CpmChart } from './CpmChart';
import { useTranslations } from 'next-intl';

export function ResultsCard() {
  const t = useTranslations('Results');
  const tStats = useTranslations('Stats');
  const tSettings = useTranslations('Settings');

  // 从 Store 获取结果数据和 restart action
  const {
    settings,
    wpm,
    cpm,
    lpm,
    accuracy,
    errors,
    cpmHistory,
    restart,
  } = useTypingStore(
    useShallow((state) => ({
      settings: state.settings,
      wpm: state.wpm,
      cpm: state.cpm,
      lpm: state.lpm,
      accuracy: state.accuracy,
      errors: state.errors,
      cpmHistory: state.cpmHistory,
      restart: state.resetTest, // restart 对应 resetTest (回到 idle)
    }))
  );

  const { mode, difficulty, chineseStyle, programmingLanguage, duration } = settings;

  // 根据模式决定显示哪些速度指标
  const getSpeedStats = () => {
    switch (mode) {
      case 'english':
        return [
          { value: wpm, label: tStats('wpm'), sublabel: tStats('sublabels.wordsPerMin'), color: 'text-teal-400' },
          { value: cpm, label: tStats('cpm'), sublabel: tStats('sublabels.charsPerMin'), color: 'text-cyan-400' },
        ];
      case 'chinese':
        return [
          { value: cpm, label: tStats('cpm'), sublabel: tStats('sublabels.charsPerMin'), color: 'text-teal-400' },
        ];
      case 'coder':
        return [
          { value: lpm, label: tStats('lpm'), sublabel: tStats('sublabels.linesPerMin'), color: 'text-teal-400' },
          { value: cpm, label: tStats('cpm'), sublabel: tStats('sublabels.charsPerMin'), color: 'text-cyan-400' },
        ];
      case 'custom':
        return [
          { value: cpm, label: tStats('cpm'), sublabel: tStats('sublabels.charsPerMin'), color: 'text-teal-400' },
        ];
      default:
        return [{ value: wpm, label: tStats('wpm'), sublabel: tStats('sublabels.wordsPerMin'), color: 'text-teal-400' }];
    }
  };

  const speedStats = getSpeedStats();

  const getModeLabel = () => {
    switch (mode) {
      case 'english':
        return tSettings('modeLabels.english');
      case 'chinese':
        return `${tSettings('modeLabels.chinese')} (${chineseStyle === 'modern' ? '现代文' : '古文'})`; // 临时处理，后续可以优化
      case 'coder':
        return `${tSettings('modeLabels.coder')} (${programmingLanguage})`;
      case 'custom':
        return tSettings('modeLabels.custom');
      default:
        return mode;
    }
  };

  return (
    <motion.div
      // ... (keep className)
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('title')}
      </motion.h2>

      {/* 测试详情 */}
      <motion.div
        className="flex justify-center gap-3 mb-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
          {getModeLabel()}
        </span>
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 capitalize">
          {tSettings(`difficultyLabels.${difficulty}`)}
        </span>
        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
          {duration}s
        </span>
      </motion.div>

      {/* 主要统计 - 单行显示 */}
      <div className="flex items-center justify-center gap-8 md:gap-12 mb-8 flex-wrap">
        {/* 速度指标 - 根据模式显示 */}
        {speedStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className={`text-5xl md:text-6xl font-extrabold ${stat.color} tabular-nums`}>{stat.value}</div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.sublabel}</div>
          </motion.div>
        ))}

        {/* 准确率 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + speedStats.length * 0.1 }}
        >
          <div className="text-5xl md:text-6xl font-extrabold text-emerald-400 tabular-nums">{accuracy}%</div>
          <div className="text-sm text-gray-400 mt-1">{tStats('acc')}</div>
          <div className="text-xs text-gray-500">{tStats('sublabels.accuracy')}</div>
        </motion.div>

        {/* 错误数 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + speedStats.length * 0.1 }}
        >
          <div className="text-5xl md:text-6xl font-extrabold text-red-400 tabular-nums">{errors}</div>
          <div className="text-sm text-gray-400 mt-1">{tStats('errors')}</div>
          <div className="text-xs text-gray-500">{tStats('sublabels.errorCount')}</div>
        </motion.div>
      </div>

      {/* WPM 曲线图 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-sm text-gray-400 mb-4">
          CPM Trend
        </h3>
        <CpmChart
          data={cpmHistory}
          unit="CPM"
        />
      </motion.div>

      {/* 重新开始按钮 */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button size="lg" onClick={restart}>
          {t('playAgain')}
        </Button>
      </motion.div>

      <motion.p
        className="text-center text-gray-500 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {t.rich('restartHint', {
          tab: () => <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">Tab</kbd>,
          enter: () => <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">Enter</kbd>
        })}
      </motion.p>
    </motion.div>
  );
}
