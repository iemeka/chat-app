const express = require("express");
const app = express();
const port = 4000;
//socket config
const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const eventHandlers = require("./event-handler");

const onConnection = (socket) => {
  eventHandlers(io, socket);
};

io.on("connection", onConnection);
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
