const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/", (req, res) => {

    let user_id = req.params.user_id;

      let sql = `
       SELECT 
            *
        FROM 
            datingportal.chat
            INNER JOIN datingportal.profiles ON profiles.member_id = chat.user_2
            INNER JOIN datingportal.chat_message ON chat_message.chat_id = chat.id
            WHERE    chat_message.timestamp =  ( SELECT MAX( chat_message.timestamp ) FROM datingportal.chat_message 
                        WHERE chat_message.chat_id = chat.id ) && chat.user_1 = ${user_id}
                        order by timestamp DESC
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