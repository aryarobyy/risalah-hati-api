import app from "./app";
import dotenv from "dotenv";
import { normalizePort } from "./utils/normalizePort";
import { PORT } from "./data/appData";
import http from "http";
import { Server } from "socket.io";
import chatSocket from "./sockets/chatSocket";

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    connectionStateRecovery: {}
});

chatSocket(io);

const port = normalizePort(PORT);

// app.listen(port, '0.0.0.0', () => {
//     console.log(`Running on port ${port}`);
// });

server.listen(port, () => console.log(`Running on port ${port}`));