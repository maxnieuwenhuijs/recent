const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");

router.get("/:courseId", (req, res) => {
      const courseId = req.params.courseId;

      let sql = `
       SELECT 
            courses.course_title, 
            courses.course_id, 
            courses.course_description,
            lessons.lesson_title,
            lessons.lesson_order,
            lessons.lesson_id,
            lessons.has_course
        FROM 
            e_learning.courses
        INNER JOIN
            e_learning.lessons ON courses.course_id = lessons.has_course
		    WHERE
            courses.course_id = ${courseId}
        ORDER BY lessons.lesson_order;`;

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
