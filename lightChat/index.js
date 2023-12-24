const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database.js");
const chatRoute = require("./routes/lightChat");

const app = express();
const server = http.createServer(app);

// Define CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};
const io = socketIO(server, {
  cors: corsOptions,
});

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/chat", chatRoute);

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinRoom", (chatId) => {
    console.log("User joined room:", chatId);
    socket.join(chatId);
  });

  socket.on('message', (data) => {
    console.log("Message received:", data);
    io.to(data.receiverId).emit('message', data.message);
    
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5009;

db.once("open", () => {
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
