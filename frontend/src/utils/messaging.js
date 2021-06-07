class Messaging {
  constructor(socket) {
    this.socket = socket;
  }
  handleConnect(userName) {
    this.socket.emit("user-init", userName);
  }

  handleDisconnect() {}
}
