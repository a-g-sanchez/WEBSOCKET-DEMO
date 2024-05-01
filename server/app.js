const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { parties } = require('./parties.json')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {cors: {
    origin: "http://localhost:5173"
}})

app.get('/hello-world', (req, res) => {
    res.send({"msg": "Hello World"})
})

/** ------ socket implemntation ------ */

// TODO refactor to PH specs.
io.use((socket, next) => {
    const partyId = socket.handshake.auth.partyId
    // Validate that the partyId coming from the client exists in the array.
    if(!parties.includes(partyId)) {
        return next(new Error('invalid partyId'))
    }
    socket.partyId = partyId
    next()
})

io.on('connection', (socket) => {
    console.log('a user connected')
    // GET user id from socket.handshake.auth
    console.log(socket.partyId)

    socket.on('send-message', (data) => {
        console.log(data)
    })
})

module.exports ={
    httpServer
}