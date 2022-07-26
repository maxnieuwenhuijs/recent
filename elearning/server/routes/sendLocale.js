const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:portalId", function (req, res) {
    const portalId = req.params.portalId;
    const data = `public/assets/brandSpecific/${portalId}/locale.json`;

    const content = fs.readFileSync(data);
    res.header("Content-Type", "application/json");
    res.send(content);
});

module.exports = router;
