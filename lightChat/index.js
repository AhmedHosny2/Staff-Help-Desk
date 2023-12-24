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

  // Example: Handle a chat message
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    // Broadcast the message to all connected clients but not me
    socket.broadcast.emit("chat message", msg);
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
