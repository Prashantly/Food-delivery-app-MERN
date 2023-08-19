module.exports.getFoodData = (req, res) => {
  try {
    res.status(200).json([global.food_items, global.food_categories]);
  } catch (err) {
    // Handle the error appropriately
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
