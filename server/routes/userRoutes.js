const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { updateUser } = require("../controllers/userController");
const router = express.Router();


router.patch("/update/:id",verifyToken,updateUser)

module.exports = router;

