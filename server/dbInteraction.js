/**
This is the script for sending and recieving data to and from the database.
*/

var express = require('express')
var router = express.Router();

const db = require('./dbConnection.js');

function addUser(name, password) {
  let query = "INSERT INTO Users (username, password) VALUES (\"" + name + "\",\"" + password + "\");";

  db.query(query, function (error, results) {
    if (error) throw error

    console.log('Rows affected:', results);
  });

}

// This returns undefined. Believe it is because of scope. javaScript is stupid. 
function usernameExists(name) {
  let query = "SELECT username FROM Users WHERE username = \"" + name + "\" ;";

  db.query(query, function (error, result) {
    if (error) throw error

    if (JSON.stringify(result) != "[]") {
      return true;
    }
    else {
      return false;
    }
  });

}


function getPassword(username) {
  let query = "SELECT password FROM Users WHERE username = \"" + username + "\" ;";

  db.query(query, function (error, result) {
    if (error) throw error

    return JSON.stringify(result);
  });
}


//addUser("Sol", "pass");
console.log(usernameExists("Sol"));
console.log(usernameExists("Paul"));
console.log(getPassword("SOL"));

//db.end();


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



