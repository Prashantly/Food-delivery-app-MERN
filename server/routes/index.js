const express = require("express");
const router = express.Router();
const passport = require("passport");

// router.get("/")
router.use("/api", require("./user"));
router.use("/api", require("./data"));
router.use("/api", require("./order"));

module.exports = router;
