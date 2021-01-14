// REQUIRE EXPRESS
const { table } = require("console");
const express = require("express");
const path = require("path");

// CREATE AN INSTANCE OF EXPRESS
const app = express();

// CREATE A PORT FOR THE APP TO RUN
const PORT = process.env.PORT || 3000;
const VIEWS_DIR = path.resolve(__dirname, "views");

// ADD MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// BUT ALSO LISTEN TO ENVIRONMENT VARIABLES SO WE CAN DEPLOY TO HEROKU
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Array of tables and wait list
const tables = [];
const waitList = [];

// ARRAYS OF OBJECTS. OBJECTS SHOULD HAVE
// NAME
// PHONE
// EMAIL
// ID

// HTML ROUTES
// ROUTE FOR HOME
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// ROUTE FOR RESERVE
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(VIEWS_DIR, "reserve.html"));
  });

// ROUTE FOR TABLES
app.get("/tables", function(req, res) {
    console.log(VIEWS_DIR);
    console.log(path.join(VIEWS_DIR, "tables.html"));
    res.sendFile(path.join(VIEWS_DIR, "tables.html"));
  });

// API ROUTES
app.post("/api/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // We then add the json the user sent to the character array
  if (tables.length <= 5) {
    tables.push(newReservation);
  } else {
    waitList.push(newReservation);
  }

  // We then display the JSON to the users
  res.json(waitList);
});

app.get("/api/tables", function (req, res) {
  res.json(tables);
});

// GET ALL TABLE DATA
// CREATE A TABLE/RESERVATION
// LISTEN ON THE PORT
