// Import packages
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// App and Server setup
const app = express();
app.use(cors());

const server = http.createServer(app);

// Setup Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads/ folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // keep original file extension
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ fileUrl });
});

// Online users map
let onlineUsers = new Map();

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // New user joins
  socket.on("user-joined", (username) => {
    onlineUsers.set(socket.id, username);
    io.emit("online-users", Array.from(onlineUsers.values()));
  });

  // Typing indicator
  socket.on("typing", ({ username, isTyping }) => {
    socket.broadcast.emit("user-typing", { username, isTyping });
  });

  // Private messaging
  socket.on("private-message", ({ toSocketId, message, fromUsername }) => {
    io.to(toSocketId).emit("receive-private-message", {
      message,
      fromUsername,
    });
  });

  // Group messaging
  socket.on("group-message", ({ message, fromUsername }) => {
    io.emit("receive-group-message", { message, fromUsername });
  });

  // Toast notifications
  socket.on("send-toast", ({ message }) => {
    io.emit("receive-toast", { message });
  });

  // Message seen (read receipt)
  socket.on("message-seen", ({ toSocketId, messageId }) => {
    io.to(toSocketId).emit("message-seen-ack", { messageId });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    onlineUsers.delete(socket.id);
    io.emit("online-users", Array.from(onlineUsers.values()));
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
