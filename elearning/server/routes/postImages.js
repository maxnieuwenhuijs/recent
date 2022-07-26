const express = require("express");
const router = express.Router();
var multer = require("multer");
var cors = require("cors");
const db = require("../connection");

router.use(cors());

router.post("/:fileId/", function (req, res) {
  let sql = "SELECT MAX(course_id) AS id FROM e_learning.courses;";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }

    var rows = JSON.parse(JSON.stringify(results[0]));

    const courseId = rows.id;

    const fileId = req.params.fileId;

    const filepath = `public/assets/courses/${courseId}/img`;

    const fileName = fileId;

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filepath);
      },
      filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, fileName + "." + extension);
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
  });
});

module.exports = router;
