import { useState } from 'react'
import { socket } from '../../socket'
import './messenger.css'

export const Messenger = () => {
    const [userId, setUserId] = useState(1) 
    const [partyId] = useState(2)
    const [message, setMessage] = useState('')

    const connect = () => {
        socket.auth = { userId, partyId }
        socket.connect()
    }

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(message)
        socket.emit('send-message', message)
        setMessage('')
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    socket.on('connect_error',(err) => {
        console.log(err)
    })

    return(
        <>
            <section className="messenger-container">
                <p>Messenger here!</p>
                <div>
                    <button onClick={connect}>Connect</button>
                    <button>Disconnect</button>
                </div>
                <div>
                    <form onSubmit={sendMessage}>
                        <input type="text" value={message} onChange={handleChange}/>
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </section>
        </>
    )
}