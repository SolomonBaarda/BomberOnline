/**
This is the script for the database.
*/

const mysql = require('mysql');

// Create connection to the database
// Port 3306
const connection = mysql.createConnection({
  // Very secure having the login here!
  host: 'sql2.freesqldatabase.com',
  user: 'sql2313046',
  password: 'wP1%fL5!',
  database: 'sql2313046'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database');

  // Queries for ensuring both tables are created 
  var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(12) PRIMARY KEY, password VARCHAR(12)) ENGINE=INNODB;";
  var createScores = "CREATE TABLE IF NOT EXISTS Scores(name VARCHAR(12), score INT, FOREIGN KEY(name) REFERENCES Users(username)) ENGINE=INNODB;"

  connection.query(createUsers, function (err, result) {
    if (err) throw err;
    console.log("Database: User table created.");
  });

  connection.query(createScores, function (err, result) {
    if (err) throw err;
    console.log("Database: Scores table created.");
  });

  // keep the connection running 
  //connection.end();
});

// Export it for use elsewhere
module.exports = connection;