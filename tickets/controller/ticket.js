// make test controoler reutrn all tickets
 
const ticketModel = require("../model/ticket");
exports.getAlltickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.status(200).json({
      status: "success",
      data: tickets,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};