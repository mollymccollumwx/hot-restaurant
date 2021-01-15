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
// NAME
// PHONE
// EMAIL
// ID
const tables = [
  { name: "wilbur", phone: "555-5555", email: "wilbur@gmail.com", id: "12345" },
  { name: "penny", phone: "555-5556", email: "penny@gmail.com", id: "23456" },
  { name: "pete", phone: "555-5557", email: "pete@gmail.com", id: "34567" },
];
const waitList = [
  { name: "woodstock", phone: "555-5558", email: "woodstock@gmail.com", id: "45678" },
  { name: "snoopy", phone: "555-5559", email: "snoopy@gmail.com", id: "56789" },
  { name: "charlie brown", phone: "555-5550", email: "charlie@gmail.com", id: "67890" },
];

// HTML ROUTES
// ROUTE FOR HOME
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ROUTE FOR RESERVE
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(VIEWS_DIR, "reserve.html"));
});

// ROUTE FOR TABLES
app.get("/tables", function (req, res) {
  res.sendFile(path.join(VIEWS_DIR, "tables.html"));
});

// API ROUTES
app.post("/api/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;
  const waiting = { onWaitList: true };

  // We then add the json the user sent to the character array
  if (tables.length < 5) {
    tables.push(newReservation);
    waiting.onWaitList = false; 
  } else {
    waitList.push(newReservation);
    waiting.onWaitList = true;
  }

  // Return true (if the reservation is accepted) or false (if they are put on the wait list)
  res.json(waiting);
});


app.get("/api/reserve", function (req, res) {
  res.json(waitList);
});

app.get("/api/tables", function (req, res) {
  res.json(tables);
});

// GET ALL TABLE DATA
// CREATE A TABLE/RESERVATION
// LISTEN ON THE PORT
