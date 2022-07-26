const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:courseId", function (req, res) {
  const courseId = req.params.courseId;
  const data = `public/assets/courses/${courseId}/text/text.json`;

  const content = fs.readFileSync(data);
  res.header("Content-Type", "application/json");
  res.send(content);
});

module.exports = router;
