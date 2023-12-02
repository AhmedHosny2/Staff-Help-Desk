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
    const { statuscode, method, api, details, jwt, ipaddress } = req.body;

    const log = { statuscode, method, api, details, ipaddress }
    const decoded = jwt.verify(token, secretKey);

    if (decoded) {
      log = { ...log, userId: decoded._id }
    }

    console.log(log);
    await logsModel.create(log)
    res.status(200).json({ status: "success", });
  } catch (err) {
    const log = { statuscode: "500", method: "post", api: "/logging/log", details: err, ipaddress: "log ip" }
    await logsModel.create(log)
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};