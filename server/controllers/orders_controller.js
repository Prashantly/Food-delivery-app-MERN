const Order = require("../models/Order");

module.exports.createOrder = async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()
  let existingOrder = await Order.findOne({ email: req.body.email });
  console.log(existingOrder);
  if (existingOrder === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.status(201).json({
        success: true,
        message: "Order has been successfully added",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );

      res.status(201).json({
        success: true,
        message: "Order has been successfully added",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports.getUserOrders = async (req, res) => {
  try {
    let userOrderData = await Order.findOne({ email: req.body.email });

    if (userOrderData && userOrderData.order_data) {
      const orderData = userOrderData.order_data;
      res.json({
        orders: orderData,
      });
    } else {
      res.json({
        // If no order data is found for the user, send an empty array to the frontend.
        orders: [],
      });
    }
  } catch (err) {
    console.log("Error:***", err);
    // Send an error response to the frontend if an error occurs.
    res.json({ error: "Internal Server Error" });
  }
};
