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

exports.postKnowledgeBase = async (req, res) => {
  try {
    const newKnowledgeBase = await KnowledgeBaseModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: newKnowledgeBase,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}