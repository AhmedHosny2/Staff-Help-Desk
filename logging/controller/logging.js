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

exports.logError = async (req, res) => {
  try {
    const { statuscode, method, api, details, userId } = req.body;
    const log = { statuscode, method, api, details, userId }
    await logsModel.create(log)
    res.status(200).json({ status: "success", });
  } catch (err) {
    const log = { statuscode: "404", method: "post", api: "/logging/log", details: err}
    await logsModel.create(log)
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};