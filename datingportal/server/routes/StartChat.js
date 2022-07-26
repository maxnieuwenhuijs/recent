const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/:member_id", (req, res) => {

    let user_id = req.params.user_id;
    let member_id = req.params.member_id;

      let sql = `SELECT 
  * 
  FROM
  datingportal.chat
  WHERE user_1 = ${user_id}
   && user_2 = ${member_id};`;

    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
            results.sendStatus(500);
            return;
        }

        console.log(results)

        if (results.length == 0) {
    
            let sql = `
        INSERT INTO datingportal.chat (user_1, user_2)
        VALUES (${user_id}, ${member_id});
        `;

            let query = db.query(sql, (err, results) => {
                if (err) {
                    throw err;
                    results.sendStatus(200);
                    return;
                }
                console.log('chat started: ' + user_id + " " + member_id)
                res.send(results);
            });
        } else {
            console.log('chat already in DB');
             res.send(results);
        }
    })
});

module.exports = router;