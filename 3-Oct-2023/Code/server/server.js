const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Now, set up your socket.io event listeners
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('Received:', msg); // This logs the message received from the frontend
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});