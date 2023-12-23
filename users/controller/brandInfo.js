const mongoose = require("mongoose");

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
  console.log(newBrandInfo);
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

exports.createBrandInfo = async (req, res) => {
  const id = req.userId;
  const { name, slogan, theme } = req.body;

  try {
    // check if user has already created brand info uodate it
    const brandInfoExists = await brandInfoModel.findOne({ userId: id });
    if (brandInfoExists) {
      // update brand info
      const newBrandInfo = req.body;
      const brandInfo = await brandInfoModel.findOneAndUpdate(
        { userId: id },
        newBrandInfo,
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Brand info Updated!",
        data: brandInfo,
      });
    }
    const newBrandInfo = {
      userId: id,
      name,
      slogan,
      theme,
    };
    console.log(newBrandInfo);

    const brandInfo = await brandInfoModel.create(newBrandInfo);

    return res.status(201).json({
      status: "success",
      message: "Brand info created!",
      data: brandInfo,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
