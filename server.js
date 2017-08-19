const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const morgan     = require("morgan");
const passport   = require("passport");

const config     = require("./config");
const apiRoutes  = require("./routes/api");

const app  = express();
const port = 3000;

// Configure bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure morgan
app.use(morgan("dev"));

// Get passport's JWT strategy
require("./config/passport")(passport);

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// Initialize passport
app.use(passport.initialize());

// Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(port);
console.log("Server is running on port " + port);
