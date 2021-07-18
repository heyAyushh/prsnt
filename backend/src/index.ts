import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import 'dotenv/config';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
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

server.listen(process.env.PORT || 3000, () => {
    console.log(`listening on *:${process.env.PORT || 3000}`);
});
