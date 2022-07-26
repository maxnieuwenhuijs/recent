const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../connection");
const cookieParser = require('cookie-parser');
const https = require("https");
const cors = require("cors");
router.use(cors());

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", function (req, res) {

    
  let username = req.body.username;
  let password = req.body.password;
  let locationName = req.hostname;
  let origin;
  // let origin = 'thebestbutler';

  if (locationName == 'localhost') {
    origin = 'love-flirt'
  } else {
    var dotPosition = locationName.indexOf(".") + 1;
    var dotPositionLast = locationName.lastIndexOf(".");
    origin = locationName.substring(dotPosition, dotPositionLast);
  }

  
  let apiUrl = **************************************************;

  console.log(apiUrl)

  let user = [];

    let body = "";
    let mergedObject = "";

    https.get(apiUrl,(res) => {

    res.on("data", (data) => {
        body += data;
        
    });

        res.on("end", () => {

            body = JSON.parse(body);
                checkUser()

    });



  function checkUser() { 
    //preform test user check
      if (body.status == 0) {
        
       let sql = `SELECT * FROM datingportal.user WHERE email = '${req.body.username}' AND password = '${req.body.password}';`;

      let query = db.query(sql, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
        }
          if (results.length === 0) {
          user == 0
          SendUser()
          } else {
                    
          let data = JSON.parse(JSON.stringify(results[0]))
              user.push(data);
              
          SendUser()
        }
      });
      } else if (body.status == 1) {

        console.log('body.status == 1 --user subscribed')



      let sql = `SELECT * FROM datingportal.user WHERE email = '${req.body.username}' AND password = '${req.body.password}';`;

      let query = db.query(sql, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
        }
          if (results.length === 0) {
            
            console.log('no user found in DB');
               let postNewProfile = `
                INSERT INTO datingportal.user (new, service_id, email, password, test_account)
                VALUES (1, 1, "${req.body.username}", "${req.body.password}", 0);
                  `;
            
            let sql = `SELECT * FROM datingportal.user WHERE email = '${req.body.username}' AND password = '${req.body.password}';`;


            let post = db.query(postNewProfile, (err, results) => {
              if (err) {
                throw err;
                results.sendStatus(500);
                return;
              }
            }, userIsMade()
              )

          } else {

            console.log('user found in DB')
              let data = JSON.parse(JSON.stringify(results[0]))
              user.push(data);
              
            let sessionID = body.accountSession.accountSessionId;
            
            console.log(sessionID)
              console.log("user: " + JSON.stringify(user))

            mergedObject = {
                                  sessiondid: sessionID,
                                  ...user
            };
            
            console.log(JSON.stringify(mergedObject))

          SendUser()
        }
      });






 
      } else {
      console.log('nothing found');
      }
    }
    });
  
  function userIsMade() {

    setTimeout(function () {
      
     let sql = `SELECT * FROM datingportal.user WHERE email = '${req.body.username}' AND password = '${req.body.password}';`;

      let query = db.query(sql, (err, results) => {
        if (err) {
          throw err;
          results.sendStatus(500);
          return;
        }
                             
           console.log('userIsMade' + results)
              let data = JSON.parse(JSON.stringify(results[0]))
              user.push(data);
              
            let sessionID = body.accountSession.accountSessionId;
            
            console.log(sessionID)
              console.log("user: " + JSON.stringify(user))

            mergedObject = {
                                  sessiondid: sessionID,
                                  ...user
            };
            
            console.log(JSON.stringify(mergedObject))

          SendUser()
      });
    },500)
  }

  function SendUser() {
    if (user == 0) {
      console.log('No user found');
      res.send('No user found');
    } else if (user[0].test_account == 1) {
      console.log('User Testaccount');
    //   setCookie(user)
      res.send(user)
    } else if (user[0].test_account == 0) {
      console.log('User Subscriber');
      return res.send(mergedObject)
    }
    else {
      res.send('No user found');
    }
  }
  

});

module.exports = router;

