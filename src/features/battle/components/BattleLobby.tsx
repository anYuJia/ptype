import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { BattleConfig, BattleRoom } from '../hooks/useBattleSocket'
import { generateText } from '@/lib/utils/textGenerator'
import {
  CHINESE_STYLE_OPTIONS,
  PROGRAMMING_LANGUAGE_OPTIONS,
  ChineseStyle,
  ProgrammingLanguage,
  DEFAULT_CHINESE_STYLE,
  DEFAULT_PROGRAMMING_LANGUAGE,
} from '@/lib/constants'
import { useAuthStore } from '@/features/auth/store/authStore'
import { getCustomTexts, CustomText } from '@/features/custom-text/actions'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'

// Custom Select Component for cleaner UI
interface SelectProps<T> {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  disabled?: boolean
  placeholder?: string
}

function Select<T extends string>({
  value,
  onChange,
  options,
  disabled = false,
  placeholder,
}: SelectProps<T>) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder || value

  return (
    <Dropdown
      width="w-full"
      disabled={disabled}
      trigger={
        <div
          className={`
                    w-full px-4 py-3 rounded-xl border flex justify-between items-center transition-all duration-200 group
                    ${
                      disabled
                        ? 'bg-gray-900/30 border-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-900/60 border-gray-700 text-gray-200 cursor-pointer hover:border-teal-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-teal-900/10 active:scale-98'
                    }
                `}
        >
          <span
            className={`font-medium tracking-wide ${disabled ? 'text-gray-600' : 'text-gray-200 group-hover:text-teal-400'}`}
          >
            {selectedLabel}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform duration-300 ${disabled ? 'text-gray-700' : 'text-gray-500 group-hover:text-teal-400 group-hover:rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      }
    >
      <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 space-y-1">
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            active={value === option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${value === option.value ? 'bg-teal-500/10 text-teal-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
          >
            {option.label}
          </DropdownItem>
        ))}
      </div>
    </Dropdown>
  )
}

// Toast Component for transient messages
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-red-900/90 backdrop-blur-md border border-red-500/50 text-red-100 rounded-xl shadow-2xl shadow-red-900/20"
    >
      <div className="p-1 rounded-full bg-red-500/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-red-800/50 rounded-lg transition-colors text-red-400 hover:text-red-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </motion.div>
  )
}

interface BattleLobbyProps {
  onCreate: (config: Partial<BattleConfig>) => void
  onJoin: (roomId: string) => void
  onRefresh: () => void
  rooms: BattleRoom[]
  error: string | null
}

