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
    credentials: true,
  },
});
const eventHandlers = require("./event-handler");
let username = "";

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));

app.post("/submit-form", (req, res) => {
  username = req.body.username;
  // validiat user name
  res.redirect('http://localhost:3000');
});

const onConnection = (socket) => {
  socket.userName = username;
  eventHandlers(io, socket);
};

io.on("connection", onConnection);
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
