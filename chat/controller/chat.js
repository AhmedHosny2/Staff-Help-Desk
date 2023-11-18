// make test controoler reutrn all chatts
 
const chatModel = require("../model/chat");
exports.getAllchats = async (req, res) => {
  try {
    const chats = await chatModel.find();
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