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

exports.updateListing = catchAysncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler("Listing not found", 404));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler("You can only delete your own listings", 401));
  }
  const updateListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Listing deleted successfully",
    updateListing,
  });
});

exports.getListing = catchAysncError(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    next(new ErrorHandler("Listing not found", 404));
  }
  res.status(200).json(listing);
});

exports.getListings = catchAysncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let offer = req.query.offer;

  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  let parking = req.query.parking;

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  let type = req.query.type;

  if (type === undefined || type === "all") {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json(listings);
});
