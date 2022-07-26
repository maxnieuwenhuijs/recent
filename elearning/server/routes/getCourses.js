const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");

router.get("/", (req, res) => {
  
  let sql = `
    SELECT 
            courses.course_title, 
            courses.course_id, 
            courses.course_description,
            category.category_name,
            category.category_style
        FROM 
            e_learning.courses
        INNER JOIN
            e_learning.category ON category.category_id = courses.has_category
            ORDER BY courses.course_id DESC;`;

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
