import React, { useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

function ChatComponent() {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        socket.emit('chat message', message);
    }

    return (
        <div>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatComponent;
