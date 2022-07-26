const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');


router.use(cookieParser());


router.get("/", (req, res) => {

    res.cookie('myCookie', 'LOGGED_IN', {
        maxAge: 31 * 24 * 60 * 60 * 1000
    })
    res.end('Cookie Send')
});

module.exports = router;
