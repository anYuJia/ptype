'use client'

import { useTypingStore } from '@/features/typing-test/store/typingStore'
import { useShallow } from 'zustand/react/shallow'
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from '@/components/ui/Dropdown'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function SoundDropdown() {
  const t = useTranslations('Settings')

  const { settings, updateSettings } = useTypingStore(
    useShallow((state) => ({
      settings: state.settings,
      updateSettings: state.updateSettings,
    }))
  )

  const { soundEnabled, soundType } = settings

  return (
    <Dropdown
      trigger={
        <motion.button
          className={`p-2 rounded-full transition-colors ${soundEnabled ? 'text-teal-400 bg-teal-400/10' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t('soundEnabled')}
        >
          {soundEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 2.485.586 4.833 1.66 6.895.345 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 2.08 2.08 0 010-2.94 9.47 9.47 0 000-13.396.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 2.485.586 4.833 1.66 6.895.345 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" />
            </svg>
          )}
        </motion.button>
      }
    >
      <div className="py-2">
        <DropdownItem
          onClick={() => updateSettings({ soundEnabled: !soundEnabled })}
          className="flex items-center justify-between"
        >
          <span>{t('soundEnabled')}</span>
          <div
            className={`w-8 h-4 rounded-full relative transition-colors ${soundEnabled ? 'bg-teal-500' : 'bg-gray-600'}`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${soundEnabled ? 'left-4.5' : 'left-0.5'}`}
            />
          </div>
        </DropdownItem>

        {soundEnabled && (
          <>
            <DropdownDivider />
            <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase">
              {t('chineseStyle')}{' '}
              {/* Reusing a general "Style" label if available or just generic */}
              {/* Or better, verify zh.json/en.json for appropriate label. "Switch Type" isn't there, but "soundTypeLabels" keys are. */}
              Switch Type
            </div>

            <DropdownItem
              active={soundType === 'cherry-blue'}
              onClick={() => updateSettings({ soundType: 'cherry-blue' })}
            >
              {t('soundTypeLabels.cherry-blue')}
            </DropdownItem>
            <DropdownItem
              active={soundType === 'cherry-red'}
              onClick={() => updateSettings({ soundType: 'cherry-red' })}
            >
              {t('soundTypeLabels.cherry-red')}
            </DropdownItem>
          </>
        )}
      </div>
    </Dropdown>
  )
}
