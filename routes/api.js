const express  = require("express");
const passport = require("passport");

const users = require("../controllers/users");

const router = express.Router();

router.post("/register", users.registerUser);
router.post("/authenticate", users.authenticateUser);
router.get("/dashboard",
  passport.authenticate("jwt", { session: false }),
  users.getDashboard);

module.exports = router;
