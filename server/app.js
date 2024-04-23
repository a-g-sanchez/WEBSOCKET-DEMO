const express = require('express')
const { Server } = require('socket.io')

const app = express()
const io = new Server(app)

app.get('/hello-world', (req, res) => {
    res.send({"msg": "Hello World"})
})


io.on('connection', (socket) => {
    console.log('a user connected')
})

module.exports ={
    app
}