const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const fs = require('fs');

app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));

app.get('/', (req, res) => {
  let doc = fs.readFileSync('./html/index.html', 'utf8');
  res.send(doc);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

let port = 8000;
server.listen(port, () => {
  console.log(`The program is launched on ${port}!`);
});