const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("stop_typing");
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
