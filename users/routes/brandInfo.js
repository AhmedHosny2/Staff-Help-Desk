const express = require("express");
const router = express.Router();
const {
  getBrandInfo,
  updateBrandInfo,
  createBrandInfo,
} = require("../controller/brandInfo");
const { verifyToken, verfiyRole } = require('../utils/middleware');
router.use(verifyToken);
router.use(verfiyRole);

router.get("/getBrandInfo", getBrandInfo);
//this riyte will create adn update brand info
router.post("/createBrandInfo", createBrandInfo);

// router.put("/updateBrandInfo/:id", updateBrandInfo);

// router.delete("/deleteBrandInfo/:id", deleteBrandInfo );

module.exports = router;
