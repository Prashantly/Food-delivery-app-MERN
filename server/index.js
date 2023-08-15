// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
// Create an Express app
const app = express();
const port = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true, //access-control-allow-credentials:true
  })
);
// Middleware to parse JSON data in the request body
app.use(express.json());

app.use(passport.initialize());
//user express router
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.error(`Error occurred while starting the server: ${err}`);
  } else {
    console.log(`Application listening on port ${port}`);
  }
});
