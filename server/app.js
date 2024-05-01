const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.get('/hello-world', (req, res) => {
    res.send({"msg": "Hello World"})
})


io.on('connection', (socket) => {
    console.log('a user connected')
})

module.exports ={
    httpServer
}