const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.get("/", function (req, res) {

  function setCookie() {
    res.cookie('userStatus', '', {
      maxAge: 0
    })
    res.cookie('user', '', {
      maxAge: 0
    })

    res.cookie('admin', '', {
      maxAge: 0
    })

    res.cookie('testaccount', '', {
      maxAge:0
    })

    res.cookie('sessionID', '', {
      maxAge: 0
    })
  }

  console.log('Log out called and delete Cookies');
  setCookie();
  res.end('Delete Cookies');
});

module.exports = router;

