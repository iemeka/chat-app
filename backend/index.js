const express = require('express');
const app = express();
const port = 3000;
//socket config
const http = require("http");
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello</h2>')
})


server.listen(port, () => {
  console.log(`listening on port ${port}`)
})