const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders_controller");
const passport = require("passport");

router.post(
  "/createOrder",
  passport.authenticate("jwt", { session: false }),
  ordersController.createOrder
);
router.post(
  "/getOrders",
  passport.authenticate("jwt", { session: false }),
  ordersController.getUserOrders
);

module.exports = router;
