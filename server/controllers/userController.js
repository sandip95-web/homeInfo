const catchAysncError = require("../middleware/catchAysncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const Listing = require("../models/listingModel");
exports.updateUser = catchAysncError(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(
      new ErrorHandler("You are not Authorized to Update this Profile", 403)
    );
  }
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
});

exports.deleteUser = catchAysncError(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(new ErrorHandler("You can only delete your account", 403));
  }
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User Deleted Successfully!" });
});

exports.getUserListing = catchAysncError(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(new ErrorHandler("You can only view your own listing only", 403));
  }
  const listing = await Listing.find({ userRef: req.params.id });
  res.status(200).json(listing);
});

exports.getUser = catchAysncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new ErrorHandler("User not found", 404));
  }
  const { password: pass, ...rest } = user._doc;
  res.status(200).json(rest);
});
