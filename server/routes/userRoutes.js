const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  updateUser,
  deleteUser,
  signout,
} = require("../controllers/userController");
const router = express.Router();

router
  .patch("/update/:id", verifyToken, updateUser)
  .delete("/delete/:id", verifyToken, deleteUser)
  .post("/signout", verifyToken, signout);

module.exports = router;
