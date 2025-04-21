const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUser = new Map();

io.on("connected", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("user-joined", (username) => {
    onlineUser.set(socket.id, username);
    io.emit("online-users", Array.from(onlineUser.values()));
  });

  socket.on("typing", ({ username, isTyping }) => {
    socket.broadcast.emit("user-typing", { username, isTyping });
  });

  socket.on("private-message", ({ toSocketId, message, fromUsername }) => {
    io.to(toSocketId).emit("receive-private-message", {
      message,
      fromUsername,
    });
  });

  socket.on("group-mesage", ({ message, fromUsername }) => {
    io.emit("receive-group-message"), { message, fromUsername };
  });

  socket.on("send-toast", ({ message }) => {
    io.emmit("receive-tooast", { message });
  });

  socket.on("disconnected", () => {
    console.log(`User disconected: ${socket.id}`);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listining at port ${port}`);
});
