'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
  width?: string
  disabled?: boolean
}

export function Dropdown({
  trigger,
  children,
  align = 'right',
  className = '',
  width = 'w-48',
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const toggle = () => {
    if (!disabled) setIsOpen(!isOpen)
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 mt-2 ${width}
              bg-gray-900 border border-gray-800 rounded-lg shadow-xl
              ${align === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DropdownItem({
  children,
  onClick,
  active = false,
  disabled = false,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={() => {
        if (!disabled && onClick) onClick()
      }}
      disabled={disabled}
      className={`
        w-full text-left px-4 py-2 text-sm transition-colors
        ${active ? 'bg-teal-500/10 text-teal-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return <div className="h-px bg-gray-800 my-1" />
}
