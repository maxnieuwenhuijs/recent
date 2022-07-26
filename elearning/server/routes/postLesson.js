const express = require("express");
const router = express.Router();
var multer = require("multer");
var cors = require("cors");
const db = require("../connection");
const bodyParser = require("body-parser");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/:lessonId/", function (req, res) {
  let sql = "SELECT MAX(course_id) AS id FROM e_learning.courses;";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }

    let video_title = req.body.video_title;

    console.log(video_title);

    var rows = JSON.parse(JSON.stringify(results[0]));

    const courseId = rows.id;

    const lessonId = req.params.lessonId;
    const filepath = `public/assets/courses/${courseId}/lessons`;

    const videoName = lessonId + ".mp4";

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filepath);
      },
      filename: function (req, file, cb) {
        cb(null, videoName);
      },
    });

    var upload = multer({ storage: storage }).single("file");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });

    if (video_title != undefined) {
      let postTitle = String(video_title);

      let postCourse = `
    INSERT INTO e_learning.lessons (lesson_title, lesson_order, has_course)
    VALUES ("${postTitle}", ${lessonId}, ${courseId})`;
      let post = db.query(postCourse, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
        }
      });
    }
  });
});

module.exports = router;
