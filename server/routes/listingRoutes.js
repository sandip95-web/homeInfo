const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} = require("../controllers/listingController");

const router = express.Router();

router
  .post("/create", verifyToken, createListing)
  .delete("/delete/:id", verifyToken, deleteListing)
  .put("/update/:id", verifyToken, updateListing)
  .get("/get/:id", getListing)
  .get("/get", getListings);

module.exports = router;
