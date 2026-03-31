// tracks all active rooms and users in memory
const rooms = new Map();

export const handleEditorSocket = (io, socket) => {

  // user joins a room
  socket.on("join-room", ({ roomId, user }) => {
    socket.join(roomId);

    // initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Map(),
        content: "",
        language: "javascript",
      });
    }

    const room = rooms.get(roomId);
    room.users.set(socket.id, {
      ...user,
      socketId: socket.id,
      cursor: { lineNumber: 1, column: 1 },
    });

    // send current room state to the user who just joined
    socket.emit("room-joined", {
      content: room.content,
      language: room.language,
      users: Array.from(room.users.values()),
    });

    // tell everyone else a new user joined
    socket.to(roomId).emit("user-joined", {
      user: room.users.get(socket.id),
      users: Array.from(room.users.values()),
    });

    console.log(`👤 ${user.name} joined room ${roomId}`);
  });

  // handle code changes with basic OT
  socket.on("code-change", ({ roomId, delta, content }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    // update server-side content
    room.content = content;

    // broadcast to everyone else in the room
    socket.to(roomId).emit("code-update", { delta, content });
  });

  // handle cursor position changes
  socket.on("cursor-move", ({ roomId, cursor }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const user = room.users.get(socket.id);
    if (user) {
      user.cursor = cursor;
      // broadcast cursor position to everyone else
      socket.to(roomId).emit("cursor-updated", {
        socketId: socket.id,
        cursor,
        user,
      });
    }
  });

  // handle language change
  socket.on("language-change", ({ roomId, language }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.language = language;
    socket.to(roomId).emit("language-updated", { language });
  });

  // handle user typing indicator
  socket.on("typing", ({ roomId, isTyping }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    const user = room.users.get(socket.id);
    if (user) {
      socket.to(roomId).emit("user-typing", {
        socketId: socket.id,
        user,
        isTyping,
      });
    }
  });

  // handle disconnection
  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      const room = rooms.get(roomId);
      if (!room) continue;

      const user = room.users.get(socket.id);
      room.users.delete(socket.id);

      // notify others
      socket.to(roomId).emit("user-left", {
        socketId: socket.id,
        user,
        users: Array.from(room.users.values()),
      });

      // clean up empty rooms
      if (room.users.size === 0) {
        rooms.delete(roomId);
        console.log(`🗑️ Room ${roomId} deleted (empty)`);
      }
    }
  });
};