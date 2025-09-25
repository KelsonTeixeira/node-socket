const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected!');

  socket.on('disconnect', () => {
    console.log('user disconnected!');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('user joined', (username) => {
    socket.broadcast.emit('user joined', username);
  })
});



const PORT = 3000;

server.listen(PORT, () => console.log(`listening to port: ${PORT}`));