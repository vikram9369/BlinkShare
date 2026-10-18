
const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

// Allow local development, configured frontend,
// and Vercel-hosted frontend deployments.
const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

// Express CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"]
  })
);

app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 75 * 1024 * 1024
  }
});

// Serve uploaded files
app.use("/uploads", express.static(uploadsDir));

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST"]
  }
});

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  const roomCode = req.body.roomCode;

  const fileData = {
    fileName: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    url: "/uploads/" + req.file.filename
  };

  if (roomCode) {
    io.to(roomCode).emit("receive-file", fileData);
  }

  res.json(fileData);
});

// Health check
app.get("/", (req, res) => {
  res.send("BlinkShare Backend Running");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (data) => {
    const { roomCode, deviceName } = data;

    socket.join(roomCode);

    console.log(
      `${deviceName} joined room ${roomCode}`
    );
  });

  socket.on("send-message", (data) => {
    const { roomCode, text, sender, time } = data;

    io.to(roomCode).emit("receive-message", {
      text,
      sender,
      time
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
