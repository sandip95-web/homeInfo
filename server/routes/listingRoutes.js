const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { createListing, deleteListing } = require("../controllers/listingController");

const router = express.Router();

router
  .post("/create", verifyToken, createListing)
  .delete("/delete/:id", verifyToken, deleteListing);

module.exports = router;
