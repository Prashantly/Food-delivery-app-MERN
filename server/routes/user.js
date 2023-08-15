const express = require("express");
// const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.post("/create-user", userController.create);
router.post("/login", userController.createSession);

module.exports = router;
