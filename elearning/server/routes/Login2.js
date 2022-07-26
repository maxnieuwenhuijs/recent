const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../connection");
const cookieParser = require('cookie-parser');
const https = require("https");
const axios = require('axios');


router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", function (req, res) {

  let msisdn = req.body.msisdn;
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

  let apiUrl = `https://subapi.tech-lab.io/customer/msisdn/internal/check?apiCode=subscriptioncheck&msisdn=${msisdn}`;

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

  axios.get(apiUrl)
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    user.push(res.data);

    SendUser()
  })
  .catch(err => {
    console.log('Error: ', err.message);
  })

  function SendUser() {
    if (user[0].subscribed == false) {
      console.log('No user found');
      res.send('No user found');
    } else if (user[0].subscribed == true) {
      console.log('User Subscriber');
      setCookie(user)
      res.cookie('sessionID', user[0].onlineSessionId, {
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

