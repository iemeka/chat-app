module.exports = (io, socket) => {
  socket.on("new message", (data) => {
    socket.broadcast.emit("new message", data);
  });
};
