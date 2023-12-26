const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const chatRoutes = require("./routes/chat.js");
const http = require("http");

require("dotenv").config();

const db = require("./config/database.js");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use("/chat", chatRoutes);

// Handle unspecified routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Specified route not found",
  });
});

const { initSocket } = require("./socket/index");

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};

initSocket(server, corsOptions);


const PORT = process.env.PORT || 5004;
db.once("open", () => {
  server.listen(PORT, () =>
    console.log(`User Management Microservice is listening on port ${PORT}`)
  );
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
