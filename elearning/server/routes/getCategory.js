const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM e_learning.category;";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
