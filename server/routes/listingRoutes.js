const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { createListing } = require("../controllers/listingController");

const router = express.Router();

router.post("/create", verifyToken, createListing);

module.exports = router;
