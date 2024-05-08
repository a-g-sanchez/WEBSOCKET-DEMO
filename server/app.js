const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { Message } = require('./models')
// Simulating parties. For PH need to check that the user is a member of the
// chat they are trying to join.
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
    const {userId, partyId} = socket.handshake.auth
    // Validate that the partyId coming from the client exists in the array.
    if(!parties.includes(partyId)) {
        return next(new Error('invalid partyId'))
    }
    socket.partyId = partyId
    socket.userId = userId
    next()
})

io.on('connection', (socket) => {
    console.log('a user connected')
    // GET user id from socket.handshake.auth

    socket.join(socket.partyId.toString())
    console.log(`Connected user ${socket.userId} to room ${socket.partyId}`)

    socket.on('send-message', async ({message, userId, partyId}) => {
        const dm = await Message.create({message})

        io.to(partyId.toString()).emit('return-message', {
            message: dm, 
            from: userId
        })
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)
    })
})

module.exports ={
    httpServer
}