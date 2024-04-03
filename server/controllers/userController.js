const catchAysncError = require("../middleware/catchAysncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");

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


