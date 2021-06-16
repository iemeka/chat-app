module.exports = (io, socket) => {
  console.log("connected", socket.id);
  const users = () => {
    const onlineUsers = {};
    for (let [id, socket] of io.of("/").sockets) {
      if (socket.userN != null) {
        onlineUsers[id] = { name: socket.userN, imgUrl: socket.imgUrl };
      }
    }
    return onlineUsers;
  };

  socket.on("user-init", (message) => {
    socket.userN = message.user;
    socket.imgUrl = message.imgUrl;
    socket.broadcast.emit("user-init", message);
    io.emit("online-users", users());
    console.log(socket.userN, socket.id);
  });

  socket.on("disconnect", () => {
    if (socket.userN != null) {
      socket.broadcast.emit("user-exit", { user: socket.userN });
      io.emit("online-users", users());
    }
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("send-message", message);
  });

  socket.on("typing-user", (message) => {
    socket.broadcast.emit("typing-user", message);
  });
};
