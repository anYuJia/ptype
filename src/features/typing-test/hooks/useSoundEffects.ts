import { useCallback, useEffect, useRef } from 'react'
import { useTypingStore } from '../store/typingStore'
import { SoundType } from '@/lib/constants'

type SoundKey = 'click' | 'space' | 'enter' | 'backspace'

const SOUND_FILES: Record<SoundType, Record<SoundKey, string>> = {
  'cherry-blue': {
    click: '/sounds/mechanical/cherry-blue/click.mp3',
    space: '/sounds/mechanical/cherry-blue/space.mp3',
    enter: '/sounds/mechanical/cherry-blue/enter.mp3',
    backspace: '/sounds/mechanical/cherry-blue/backspace.mp3',
  },
  'cherry-red': {
    click: '/sounds/mechanical/cherry-red/click.mp3',
    space: '/sounds/mechanical/cherry-red/space.mp3',
    enter: '/sounds/mechanical/cherry-red/enter.mp3',
    backspace: '/sounds/mechanical/cherry-red/backspace.mp3',
  },
}

export function useSoundEffects() {
  const { settings } = useTypingStore()
  const { soundEnabled, soundType, soundVolume } = settings

  // Use a ref to cache loaded Audio objects
  // format: Map<SoundType, Map<SoundKey, Audio>>
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map())

  // Function to play a sound
  const playSound = useCallback(
    (key: SoundKey) => {
      if (!soundEnabled) return

      const cacheKey = `${soundType}-${key}`
      let audio = audioCache.current.get(cacheKey)

      if (!audio) {
        const src = SOUND_FILES[soundType][key]
        audio = new Audio(src)
        audioCache.current.set(cacheKey, audio)
      }

      // Reset and play
      // Clone node to allow overlapping sounds (rapid typing)
      // Or just currentTime = 0? Cloning is better for rapid fire.
      // Actually, creating new Audio for every keystroke might be heavy,
      // but resetting currentTime=0 truncates the previous sound if it's the same object.
      // For typing, overlapping is crucial.
      // Let's try cloning the cached audio node.

      try {
        const sound = audio.cloneNode() as HTMLAudioElement
        sound.volume = soundVolume
        sound.play().catch((e) => {
          // Ignore auto-play errors or missing file errors to prevent crashing
          if (process.env.NODE_ENV === 'development') {
            // console.warn('Sound play failed:', e);
          }
        })
      } catch (e) {
        console.error('Error playing sound', e)
      }
    },
    [soundEnabled, soundType, soundVolume]
  )

  // Preload sounds when type changes
  useEffect(() => {
    if (!soundEnabled) return

    const sounds = SOUND_FILES[soundType]
    Object.entries(sounds).forEach(([key, src]) => {
      const cacheKey = `${soundType}-${key}`
      if (!audioCache.current.has(cacheKey)) {
        const audio = new Audio(src)
        audioCache.current.set(cacheKey, audio)
      }
    })
  }, [soundEnabled, soundType])

  return {
    playClick: () => playSound('click'),
    playSpace: () => playSound('space'),
    playEnter: () => playSound('enter'),
    playBackspace: () => playSound('backspace'),
  }
}
