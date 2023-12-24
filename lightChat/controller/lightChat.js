// make test controoler reutrn all KnowledgeBase
 
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
