const mongoose = require("mongoose");

const { brandInfoModel } = require("../model/brandInfo");

// GET BRAND INFO
exports.getBrandInfo = async (req, res) => {
  try {
    const brandInfo = await brandInfoModel.find();

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
// exports.updateBrandInfo = async (req, res) => {
//   const id = req.userId;
//   const newBrandInfo = req.body;
//   console.log(newBrandInfo);
//   try {
//     const brandInfo = await brandInfoModel.findOneAndUpdate(
//       { userId: id },
//       newBrandInfo,
//       { new: true }
//     );

//     if (!brandInfo) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Brand info not found",
//       });
//     }

//     return res.status(200).json({
//       status: "success",
//       message: "Brand info updated!",
//       data: brandInfo,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

exports.createBrandInfo = async (req, res) => {
  console.log(req.body);
  const { name, theme } = req.body;

  try {
    // check if user has already created brand info update it
    const brandInfoExists = await brandInfoModel.findOne();
    if (brandInfoExists) {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (theme) updateFields.theme = theme;

      const brandInfo = await brandInfoModel.findOneAndUpdate(
        {}, // filter
        updateFields, // update fields
        { new: true } // options: return the updated document
      );

      return res.status(200).json({
        status: "success",
        message: "Brand info Updated!",
        data: brandInfo,
      });
    }

    const newBrandInfo = {
      name,
      theme,
    };

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
