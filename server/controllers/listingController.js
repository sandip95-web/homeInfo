const catchAysncError = require("../middleware/catchAysncError");
const Listing = require("../models/listingModel");

exports.createListing = catchAysncError(async(req,res,next)=>{
    const listing = await Listing.create(req.body);
    res.status(200).json(listing);
})