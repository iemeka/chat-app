module.exports = (io, socket) => {
  console.log(socket.userName)
  socket.on("new-message", (data) => {
    socket.broadcast.emit("new-message", `${socket.userName}: ${data}`);
  });

  socket.on("user-init", (username) => {
    socket.userName = username;
    socket.broadcast.emit("user-init",socket.userName);
    users = generateUsers();
    io.emit("online-users", users);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("new-message", `${socket.userName} left the chat`);
    users = generateUsers();
    io.emit("online-users", users);
  });

  socket.on("typing", (isTyping) => {
    const msg = isTyping ? `${socket.userName} is Typing..` : "";
    socket.broadcast.emit("typing-user", msg);
  });

  const generateUsers = () => {
    const users = {};
    for (let [id, socket] of io.of("/").sockets) {
      users[id] = socket.userName;
    }
    return users;
  };
};
