const express = require("express");
const router = express.Router();
const { getBrandInfo,updateBrandInfo } = require("../controller/brandInfo");

router.get("/getBrandInfo", getBrandInfo);

// router.post("/addBrandInfo", addBrandInfo);

router.put("/updateBrandInfo/:id", updateBrandInfo);

// router.delete("/deleteBrandInfo/:id", deleteBrandInfo );

module.exports = router;
