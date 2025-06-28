const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "lumiq123",
  database: "sys",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(' MySQL connection failed:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
    connection.release(); // Release after checking
  }
});

module.exports = pool;
