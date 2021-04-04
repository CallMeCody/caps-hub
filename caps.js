'use strict'

require('dotenv').config();

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);
const caps = io.of('/caps');

io.on('connection', (socket) => {
  console.log('Welcome', socket.id);
})

caps.on('connection', (socket) => {

  socket.on('pickup', (payload) => {
    socket.broadcast.emit('pickup', payload);
  })
  console.log('connected to caps namespace:', socket.id)

  socket.on('in-transit', (payload) => {
    socket.emit('in-transit', payload);
    console.log('heard in-transit')
  });

  socket.on('delivered', (payload) => {
    socket.broadcast.emit('delivered', payload)
    console.log('heard delivered');
  })

  socket.on('received', (payload) => {
    console.log('message recieved')
  })
});

console.log('HUB CONNECTED');