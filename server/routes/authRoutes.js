const express = require("express");
const { signup, signin, google, signout } = require("../controllers/authController");
const router = express.Router();

router
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/google", google)
  .post("/signout", signout);

module.exports = router;
