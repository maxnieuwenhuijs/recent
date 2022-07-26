const express = require("express");
const router = express.Router();
const profilesFolder =  "profiles";
const path = require('path');
const fs = require('fs');
var cors = require("cors");
router.use(cors());

router.get("/:member_id", (req, res) => {

  const member_id = req.params.member_id;
  let number

  fs.readdir(profilesFolder, function (error, files) {  
   console.log(files); 
    var totalFiles = files.length; // return the number of files
    // console.log(totalFiles); // print the total number of files
    let fileString = JSON.stringify(files);
    let regex = new RegExp(`${member_id}`, "g");
    console.log(regex)
    let obj = (fileString.match(regex) || []).length;
    
    number = obj;
    console.log(number)
     res.send({ count : number});
  });

 
});

module.exports = router;
