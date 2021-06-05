module.exports = (io, socket) => {
  socket.on('user')
  console.log("a user connected", socket.id);
  socket.on("new message", (newMsg) => {
    io.emit('new message',newMsg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
};
