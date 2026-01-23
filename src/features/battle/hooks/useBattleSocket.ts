'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export type BattleConfig = {
  mode: 'race' | 'time'
  timeLimit: number // in seconds
  difficulty: string
  text: string
  language?: string
}

export type BattlePlayer = {
  id: string
  username: string
  wpm: number
  progress: number
  correctChars?: number
  ready: boolean
}

export type BattleState =
  | 'idle'
  | 'waiting'
  | 'starting'
  | 'playing'
  | 'finished'

export type BattleRoom = {
  id: string
  host: string
  mode: string
  difficulty: string
  playerCount: number
  config?: BattleConfig
}

export function useBattleSocket(username: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [roomId, setRoomId] = useState<string | null>(null)
  const [status, setStatus] = useState<BattleState>('idle')
  const [players, setPlayers] = useState<Record<string, BattlePlayer>>({})
  const [gameConfig, setGameConfig] = useState<BattleConfig | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [winner, setWinner] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rooms, setRooms] = useState<BattleRoom[]>([])
  const [myId, setMyId] = useState<string | null>(null)

  // Connect
  useEffect(() => {
    // When url is undefined, it defaults to window.location
    // path defaults to /socket.io/, which matches our proxy
    const s = io(undefined, {
      path: '/socket.io',
      autoConnect: true,
    })
    setSocket(s)

    s.on('connect', () => {
      console.log('Connected to battle server', s.id)
      setMyId(s.id || null)
      // Request room list on connect
      s.emit('get_rooms')
    })

    s.on('rooms_update', (updatedRooms) => {
      setRooms(updatedRooms)
    })

    s.on('room_created', ({ roomId, players, config }) => {
      setRoomId(roomId)
      setPlayers(players)
      if (config) setGameConfig(config)
      setStatus('waiting')
    })

    s.on('room_joined', ({ roomId, players, config }) => {
      setRoomId(roomId)
      setPlayers(players)
      if (config) setGameConfig(config)
      setStatus('waiting')
    })

    s.on('player_joined', ({ players }) => {
      setPlayers(players)
    })

    s.on('player_update', ({ players }) => {
      setPlayers(players)
    })

    s.on('countdown', (count) => {
      setStatus('starting')
      setCountdown(count)
    })

    s.on('game_start', ({ startTime }) => {
      setStatus('playing')
      setStartTime(startTime)
      setCountdown(null)
    })

    s.on('progress_update', ({ players }) => {
      setPlayers(players)
    })

    s.on('game_over', ({ winner, players }) => {
      setStatus('finished')
      setWinner(winner)
      if (players) setPlayers(players)
    })

    s.on('player_left', ({ players }) => {
      setPlayers(players)
    })

    s.on('opponent_disconnected', () => {
      setError('Opponent disconnected')
      setStatus('finished')
    })

    s.on('error', ({ message }) => {
      setError(message)
    })

    return () => {
      s.disconnect()
    }
  }, [])

  const connect = useCallback(() => {
    if (socket?.connected) return
    socket?.connect()
  }, [socket])

  const getRooms = useCallback(() => {
    connect()
    socket?.emit('get_rooms')
  }, [socket, connect])

  const createRoom = useCallback(
    (config: Partial<BattleConfig>) => {
      connect()
      socket?.emit('create_room', { username, config })
    },
    [socket, username, connect]
  )

  const joinRoom = useCallback(
    (roomId: string) => {
      connect()
      socket?.emit('join_room', { roomId, username })
      setWinner(null)
    },
    [socket, username, connect]
  )

  const setReady = useCallback(
    (ready: boolean) => {
      if (roomId) {
        socket?.emit('player_ready', { roomId, ready })
      }
    },
    [socket, roomId]
  )

  const updateProgress = useCallback(
    (wpm: number, progress: number, correctChars: number) => {
      if (roomId && status === 'playing') {
        socket?.emit('update_progress', { roomId, wpm, progress, correctChars })
      }
    },
    [socket, roomId, status]
  )

  const leaveRoom = useCallback(() => {
    if (roomId) {
      socket?.emit('leave_room', { roomId })
      setRoomId(null)
      setStatus('idle')
      setPlayers({})
      setGameConfig(null)
      setWinner(null)
      // Refresh rooms when leaving
      socket?.emit('get_rooms')
    }
  }, [socket, roomId])

  return {
    socket,
    roomId,
    status,
    players,
    gameConfig,
    countdown,
    startTime,
    winner,
    error,
    rooms,
    socketId: myId,
    createRoom,
    joinRoom,
    getRooms,
    setReady,
    updateProgress,
    leaveRoom,
  }
}
