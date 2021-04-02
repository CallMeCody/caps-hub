'use strict'

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', (socket) => {
  console.log(`Hello ${socket.id}`)

  socket.on('pickup', (payload) => {
  socket.broadcast.emit('newPickup', payload);
  })

  socket.on('in-transit', (payload) => {
    setTimeout(() => {
      socket.emit('sendMessage', payload)
    }, 3000)
  })

  socket.on('delivered', (payload) => {
    socket.broadcast.emit('delivered', payload)
  })

})

  function sendMessage(payload) {
    console.log('EVENT', { event: ``, time: `${faker.date.soon()}`, payload });
  } 

module.exports = {
  sendMessage,
}

console.log('CAPS TURNED ON...');