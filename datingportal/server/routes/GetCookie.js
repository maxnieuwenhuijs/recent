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


router.get("/", (req, res) => {

    res.cookie('myCookie', 'LOGGED_IN', {
        maxAge: 31 * 24 * 60 * 60 * 1000
    })
    res.end('Cookie Send')
});

module.exports = router;
