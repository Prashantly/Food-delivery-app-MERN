const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URL;

let db;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    // db = mongoose.connection;
    console.log("Database connection is successfull");
  } catch (err) {
    console.error("Error in connecting to database!!!", err);
  }
};

const fetchDocuments = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to the database");

    const database = client.db("TastyHubMERN"); // Replace "your_database_name" with your actual database name
    const collection1 = database.collection("food_items"); // Replace "food_items" with the name of your collection
    const collection2 = database.collection("food_categories");

    // Fetch all documents from the collection
    const foodItemsDoc = await collection1.find({}).toArray();
    const foodCatDoc = await collection2.find({}).toArray();
    global.food_items = foodItemsDoc;
    global.food_categories = foodCatDoc;
  } catch (err) {
    console.error("Error fetching documents:", err);
  } finally {
    client.close();
    console.log("Connection closed");
  }
};

connectDB();
fetchDocuments();

module.exports = db;
