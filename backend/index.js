const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
//socket config
const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const eventHandlers = require("./event-handler");

app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send("<h1>Watch this space. Real time app coming up. By the way, Hello World!</h1>")
})
const onConnection = (socket) => {
  eventHandlers(io, socket);
};

io.on("connection", onConnection);
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
