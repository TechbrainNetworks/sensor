const mysql = require('mysql2');

// Create connection pool to MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'techbrain',
    database: 'sensor',
    port: 3306
  });

module.exports = pool;