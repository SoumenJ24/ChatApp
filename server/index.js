require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const harperSaveMessage = require("./services/harper-save-message");
const harperGetMessage = require("./services/harper-get-message");
const leaveRoom = require("./utils/leaveRoom");

const app = express();
app.use(cors());
const server = http.createServer(app);

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    //  console.log("User connected : ", socket.id);

    socket.on("join_room", (data) => {
        const { userName, room } = data;
        socket.join(room);

        chatRoom = room;
        allUsers.push({ id: socket.id, userName, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        //chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit("chatroom_users", chatRoomUsers);
        socket.emit("chatroom_users", chatRoomUsers);

        let __createdTime__ = Date.now();

        harperGetMessage(room)
            .then((res) => {
                socket.emit("last_100_messages", res);
            })
            .catch((err) => console.log(err.response.data));

        socket.to(room).emit("receive_message", {
            message: `${userName} has joined the chat room`,
            userName: CHAT_BOT,
            __createdTime__,
        });

        socket.emit("receive_message", {
            message: `Welcome ${userName}`,
            userName: CHAT_BOT,
            __createdTime__,
        });

        socket.to(room).emit("chatroom_users", chatRoomUsers);
        socket.emit("chatroom_users", chatRoomUsers);
    });

    socket.on("send_message", (data) => {
        const { userName, room, message, __createdTime__ } = data;
        io.in(room).emit("receive_message", data);
        harperSaveMessage(message, userName, room, __createdTime__)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    socket.on("leave_room", (data) => {
        const { userName, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();
        // console.log("All the users after joining room are :", allUsers);
        allUsers = leaveRoom(socket.id, allUsers);
        //console.log("All the users are :", allUsers);
        socket.to(room).emit("chatroom_users", allUsers);
        socket.to(room).emit("receive_message", {
            userName: CHAT_BOT,
            message: `${userName} has left the chat`,
            __createdtime__,
        });
        console.log(`${userName} has left the chat`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected from the chat");
        const user = allUsers.find((user) => user.id == socket.id);
        if (user?.username) {
            allUsers = leaveRoom(socket.id, allUsers);
            socket.to(chatRoom).emit("chatroom_users", allUsers);
            socket.to(chatRoom).emit("receive_message", {
                message: `${user.username} has disconnected from the chat.`,
            });
        }
    });
});

server.listen(4000, () => {
    console.log("Server listening to 4000");
});
