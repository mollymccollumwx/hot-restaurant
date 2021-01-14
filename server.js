// REQUIRE EXPRESS
const express = require("express");
const path = require("path");

// CREATE AN INSTANCE OF EXPRESS
const app = express();

// CREATE A PORT FOR THE APP TO RUN
const PORT = process.env.PORT || 3000;

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
// ROUTE FOR TABLES
// ROUTE FOR RESERVE
// API ROUTES
// GET ALL TABLE DATA
// CREATE A TABLE/RESERVATION
// LISTEN ON THE PORT
