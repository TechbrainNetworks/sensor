const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./dbConfig");

const router = express.Router();
router.use(bodyParser.json());

// Endpoint for posting device data

router.get("/", (req, res) => {
  const date = new Date();
  const hour = date.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  res.send(greeting + "💕😉");
});

router.post("/device-data", (req, res) => {
  const { deviceId, timestamp, temperature } = req.body;

  // Insert data into the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return res
        .status(500)
        .json({ error: "Failed to connect to the database" });
    }

    const sql =
      "INSERT INTO device_data (deviceId, timestamp, temperature) VALUES (?, ?, ?)";
    const values = [deviceId, timestamp, temperature];

    connection.query(sql, values, (error, results) => {
      connection.release(); // Release the connection

      if (error) {
        console.error("Error executing the query:", error);
        return res
          .status(500)
          .json({ error: "Failed to insert data into the database" });
      }

      res.status(200).json({ message: "Device data inserted successfully" });
    });
  });
});

module.exports = router;
