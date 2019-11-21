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

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

  var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(12) PRIMARY KEY, password VARCHAR(12)) ENGINE=INNODB;";
  var createScores = "CREATE TABLE IF NOT EXISTS Scores(name VARCHAR(12), score INT, FOREIGN KEY(name) REFERENCES Users(username)) ENGINE=INNODB;"

  connection.query(createUsers, (err, result) => {
    if (err) throw err;
    console.log("Database: User table updated.");
  });

  connection.query(createScores, (err, result) => {
    if (err) throw err;
    console.log("Database: Scores table updated.");
  });

});