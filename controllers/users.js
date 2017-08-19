const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config");

const registerUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Please provide a valid email and/or password!"
    });
  }

  let newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    res.status(201).json({ message: "User registered successfully." });
  });
};

const authenticateUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) { throw err; }
    if (!user) {
      return res.status(400).json({
        message: "Authentication faild! User not found."
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!err && isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 60   // In seconds
        });
        res.status(200).json({ token: "JWT " + token });
      } else {
        res.status(403).json({
          message: "Authentication failed! Password didn't match."
        });
      }
    });
  });
};

const getDashboard = (req, res) => {
  res.status(200).json({ message: "It worked! User ID is: " + req.user._id });
};

module.exports = {
  registerUser,
  authenticateUser,
  getDashboard
};
