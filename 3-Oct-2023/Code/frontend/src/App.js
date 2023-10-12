import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";

function App() {
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('chatMessage', (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit('chatMessage', inputMsg);
        setInputMsg('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.id}:</strong> {msg.message}</p>
                ))}
            </div>
            <div>
                <input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} placeholder="Type a message..." />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
