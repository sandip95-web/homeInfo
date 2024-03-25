const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      next(errorHandler(400, "Username or Email Already Exist"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(404, "Something Went Wrong Please Try Again"));
  }
};

module.exports = { signup };
