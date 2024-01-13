import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("SAllllam");
  socket.on("newUser", (username) => {
  
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.emit("getNotification", {
      senderName,
      type,
    });
  });



  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5011);