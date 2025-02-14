const socketIo =require('socket.io')
const User=require('./models/UserModel')
const captainModel = require('./models/CaptainModel');
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (!userId || !userType) {
                console.log('Invalid data received in join event:', data);
                return;
            }
    
            if (userType === 'user') {

                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    { new: true } // Return the updated document
                );    
    
                if (!updatedUser) {
                    console.log(`User not found with ID: ${userId}`);
                } else {
                    console.log(`Updated user socketId: ${updatedUser.socketId}`);
                }
    
            }  else if (userType === 'captain') {
                const updatedCaptain = await captainModel.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    { new: true } // Return the updated document
                );    
                
                if (!updatedCaptain) {
                    console.log(`Captain not found with ID: ${userId}`);
                } else {
                    console.log(`Updated Captain socketId: ${updatedCaptain.socketId}`);
                }
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };