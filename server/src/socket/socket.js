const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST"],
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};  //{userId: socketId}


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != 'undefined') {
        userSocketMap[userId] = socket.id;
    }
    // io.emit() is used to send events to all the connects clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // is used to listen to the event. can be used both on the server and on the client
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

    });
})

module.exports = { app, io, server, getReceiverSocketId };

// const { Server } = require('socket.io');
// const http = require('http');
// const express = require('express');

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//         methods: ["GET", "POST"],
//     },
// });

// const userSocketMap = {};  // {userId: socketId}

// const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);

//     const userId = socket.handshake.query.userId;
//     if (userId && userId !== 'undefined') {
//         userSocketMap[userId] = socket.id;
//         socket.join(userId); // Join the room based on userId
//     }

//     io.emit('getOnlineUsers', Object.keys(userSocketMap));

//     socket.on('privateMessage', ({ receiverId, message }) => {
//         // Send the message to the specific room
//         io.to(receiverId).emit('privateMessage', {
//             senderId: userId,
//             message: message
//         });
//         console.log(receiverId);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected', socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     });
// });

// module.exports = { app, io, server, getReceiverSocketId };