export function BattleLobby({
  onCreate,
  onJoin,
  onRefresh,
  rooms,
  error,
}: BattleLobbyProps) {
  const t = useTranslations('Battle')
  const [roomIdInput, setRoomIdInput] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  // Sync prop error to local state with translation
  useEffect(() => {
    if (error) {
      let translatedError = error
      const errorMap: Record<string, string> = {
        'Room not found': 'roomNotFound',
        'Room is full': 'roomFull',
        'Game already started': 'gameStarted',
        'Opponent disconnected': 'opponentDisconnected',
      }

      if (errorMap[error]) {
        translatedError = t(`modal.errors.${errorMap[error]}`)
      }

      setLocalError(translatedError)
    }
  }, [error, t])

  // Create Room State
  const [mode, setMode] = useState<'race' | 'time'>('race')
  const [timeLimit, setTimeLimit] = useState(60)
  const [difficulty, setDifficulty] = useState('medium')
  const [textSource, setTextSource] = useState<
    'english' | 'chinese' | 'coder' | 'custom'
  >('english')
  const [chineseStyle, setChineseStyle] = useState<ChineseStyle>(
    DEFAULT_CHINESE_STYLE
  )
  const [programmingLanguage, setProgrammingLanguage] =
    useState<ProgrammingLanguage>(DEFAULT_PROGRAMMING_LANGUAGE)
  const [customText, setCustomText] = useState('')

  // Custom Text logic
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const [savedTexts, setSavedTexts] = useState<CustomText[]>([])

  // Load custom texts
  useEffect(() => {
    if (isAuthenticated) {
      getCustomTexts().then((res) => {
        if (res.success && res.data) {
          setSavedTexts(res.data)
          // Default to first text if available and mode is custom
          if (res.data.length > 0 && !customText) {
            setCustomText(res.data[0].content)
          }
        }
      })
    } else {
      setSavedTexts([])
    }
  }, [isAuthenticated])

  const handleCreate = () => {
    let text = customText
    let language = 'english' // Default language tag

    if (textSource !== 'custom') {
      // Generate based on selection
      text = generateText(
        textSource as any,
        difficulty as any,
        500,
        chineseStyle,
        programmingLanguage
      )
      language = textSource // Use source as language tag for now
    }

    onCreate({
      mode,
      timeLimit,
      difficulty,
      text,
      language,
    })
    setShowCreateModal(false)
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[500px] gap-8 pt-0 -mt-8 pb-10 w-full max-w-6xl mx-auto relative">
      {/* Modal Overlay */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-teal-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-teal-900/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-teal-400 mb-6">
                {t('modal.title')}
              </h3>

              <div className="space-y-6">
                {/* Mode Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    {t('modal.mode')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode('race')}
                      className={`p-3 rounded-lg border font-medium transition-all ${mode === 'race' ? 'bg-teal-600 border-teal-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                    >
                      {t('modal.modes.race')}
                    </button>
                    <button
                      onClick={() => setMode('time')}
                      className={`p-3 rounded-lg border font-medium transition-all ${mode === 'time' ? 'bg-teal-600 border-teal-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
                    >
                      {t('modal.modes.time')}
                    </button>
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    {t('modal.difficulty')}
                  </label>
                  <div className="flex gap-3">
                    {['easy', 'medium', 'hard'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`flex-1 p-2 rounded-lg border text-sm font-medium transition-all capitalize ${difficulty === d ? 'bg-gray-700 border-teal-500 text-teal-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Limit (only for Time Attack) */}
                {mode === 'time' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                      {t('modal.timeLimit')}
                    </label>
                    <div className="flex gap-3">
                      {[30, 60, 120].map((tVal) => (
                        <button
                          key={tVal}
                          onClick={() => setTimeLimit(tVal)}
                          className={`flex-1 p-2 rounded-lg border text-sm font-medium transition-all ${timeLimit === tVal ? 'bg-gray-700 border-teal-500 text-teal-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}
                        >
                          {tVal}s
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Source Selection (Two Custom Dropdowns) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    {t('modal.textSource')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Dropdown 1: Source */}
                    <Select
                      value={textSource}
                      onChange={(val) => setTextSource(val as any)}
                      options={[
                        { value: 'english', label: t('modal.sources.english') },
                        { value: 'chinese', label: t('modal.sources.chinese') },
                        { value: 'coder', label: t('modal.sources.coder') },
                        { value: 'custom', label: t('modal.sources.custom') },
                      ]}
                    />

                    {/* Dropdown 2: Sub-options (Context Dependent) */}
                    <div className="relative">
                      {textSource === 'chinese' && (
                        <Select
                          value={chineseStyle}
                          onChange={(val) => setChineseStyle(val)}
                          options={CHINESE_STYLE_OPTIONS.map((style) => ({
                            value: style,
                            label: t(`modal.styles.${style}`),
                          }))}
                        />
                      )}

                      {textSource === 'coder' && (
                        <Select
                          value={programmingLanguage}
                          onChange={(val) => setProgrammingLanguage(val)}
                          options={PROGRAMMING_LANGUAGE_OPTIONS.map((lang) => ({
                            value: lang,
                            label: t.has(`modal.languages.${lang}`)
                              ? t(`modal.languages.${lang}`)
                              : lang,
                          }))}
                        />
                      )}

                      {textSource === 'english' && (
                        <div className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-600 cursor-not-allowed flex justify-between items-center opacity-50">
                          <span>Standard</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      )}

                      {textSource === 'custom' &&
                        (isAuthenticated ? (
                          savedTexts.length > 0 ? (
                            <Select
                              value={customText}
                              onChange={(val) => setCustomText(val)}
                              options={savedTexts.map((t) => ({
                                value: t.content,
                                label: t.title,
                              }))}
                              placeholder={t('modal.sources.custom')}
                            />
                          ) : (
                            <div className="w-full bg-gray-950 border border-red-900/30 rounded-lg p-3 text-sm text-red-400 flex justify-center items-center">
                              {t('modal.noCustomTexts')}
                            </div>
                          )
                        ) : (
                          <button
                            onClick={() => openAuthModal('login')}
                            className="w-full bg-teal-900/30 border border-teal-500/30 hover:bg-teal-900/50 rounded-lg p-3 text-sm text-teal-400 font-bold transition-colors"
                          >
                            {t('modal.loginBtn')}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {textSource === 'custom' && !isAuthenticated && (
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 text-sm text-center text-gray-400">
                    {t('modal.loginRequired')}
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 font-bold rounded-lg transition-colors"
                >
                  {t('modal.cancel')}
                </button>
                <button
                  onClick={handleCreate}
                  disabled={textSource === 'custom' && !customText.trim()}
                  className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors shadow-lg shadow-teal-900/20"
                >
                  {t('modal.create')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
          {t('title')}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">{t('subtitle')}</p>
      </motion.div>

      <AnimatePresence>
        {localError && (
          <Toast message={localError} onClose={() => setLocalError(null)} />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left: Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Create Room */}
          <motion.div
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center gap-6 hover:border-teal-500/50 transition-colors flex-1"
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-200">
                {t('createPrivate')}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{t('privateDesc')}</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-teal-900/20"
            >
              {t('createRoom')}
            </button>
          </motion.div>

          {/* Join by ID */}
          {/* Join by ID */}
          <motion.div
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 hover:border-blue-500/30 transition-colors"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 19.464a3 3 0 01-.879.879l-4.343 4.343a3 3 0 01-4.242-4.242l4.343-4.343a3 3 0 01.879-.879l5.743 5.743A6 6 0 0115 7z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {t('joinById')}
              </h3>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <input
                  type="text"
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value.toUpperCase())}
                  placeholder={t('modal.placeholders.code')}
                  className="relative w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-center text-lg font-mono font-bold tracking-[0.2em] focus:outline-none focus:border-blue-500 text-gray-200 placeholder:text-gray-700 placeholder:font-sans placeholder:tracking-normal placeholder:font-medium transition-all"
                  maxLength={6}
                />
              </div>
              <button
                onClick={() => onJoin(roomIdInput)}
                disabled={!roomIdInput || roomIdInput.length < 4}
                className="px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Room Browser */}
        <div className="lg:col-span-7 bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col gap-6 h-[500px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {t('liveRooms')} ({rooms.length})
            </h3>
            <button
              onClick={onRefresh}
              className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {t('refresh')}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            <AnimatePresence>
              {rooms.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-gray-500 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </div>
                  <p>{t('noRooms')}</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-teal-400 hover:underline"
                  >
                    {t('beFirst')}
                  </button>
                </motion.div>
              ) : (
                rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-gray-800/40 border border-gray-700/50 hover:border-teal-500/30 rounded-lg p-4 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-lg font-bold text-gray-400 font-mono border border-gray-700 group-hover:border-teal-500/50 group-hover:text-teal-400 transition-colors">
                        {room.playerCount}/2
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-200">
                            {t('hostRoom', { host: room.host })}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 uppercase">
                            {room.mode}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 uppercase">
                            {room.difficulty}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono mt-1">
                          ID: {room.id}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onJoin(room.id)}
                      className="px-4 py-2 bg-teal-600/10 text-teal-400 hover:bg-teal-600 hover:text-white rounded-lg font-semibold transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                      {t('joinNow')}
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
