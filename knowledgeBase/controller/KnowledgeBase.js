// make test controoler reutrn all KnowledgeBase
 
const KnowledgeBaseModel = require("../model/KnowledgeBase");
exports.getAllKnowledgeBase = async (req, res) => {
  try {
    const KnowledgeBase = await KnowledgeBaseModel.find();
    res.status(200).json({
      status: "success",
      data: KnowledgeBase,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};