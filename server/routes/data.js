const express = require("express");
const router = express.Router();
const foodDataController = require("../controllers/foodData_controller");

router.get("/foodData", foodDataController.getFoodData);

module.exports = router;
