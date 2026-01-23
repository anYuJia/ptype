// Helper component for Battle Tab to keep TypingTest clean(er)
import { useBattleSocket } from '@/features/battle/hooks/useBattleSocket'
import { BattleLobby } from '@/features/battle/components/BattleLobby'
import { BattleArena } from '@/features/battle/components/BattleArena'
import { useState } from 'react'

export function BattleTabContent({ user }: { user: any }) {
  const {
    socket,
    socketId,
    roomId,
    status,
    players,
    gameConfig,
    rooms,
    countdown,
    startTime,
    winner,
    error,
    createRoom,
    joinRoom,
    getRooms,
    setReady,
    updateProgress,
    leaveRoom,
  } = useBattleSocket(user?.username || 'Guest')

  if (!roomId) {
    return (
      <BattleLobby
        onCreate={createRoom} // Pass directly, it accepts MatchConfig
        onJoin={joinRoom}
        onRefresh={getRooms}
        rooms={rooms}
        error={error}
      />
    )
  }

  return (
    <BattleArena
      roomId={roomId}
      players={players}
      status={status}
      countdown={countdown}
      startTime={startTime}
      winner={winner}
      myId={socketId || ''}
      onReady={setReady}
      onUpdateProgress={updateProgress}
      onLeave={leaveRoom}
      config={gameConfig}
    />
  )
}
