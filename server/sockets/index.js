import { handleEditorSocket } from "./editorSocket.js";

export const initializeSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);
    handleEditorSocket(io, socket);
    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
};