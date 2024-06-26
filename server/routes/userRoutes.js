const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  updateUser,
  deleteUser,
  signout,
  getUserListing,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .patch("/update/:id", verifyToken, updateUser)
  .delete("/delete/:id", verifyToken, deleteUser)
  .get("/listing/:id", verifyToken, getUserListing)
  .get("/:id", verifyToken, getUser)
 

module.exports = router;
