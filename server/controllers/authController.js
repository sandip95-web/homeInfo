const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const catchAysncError = require("../middleware/catchAysncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/JWTtoken");

exports.signup = catchAysncError(async (req, res, next) => {
  const { username, email, password } = req.body;

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
});

exports.signin = catchAysncError(async (req, res, next) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
