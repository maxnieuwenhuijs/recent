const express = require("express");
const router = express.Router();
var multer = require("multer");
var cors = require("cors");
const db = require("../connection");

router.use(cors());

router.post("/:user_id/:file_id", function (req, res) {
    const file_id = req.params.file_id;
    const user_id = req.params.user_id;

    const filepath = `profiles/`;

    const fileName = user_id + "_" + file_id;

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filepath);
      },
      filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
          let extension = extArray[extArray.length - 1];
          
          if (extension == 'jpeg') {
              extension = 'jpg'
          }
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

module.exports = router;
