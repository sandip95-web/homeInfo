const bcrypt = require("bcrypt");
const User = require("../models/userModel");
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

exports.google = catchAysncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    sendToken(user, 200, res);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const newUsername =
      req.body.name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-8);

    const newUser = await User({
      username:newUsername,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    await newUser.save();
    sendToken(newUser, 200, res);
  }
});
