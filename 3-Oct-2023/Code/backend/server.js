const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log(`Client connected with ID: ${socket.id}`);

    socket.on("chatMessage", (msg) => {
        io.emit('chatMessage', { id: socket.id, message: msg });
    });

    socket.on("disconnect", () => {
        console.log(`Client with ID ${socket.id} disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
