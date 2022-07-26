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
   
  let sql = `SELECT 
  * 
  FROM
  datingportal.profiles
  WHERE member_id = ${user_id};`;
  
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }

   console.log(req.body)

    if (!results[0] == '') {
      let postMatch = ` 
       UPDATE datingportal.profiles
    SET 
        full_name = "${req.body.full_name}",
        headline = "${req.body.headline}",
        description = "${req.body.description}",
        birthdate = "${req.body.birthdate}",
        gender = "${req.body.gender}",
        marital_status = "${req.body.marital_status}",
        looking_for = "${req.body.looking_for}",
        language = "${req.body.language}",
        race = "${req.body.race}",
        religion = "${req.body.religion}",
        drink = "${req.body.drink}",
        smoke = "${req.body.smoke}",
        other_info = "${req.body.other_info}",
        photo_count = 5,
        seek_gender = "${req.body.seek_gender}",
        age_from = "${req.body.age_from}",
        age_to = "${req.body.age_to}",
        city = "${req.body.city}",
        state= "${req.body.state}",
        country = "${req.body.country}"     
        WHERE member_id = ${user_id}
    ;
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
    INSERT INTO datingportal.profiles (member_id, username, full_name, gender, birthdate, headline, description, marital_status, looking_for, language, race, religion, smoke, drink, other_info, photo_count, seek_gender, age_from, age_to, city, state, country)
    VALUES (${user_id}, 
    "${req.body.full_name}", 
    "${req.body.full_name}", 
    "${req.body.gender}", 
    "${req.body.birthdate}", 
    "${req.body.headline}", 
    "${req.body.description}",
    "${req.body.marital_status}",
    "${req.body.looking_for}",
    "${req.body.language}",
    "${req.body.race}",
    "${req.body.religion}",
    "${req.body.smoke}",
    "${req.body.drink}",
    "${req.body.other_info}",
    5,
    "${req.body.seek_gender}",
    ${req.body.age_from},
    ${req.body.age_to},
    "${req.body.city}",
    "${req.body.state}",
    "${req.body.country}",
    );
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