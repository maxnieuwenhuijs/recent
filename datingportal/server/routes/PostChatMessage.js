const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
const bodyParser = require("body-parser");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/:user_id/", (req, res) => {

    let user_id = req.params.user_id;
    const timestamp = new Date().getTime();
  
  console.log(req.body)
  
    let sql = `
    INSERT INTO datingportal.chat_message (chat_id, user_id, content, timestamp, isRead)
    VALUES (${req.body.chat_id}, ${user_id}, "${req.body.content}",${timestamp}, 0);
    `;

      let query = db.query(sql, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(200);
          return;
        }
        res.send(results);
      });
});

module.exports = router;