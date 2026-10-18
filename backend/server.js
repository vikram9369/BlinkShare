const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize:
      75 * 1024 * 1024
  }
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
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
      io.to(roomCode).emit(
        "receive-file",
        fileData
      );
    }

    res.json(fileData);
  }
);

app.get("/", (req, res) => {
  res.send("BlinkShare Backend Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

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
    const {
      roomCode,
      text,
      sender,
      time
    } = data;

    io.to(roomCode).emit(
      "receive-message",
      {
        text,
        sender,
        time
      }
    );
  });

  socket.on("disconnect", () => {
    console.log(
      "User Disconnected:",
      socket.id
    );
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
