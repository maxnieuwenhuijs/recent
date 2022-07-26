const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../connection");
const cookieParser = require('cookie-parser');
const https = require("https");

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
    origin = 'ucoursey'
  } else {
    var dotPosition = locationName.indexOf(".") + 1;
    var dotPositionLast = locationName.lastIndexOf(".");
    origin = locationName.substring(dotPosition, dotPositionLast);
  }

  let apiUrl = `https://staging.matchtech.io/csp/subscription/internalCheck?userName=${username}&password=${password}&apiCode=${origin}`;

  console.log(apiUrl)

  function setCookie(data) {
    res.cookie('userStatus', 'LOGGED_IN', 'username', {
      maxAge: 31 * 24 * 60 * 60 * 1000
    })
    res.cookie('user', data[0].email, {
      maxAge: 31 * 24 * 60 * 60 * 1000
    })

    res.cookie('admin', data[0].admin, {
      maxAge: 31 * 24 * 60 * 60 * 1000
    })
  }

  let user = [];

  let body = "";
  https.get(apiUrl, res => {
    res.setEncoding("utf8");
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      checkUser();
    });


  function checkUser() { 
    //preform test user check
    if (body.status == 0) {
      let sql = `SELECT * FROM e_learning.users WHERE email = '${req.body.username}' AND password = '${req.body.password}';`;

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
      user.push(body);
      SendUser()
      } else {
      console.log('nothing found');
      }
    }
  });

  function SendUser() {
    if (user == 0) {
      console.log('No user found');
      res.send('No user found');
    } else if (user[0].test_account == 1) {
      console.log('User Testaccount');
      setCookie(user)
      res.send(user)
    } else if (user[0].status == 1) {
      console.log('User Subscriber');
      setCookie(user)
      res.cookie('sessionID', user[0].accountSession.accountSessionId, {
        maxAge: 31 * 24 * 60 * 60 * 1000
      })
      res.send(user)
    }
    else {
      res.send('No user found');
    }
  }
  

});

module.exports = router;

