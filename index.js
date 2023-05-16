const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const apis = require('./apis');

// Create connection pool to MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'techbrain',
  database: 'sensor',
  port: 3306
});

const app = express();
app.use(cors());

app.use('/', apis);

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port http://localhost:4000');
});
