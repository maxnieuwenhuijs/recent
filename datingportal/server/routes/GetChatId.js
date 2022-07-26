const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/:member_id", (req, res) => {

    let user_id = req.params.user_id;
    let member_id = req.params.member_id;

      let sql = `
       SELECT 
            id
        FROM 
            datingportal.chat
            WHERE chat.user_1 = ${user_id}
            && chat.user_2 =${member_id}
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