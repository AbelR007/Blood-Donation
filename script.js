const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.DBMS_DATABASE,
  password: process.env.DBMS_PASSWORD, // Change to your password
  port: 5432, // Default Port
});

app.use(express.static(path.join("")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

app.get("/donations", (req, res) => {
  const query = "SELECT * FROM donations;";

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const donations_list = result.rows;
      res.json(donations_list);
    }
  });
});

app.get("/donor_a", (req, res) => {
  const query = "SELECT SUM(litres) FROM donations WHERE bloodtype = 'A+' ;";

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const donations_list = result.rows;
      res.json(donations_list);
    }
  });
});
app.get("/donor_b", (req, res) => {
  const query = "SELECT SUM(litres) FROM donations WHERE bloodtype = 'B+' ;";

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const donations_list = result.rows;
      res.json(donations_list);
    }
  });
});
app.get("/donor_o", (req, res) => {
  const query = "SELECT SUM(litres) FROM donations WHERE bloodtype = 'O+' ;";

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const donations_list = result.rows;
      res.json(donations_list);
    }
  });
});
app.get("/donor_ab", (req, res) => {
  const query = "SELECT SUM(litres) FROM donations WHERE bloodtype = 'AB+' ;";

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while retrieving data from the database.");
    } else {
      const donations_list = result.rows;
      res.json(donations_list);
    }
  });
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.post("/donations", (req, res) => {
  const { person, bloodtype, litres } = req.body;
  const donationid = randomNumber(1, 10000);

  const query = "INSERT INTO donations (donationid, person, bloodtype, litres) VALUES ($1, $2, $3, $4)";

  pool.query(query, [donationid, person, bloodtype, litres], (error) => {
    if (error) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .send("An error occurred while inserting data into the database.");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

