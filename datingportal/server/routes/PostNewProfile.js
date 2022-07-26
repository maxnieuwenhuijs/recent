const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
const bodyParser = require("body-parser");
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/:user_id/", (req, res) => {

    const user_id = req.params.user_id

   let postMatch = `
    INSERT INTO datingportal.profiles (member_id, age_from, age_to)
    VALUES (${user_id}, 18, 65);
    `;

    let postStatusNew = `
     UPDATE datingportal.user SET user.new = 0
    WHERE  id = ${user_id}
    `;

      let post = db.query(postMatch, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
          }
      }, db.query(postStatusNew, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
          }
          res.send(results);
      })
    
      )
   
   
});

module.exports = router;