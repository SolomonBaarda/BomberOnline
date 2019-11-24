/**
This is the script for the database.
*/

const mysql = require('mysql');

// Create connection to the database
// Port 3306
const connection = mysql.createConnection({
  host: 'sql2.freesqldatabase.com',
  user: 'sql2313046',
  password: 'wP1%fL5!',
  database: 'sql2313046'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database');

  // Queries for ensuring both tables are created 
  var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR("+USERNAME_MAX_LENGTH+") PRIMARY KEY, password VARCHAR("+USERNAME_MAX_LENGTH+")) ENGINE=INNODB;";
  var createScores = "CREATE TABLE IF NOT EXISTS Scores(name VARCHAR("+USERNAME_MAX_LENGTH+"), score INT, FOREIGN KEY(name) REFERENCES Users(username)) ENGINE=INNODB;"

  connection.query(createUsers, function (err, result) {
    if (err) throw err;
    console.log("Database: User table created.");
  });

  connection.query(createScores, function (err, result) {
    if (err) throw err;
    console.log("Database: Scores table created.");
  });

});

// Export it for use elsewhere
module.exports = database;