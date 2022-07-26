const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../connection");
var cors = require("cors");
router.use(cors());

router.get("/:user_id/:member_id/:status", (req, res) => {

    let user_id = req.params.user_id;
    let member_id = req.params.member_id;
    let status = req.params.status;
  
  const timestamp = new Date().getTime();

  let sql = `SELECT 
  * 
  FROM
  datingportal.user_matched
  WHERE user_id = ${user_id}
   && member_id = ${member_id};`;
  
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }

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

    if (!results[0] == '') {
      let postMatch = ` 
       UPDATE datingportal.user_matched
    SET status = ${status},
    timestamp = ${timestamp}
     WHERE user_id = ${user_id}
   && member_id = ${member_id};
   `
      let post = db.query(postMatch, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
          }
          res.send(results);
      });
    } else {
      let postMatch = `
    INSERT INTO datingportal.user_matched (user_id, member_id, status, timestamp)
    VALUES (${user_id}, ${member_id}, ${status}, ${timestamp});
    `;
      let post = db.query(postMatch, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
          }
          res.send(results);
      });
    }


  })
   
   
   
});

module.exports = router;