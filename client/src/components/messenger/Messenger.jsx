import { useState } from 'react'
import { socket } from '../../socket'
import './messenger.css'

export const Messenger = () => {
    const [userId] = useState(1) 
    const [partyId] = useState(2)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const connect = () => {
        socket.auth = { userId, partyId }
        socket.connect()
    }

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', {message, userId, partyId})
        setMessage('')
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    socket.on('connect_error',(err) => {
        console.log(err)
    })

    socket.on('return-message', ({message, from}) => {
        const messageArray = [...messages, {message, from}]
        setMessages(messageArray)
    })

    return(
        <>
            <section className="messenger-container">
                <div className='message-display'>
                    {messages.length > 0 && (messages.map((message) => (
                        <div key={message.message.id} className={ message.from === userId ? 'sender' : 'recipiant'} >
                            <p className='message'>{message.message.message}</p>
                        </div>
                        
                    ))) }
                </div>
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