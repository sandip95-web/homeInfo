const express = require("express");
const { signup, signin } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup).post("/signin", signin);

module.exports = router;
