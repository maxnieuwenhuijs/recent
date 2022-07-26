const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/:status", (req, res) => {

    let user_id = req.params.user_id;
  let status = req.params.status;
  
    //Define status
    //0 = user liked profile
    //1 = profile liked user
    //2 = user & profile are matched
    //3 = user liked & pinged profile
    //4 = user Pinged profile
    //5 = profile pinged user
    //6 = profile liked and pinged user
    //7 = user blocked profile
    //8 = profile blocked user
  
      let sql = `
       SELECT 
            *
        FROM 
            datingportal.user_matched
            INNER JOIN datingportal.profiles ON profiles.member_id = user_matched.member_id
            WHERE user_matched.user_id = ${user_id} && user_matched.status = ${status}
       
        UNION ALL

        SELECT 
            *
        FROM 
            datingportal.user_matched
            INNER JOIN datingportal.profiles ON profiles.member_id = user_matched.member_id
            WHERE user_matched.user_id = ${user_id} && user_matched.status = 0
            

            ORDER BY timestamp DESC
        `

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