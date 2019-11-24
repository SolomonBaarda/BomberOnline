/**
This is the script for sending and recieving data to and from the database.
*/


var express = require('express')
var router = express.Router();

const db = require('./dbConnection.js');



// Get all the users in the database
router.get('/usernames', function (req, res) {
  let query = "SELECT username from Users";

  db.query(query, function (err, result, fields) {
    if (err) throw err;

    console.log(result);
    return result;
  });
});


// signup user
router.post('/user/createAccount', function (req, res) {

  let query = "INSERT INTO Users (username, password) VALUES ()";

  db.query(query, function (err, result, fields) {
    if (err) throw err;

    console.log("Successfully created account");
  });

});



