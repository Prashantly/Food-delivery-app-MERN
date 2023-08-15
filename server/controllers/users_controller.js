const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const {
  createValidation,
  validate,
} = require("../validators/create_user_validation");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRETKEY;
const bcrypt = require("bcrypt");

/* User Creation controller*/
module.exports.create = [
  createValidation, // Apply validation rules
  validate, // Middleware to check validation results
  async (req, res) => {
    try {
      //create user
      const { name, email, password, location } = req.body;

      // check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "user alreday exist" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // If user doesn't exist, proceed with user creation
      await User.create({
        name,
        email,
        password: hashedPassword,
        location,
      });

      // User successfully created
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
];

module.exports.createSession = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),

  async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422) //422 Unprocessable Entity
        .json({
          success: false,
          message: "Password length must be more than 6.",
        });
    }
    try {
      let userData = await User.findOne({ email });
      // console.log(userData);

      if (!userData) {
        return res
          .status(401) //401 Unauthorized
          .json({ success: false, message: "Authentication failed" });
      }

      //compare passwords using bcrypt
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication failed" });
      }

      //if user email and password are correct
      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        auth: {
          token: jwt.sign({ userId: userData.id }, secret, {
            expiresIn: 24 * 60 * 60,
          }),
        },
      });
    } catch (err) {
      console.error("Error--->", err);
      return res
        .status(500)
        .json({ success: false, message: "An error occurred" });
    }
  },
];
