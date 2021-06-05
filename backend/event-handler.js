module.exports = (io, socket) => {
  socket.on("new message", (data) => {
    socket.broadcast.emit("new message", data);
  });

  socket.on("user init", () => {
    socket.broadcast.emit("new message", "new user came online");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("new message", "user left the chat");
  });
};
