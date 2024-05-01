const { httpServer } = require('./app')
const port = 3001


httpServer.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})