'use client'

import { motion } from 'framer-motion'
import { TypewriterTitle } from './TypewriterTitle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useTranslations } from 'next-intl'
import { SoundDropdown } from './SoundDropdown'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: any) => void // Using any for simplicity as strict type is in parent
  tabs: readonly { id: string; label: string }[]
}

export function Header({ activeTab, setActiveTab, tabs }: HeaderProps) {
  const { openAuthModal, user, isAuthenticated, logout } = useAuthStore()
  const t = useTranslations('Navigation')

  return (
    <header className="pt-8 pb-2 px-4 max-w-6xl mx-auto w-full">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo & Title */}
        <TypewriterTitle />

        {/* Tab Navigation */}
        <div className="flex items-center gap-8 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                  relative py-2 text-base font-medium transition-colors duration-300
                  ${activeTab === tab.id ? 'text-teal-400' : 'text-gray-500 hover:text-gray-300'}
                `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* User & Actions */}
        <div className="flex items-center justify-end gap-4">
          {/* Sound Dropdown - Moved here */}
          <SoundDropdown />

          <LanguageSwitcher />

          <motion.a
            href="https://github.com/anYuJia/ptype/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            title="View on GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </motion.a>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-gray-900/30 transition-colors cursor-default"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-gray-950 font-bold text-sm shadow-lg shadow-teal-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </motion.div>
                <span className="text-sm font-semibold text-gray-200">
                  {user.username}
                </span>
              </motion.div>
              <motion.button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('logout')}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <motion.button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  openAuthModal('login', {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                  })
                }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('login')}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-400 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  openAuthModal('register', {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                  })
                }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('register')}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-400 group-hover:w-1/2 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  )
}
