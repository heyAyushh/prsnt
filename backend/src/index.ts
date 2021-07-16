import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("emoji", (data) => {
        console.log(data)
        io.emit("reaction", data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
