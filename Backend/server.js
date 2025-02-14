import http from 'http';
import app from './app.js'; // Make sure to include the .js extension
import { initializeSocket } from './socket.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initializeSocket(server);
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});