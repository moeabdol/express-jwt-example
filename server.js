const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const morgan     = require("morgan");
const passport   = require("passport");
const jwt        = require("jsonwebtoken");

const app  = express();
const port = 3000;

// Configure bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure morgan
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(port);
console.log("Server is running on port " + port);
