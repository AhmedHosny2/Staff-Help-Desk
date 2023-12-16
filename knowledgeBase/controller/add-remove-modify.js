const faqModel = require("../model/KnowledgeBase");

exports.removeFaq = async (req, res) => {
  const id = req.params.id;
  try {
    const faq = await faqModel.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing FAQ" });
  }
};

exports.modifyFaq = async (req, res) => {
  const id = req.params.id;
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400).send("missing required parameters.");
    }
    const lastModified = Date.now();

    const faq = await faqModel.findByIdAndUpdate(
      id,
      { question, answer, lastModified },
      { new: true }
    );
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error modifying FAQ" });
  }
};

exports.createFaq = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const createdBy = req.userId;

    const newFaq = new faqModel({
      question,
      answer,
      createdBy,
    });
    await newFaq.save();

    res.status(201).json({ message: "FAQ created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating FAQ" });
  }
};
