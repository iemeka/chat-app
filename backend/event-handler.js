module.exports = (io, socket) => {
  console.log("connected", socket.id);
  // Todo: generate user here.

  socket.on("user-init", (message) => {
    //Todo: send user name and id for others to add you to thier list
    socket.userN = message.user;
    socket.broadcast.emit("user-init", message);
    users = generateUsers();
    io.emit("online-users", users);
    console.log(socket.userN, socket.id);
  });

  socket.on("disconnect", () => {
    if (socket.userN != null) {
      //send user name and id to remove from other users list
      socket.broadcast.emit("user-exit", { user: socket.userN });
      users = generateUsers();
      io.emit("online-users", users);
    }
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("send-message", message);
  });

  socket.on("typing-user", (message) => {
    socket.broadcast.emit("typing-user", message);
  })


  // socket.on("disconnect", () => {
  //   // socket.broadcast.emit("new-message", {user:username});
  //   console.log("disconnected", socket.id);
  //   users = generateUsers();
  //   io.emit("online-users", users);
  // });

  // socket.on("typing", (isTyping) => {
  //   const msg = isTyping ? `${socket.userName} is Typing..` : "";
  //   socket.broadcast.emit("typing-user", msg);
  // });

  const generateUsers = () => {
    const users = {};
    for (let [id, socket] of io.of("/").sockets) {
      users[id] = socket.userN;
    }
    return users;
  };
};
