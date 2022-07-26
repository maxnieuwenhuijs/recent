const express = require("express");
const router = express.Router();

router.get("/:courseId/:ebookId/", (req, res) => {
  const courseId = req.params.courseId;
  const ebookId = req.params.ebookId;
  const file = `public/assets/courses/${courseId}/ebook/${ebookId}`;
  res.download(file); // Set disposition and send it.
});

module.exports = router;
