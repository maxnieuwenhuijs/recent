const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:chat_id/", (req, res) => {

    let chat_id = req.params.chat_id;

      let sql = `
       SELECT 
            user_id,
            content,
            timestamp
            
        FROM 
            datingportal.chat
            INNER JOIN datingportal.profiles ON profiles.member_id = chat.user_2
            INNER JOIN datingportal.chat_message ON chat_message.chat_id = chat.id
            WHERE chat.id = ${chat_id}

            ORDER by timestamp ASC
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