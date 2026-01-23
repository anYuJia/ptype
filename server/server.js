const { Server } = require('socket.io')

const io = new Server(4000, {
  cors: {
    origin: '*', // In prod, restrict this to the frontend URL
    methods: ['GET', 'POST'],
  },
})

// Store room state
// rooms = { [roomId]: { players: { [socketId]: { id, username, wpm, progress } }, status: 'waiting' | 'playing' | 'finished', text: "..." } }
const rooms = new Map()

// Helper to broadcast room list
const broadcastRooms = () => {
  const publicRooms = []
  rooms.forEach((room) => {
    if (room.status === 'waiting') {
      publicRooms.push({
        id: room.id,
        host: room.players[room.host]?.username || 'Unknown',
        mode: room.config.mode,
        difficulty: room.config.difficulty,
        playerCount: Object.keys(room.players).length,
      })
    }
  })
  console.log('Broadcasting rooms:', publicRooms)
  io.emit('rooms_update', publicRooms)
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('get_rooms', () => {
    broadcastRooms()
  })

  socket.on('create_room', ({ username, mode, difficulty }) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()

    rooms.set(roomId, {
      id: roomId,
      players: {
        [socket.id]: {
          id: socket.id,
          username,
          wpm: 0,
          progress: 0,
          ready: false,
        },
      },
      status: 'waiting',
      config: { mode, difficulty },
      host: socket.id,
    })

    socket.join(roomId)
    socket.emit('room_created', { roomId, players: rooms.get(roomId).players })
    console.log(`Room ${roomId} created by ${username}`)
    broadcastRooms()
  })

  socket.on('join_room', ({ roomId, username }) => {
    const room = rooms.get(roomId)

    if (!room) {
      socket.emit('error', { message: 'Room not found' })
      return
    }

    if (Object.keys(room.players).length >= 2) {
      socket.emit('error', { message: 'Room is full' })
      return
    }

    if (room.status !== 'waiting') {
      socket.emit('error', { message: 'Game already started' })
      return
    }

    room.players[socket.id] = {
      id: socket.id,
      username,
      wpm: 0,
      progress: 0,
      ready: false,
    }
    socket.join(roomId)

    // IMPORTANT: Send full state to the new joiner so they see the Host
    socket.emit('room_joined', { roomId, players: room.players })

    // Notify others
    io.to(roomId).emit('player_joined', { players: room.players })
    console.log(`${username} joined room ${roomId}`)
    broadcastRooms()
  })

  socket.on('player_ready', ({ roomId, ready }) => {
    const room = rooms.get(roomId)
    if (!room) return

    if (room.players[socket.id]) {
      room.players[socket.id].ready = ready
    }

    io.to(roomId).emit('player_update', { players: room.players })

    // Check if all players ready
    const allReady = Object.values(room.players).every((p) => p.ready)
    const playerCount = Object.keys(room.players).length

    if (allReady && playerCount === 2) {
      // Start countdown
      console.log(`Room ${roomId} starting...`)
      let count = 3
      const countdown = setInterval(() => {
        io.to(roomId).emit('countdown', count)
        count--

        if (count < 0) {
          clearInterval(countdown)
          room.status = 'playing'
          io.to(roomId).emit('game_start', { startTime: Date.now() })
        }
      }, 1000)
    }
  })

  socket.on('update_progress', ({ roomId, wpm, progress }) => {
    const room = rooms.get(roomId)
    if (!room || room.status !== 'playing') return

    if (room.players[socket.id]) {
      room.players[socket.id].wpm = wpm
      room.players[socket.id].progress = progress
    }

    // Broadcast to everyone in room (including self, to simplify sync)
    io.to(roomId).emit('progress_update', { players: room.players })

    // Check win condition
    if (progress >= 100) {
      room.status = 'finished'
      io.to(roomId).emit('game_over', { winner: socket.id })
    }
  })

  socket.on('leave_room', ({ roomId }) => {
    handleLeave(socket, roomId)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    // Find rooms this user was in and remove them
    rooms.forEach((room, roomId) => {
      if (room.players[socket.id]) {
        handleLeave(socket, roomId)
      }
    })
  })
})

function handleLeave(socket, roomId) {
  const room = rooms.get(roomId)
  if (room) {
    delete room.players[socket.id]

    if (Object.keys(room.players).length === 0) {
      rooms.delete(roomId)
      if (room.timer) clearTimeout(room.timer)
    } else {
      io.to(roomId).emit('player_left', { players: room.players })
      if (room.status === 'playing') {
        io.to(roomId).emit('opponent_disconnected')
        room.status = 'finished'
        if (room.timer) clearTimeout(room.timer)
      }
    }
    // Broadcast updates to lobby
    broadcastRooms()
  }
}

function handleStartGame(roomId) {
  const room = rooms.get(roomId)
  if (!room) return

  room.status = 'playing'
  const startTime = Date.now()
  io.to(roomId).emit('game_start', { startTime })

  // Time Attack Mode Logic
  if (room.config.mode === 'time') {
    const limitMs = room.config.timeLimit * 1000
    console.log(`Room ${roomId}: Timer set for ${room.config.timeLimit}s`)

    room.timer = setTimeout(() => {
      // Time's up! Determine winner by correctChars/WPM
      const players = Object.values(room.players)
      // Sort by correctChars descending
      players.sort((a, b) => (b.correctChars || 0) - (a.correctChars || 0))

      const winnerId = players[0]?.id // Simple tie-break: first one sorted
      finishGame(roomId, winnerId)
    }, limitMs)
  }
}

function finishGame(roomId, winnerId) {
  const room = rooms.get(roomId)
  if (!room || room.status === 'finished') return

  room.status = 'finished'
  if (room.timer) clearTimeout(room.timer) // Clear timer if it was race mode or early finish

  io.to(roomId).emit('game_over', { winner: winnerId, players: room.players })
  console.log(`Room ${roomId} finished. Winner: ${winnerId}`)
}

console.log('Socket server running on port 4000')
