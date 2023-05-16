const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

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
app.use(bodyParser.json());

// Endpoint for posting device data
app.post('/device-data', (req, res) => {
  const { deviceId, timestamp, temperature } = req.body;

  // Insert data into the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).json({ error: 'Failed to connect to the database' });
    }

    const sql = 'INSERT INTO device_data (deviceId, timestamp, temperature) VALUES (?, ?, ?)';
    const values = [deviceId, timestamp, temperature];

    connection.query(sql, values, (error, results) => {
      connection.release(); // Release the connection

      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).json({ error: 'Failed to insert data into the database' });
      }

      res.status(200).json({ message: 'Device data inserted successfully' });
    });
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port http://localhost:4000');
});
