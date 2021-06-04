module.exports = (io, socket) => {
  console.log(socket.id);
  socket.emit('testing', "worked!")
}