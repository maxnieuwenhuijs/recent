const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/:age_from/:age_to/:gender/:sexual_orientation", (req, res) => {

    let user_id = req.params.user_id;
    let age_from = req.params.age_from;
    let age_to = req.params.age_to;
    let gender = req.params.gender;
    let sexual_orientation = req.params.sexual_orientation;

      let sql = `
       SELECT 
            *
        FROM 
            datingportal.profiles

        WHERE 
        member_id
        NOT IN (SELECT member_id FROM datingportal.user_matched WHERE user_matched.user_id = ${user_id}) &&
        profiles.age_from >= ${age_from} &&
        profiles.age_to <= ${age_to} &&
        profiles.sexual_orientation = "${sexual_orientation}" &&
        profiles.gender = "${gender}"
       
        ORDER BY RAND()
        LIMIT 100`;

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