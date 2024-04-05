const catchAysncError = require("../middleware/catchAysncError");
const Listing = require("../models/listingModel");

exports.createListing = catchAysncError(async (req, res, next) => {
  const listing = await Listing.create(req.body);
  res.status(200).json(listing);
});

exports.deleteListing = catchAysncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler("Listing not found", 404));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler("You can only delete your own listings", 401));
  }
  const deleteListing = await Listing.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Listing deleted successfully" });
});
