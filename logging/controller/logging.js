// make test controoler reutrn all logs
 
const logsModel = require("../model/logging");
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await logsModel.find();
    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};