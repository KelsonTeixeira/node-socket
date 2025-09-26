const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected!');
  const username = socket.handshake.query.username; 
  
  socket.broadcast.emit('user joined', username);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected!');
  });
});



const PORT = 3000;

server.listen(PORT, () => console.log(`listening to port: ${PORT}`));