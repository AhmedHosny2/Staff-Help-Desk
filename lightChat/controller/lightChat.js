// make test controoler reutrn all KnowledgeBase
const chatModel = require("../model/lighChat");
const lightChatModel = require("../model/lighChat");
exports.getAllChats = async (req, res) => {
  try {
    const lightChat = await lightChatModel.find();
    res.status(200).json({
      status: "success",
      data: lightChat,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.sendMessage = async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.userId;
  console.log(sender, receiver, message);
  const chat = await chatModel.findOne({
    sender: sender,
    receiver: receiver,
  });
  if (chat) {
    chat.message.push(message);
    await chat.save();
    res.status(200).json({
      status: "success",
      data: chat,
    });
  } else {
    const newChat = await chatModel.create({
      sender: sender,
      receiver: receiver,
      message: message,
    });
    res.status(200).json({
      status: "success",
      data: newChat,
    });
  }
};
exports.getUserChats = async (req, res) => {
  try {
    const chats = await chatModel.find({
      $or: [{ sender: req.userId }, { receiver: req.userId }],
    });
    res.status(200).json({
      status: "success",
      data: chats,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
