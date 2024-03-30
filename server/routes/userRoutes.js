const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router
  .patch("/update/:id", verifyToken, updateUser)
  .delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
