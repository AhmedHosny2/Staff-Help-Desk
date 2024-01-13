const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database.js");
const knowledgeBaseRouter = require("./routes/KnowledgeBase.js");
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware


// Routes
app.use("/KnowledgeBase", knowledgeBaseRouter);
app.get("/", (req, res) => {
	res.send("Health Check");
  });
const PORT = process.env.PORT || 5006;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
