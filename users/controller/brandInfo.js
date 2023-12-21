// const mongoose = require("mongoose");
const { brandInfoModel } = require("../model/brandInfo");

// GET BRAND INFO
exports.getBrandInfo = async (req, res) => {
  const id = req.userId;

  try {
    const brandInfo = await brandInfoModel.findOne({ userId: id });

    if (!brandInfo) {
      return res.status(404).json({
        status: "fail",
        message: "Brand info not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: brandInfo,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// UPDATE BRAND INFO
exports.updateBrandInfo = async (req, res) => {
  const id = req.userId;
  const newBrandInfo = req.body;

  try {
    const brandInfo = await brandInfoModel.findOneAndUpdate(
      { userId: id },
      newBrandInfo,
      { new: true }
    );

    if (!brandInfo) {
      return res.status(404).json({
        status: "fail",
        message: "Brand info not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Brand info updated!",
      data: brandInfo,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
