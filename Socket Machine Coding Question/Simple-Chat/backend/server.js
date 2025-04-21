const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new_user", (username) => {
    onlineUsers[socket.id] = username;
    io.emit("online_users", Object.values(onlineUsers));
  });

  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];
    io.emit("online_users", Object.values(onlineUsers));
  });

  socket.on("send_message", (data) => {
    // Broadcast the message to everyone
    io.emit("receive_message", data);

    // Emit message_delivered event after a slight delay (to simulate message delivery)
    setTimeout(() => {
      io.emit("message_delivered", {
        username: data.username,
        message: data.message,
      });
    }, 2000); // Delay of 2 seconds to simulate delivery
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("user_typing", username);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("user_stop_typing");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
