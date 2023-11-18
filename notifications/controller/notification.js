// make test controoler reutrn all notificationts
 
const notificationModel = require("../model/notification");
exports.getAllnotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find();
    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};