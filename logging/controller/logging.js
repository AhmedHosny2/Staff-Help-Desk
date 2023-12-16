// make test controoler reutrn all logs
const logsModel = require("../model/logging");
const jwt = require("jsonwebtoken");
const axios = require('axios');

exports.getLogs = async (req, res) => {

  if (req.userRole !== "admin") {
    const log = { statuscode: "401", method: "post", api: "/logging/advanced", details: "Unautorized call to get logs", ipaddress: "log ip" }
    await logsModel.create(log)
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  try {
    const logs = await logsModel.find({}, { time: 1, statuscode: 1, method: 1, api: 1 }).sort({ time: -1});
    return res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (err) {
    const log = { statuscode: "500", method: "GET", api: "/logging/", details: err, ipaddress: "log ip" }
    await logsModel.create(log)
    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

exports.getAdvancedLogs = async (req, res) => {

  if (req.userRole !== "admin") {
    const log = { statuscode: "401", method: "post", api: "/logging/advanced", details: "Unautorized call to get advanced logs", ipaddress: "log ip" }
    await logsModel.create(log)
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  try {
    const logs = await logsModel.find().sort({ time: -1});;
    return res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (err) {
    const log = { statuscode: "500", method: "GET", api: "/logging/advanced", details: err, ipaddress: "log ip" }
    await logsModel.create(log)
    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

exports.logError = async (req, res) => {
  try {
    const { statuscode, method, api, details, token, ipaddress } = req.body;

    var log = { statuscode, method, api, details, ipaddress }

    //Gets ip location by an API call ,but in localhost it doesnot make the call
    if (ipaddress !== "127.0.0.1") {
      await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${ipaddress}`)
        .then(response => {
          const data = response.data;
          log = { ...log, country: data.country_name, city: data.city }
        })
        .catch(error => {
          console.error('Error fetching geolocation:', error);
        });
    }

    //Checks if the token is valid then gets user ID
    if (token) {

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (decoded) {
        log = { ...log, userId: decoded.id }
      }
      else {
        log = { statuscode: "400", method, api, details: "Forged token", ipaddress, userId: decoded.id }
      }
    }

    await logsModel.create(log)
    return res.status(200).json({ status: "success", });
  } catch (err) {
    const log = { statuscode: "500", method: "POST", api: "/logging/log", details: err, ipaddress: "log ip" }
    await logsModel.create(log)
    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};