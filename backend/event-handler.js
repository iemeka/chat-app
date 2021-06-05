module.exports = (io, socket) => {
  socket.on("new message", (data) => {
    socket.broadcast.emit("new message", data);
  });

  socket.on("user init", (username) => {
    socket.userName = username;
    socket.broadcast.emit("new message", `${socket.userName} is online`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("new message", `${socket.userName} left the chat`);
  });
};
