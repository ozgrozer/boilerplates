const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    methods: ['post'],
    origin: 'http://localhost:1234' // client url
  }
})

app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

io.on('connection', client => {
  client.on('event1', comingData => {
    console.log('coming data from client to server:', comingData)
    client.emit('event2', 'sending data from server to client')
  })
})

server.listen(1235, () => {
  console.log('Ready on http://localhost:1235')
})
