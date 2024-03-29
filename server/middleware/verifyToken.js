const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const catchAysncError = require("./catchAysncError");

exports.verifyToken = catchAysncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    next(new ErrorHandler("Please Login to access this resource", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new ErrorHandler("Token expired. Please log in again.", 401)
        );
      }
      return next(new ErrorHandler("Forbidden", 403));
    }
    req.user = user; // Set user only if token is valid
    next();
  });
});
