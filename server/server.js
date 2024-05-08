const { httpServer } = require('./app')
const { db } = require('./db/connection')
const port = 3001


httpServer.listen(port, () => {
    db.sync()
    console.log(`server running at http://localhost:${port}`)
})