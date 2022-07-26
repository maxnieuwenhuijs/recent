const express = require("express");
const router = express.Router();
const db = require("../connection");
const fs = require("fs");
const bodyParser = require("body-parser");

let folderName;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  let sql = "SELECT MAX(course_id) AS id FROM e_learning.courses;";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
      results.sendStatus(500);
      return;
    }

    var rows = JSON.parse(JSON.stringify(results[0]));

    folderName = rows.id + 1;
    console.log(folderName);

    //Make course main-folder
    let targetDir = `./public/assets/courses/${folderName}`;
    let makeEbookFolder = `${targetDir}/ebook`;
    let makeImgFolder = `${targetDir}/img`;
    let makeLessonsFolder = `${targetDir}/lessons`;
    let makeTextFolder = `${targetDir}/text`;

    //Create Folder structure
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(makeEbookFolder, { recursive: true });
    fs.mkdirSync(makeImgFolder, { recursive: true });
    fs.mkdirSync(makeLessonsFolder, { recursive: true });
    fs.mkdirSync(makeTextFolder, { recursive: true });

    console.log(req.body);
    //JSON TEXT Requirements
    let title = req.body.title;
    let summary_title = req.body.summary_title;
    let category = req.body.category;
    let summary = req.body.summary;
    let summary_list_title = req.body.summary_list_title;
    let summary_list = req.body.summary_list;
    let product_summary_title = req.body.product_summary_title;
    let product_summary = req.body.product_summary;
    let ebook_title = req.body.ebook_title;

    //Update List wist ; && ebook lowercase and no space
    let summary_list_updated = summary_list.replace(/\n/gi, ";");
    let ebook_title_updated =
      ebook_title.replace(" ", "_").toLowerCase();

    //create JSON
    let text = {
      title: title,
      summary_title: summary_title,
      summary: summary,
      summary_list_title: summary_list_title,
      summary_list: summary_list_updated,
      product_summary_title: product_summary_title,
      product_summary: product_summary,
      ebook_title: ebook_title_updated,
    };

     //Write JSON file to folder
    fs.writeFile(
      `${makeTextFolder}/text.json`,
      JSON.stringify(text, null, 4),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File has been created");
      }
    );

    let categoryID;

    switch (category) {
      case "Marketing":
        categoryID = 1;
        break;
      case "Mind & Body":
        categoryID = 2;
        break;
      case "Business":
        categoryID = 3;
        break;
      case "Health & Beauty":
        categoryID = 4;
        break;
      case "Home & Garden":
        categoryID = 5;
        break;
      case "Personal Finance":
        categoryID = 6;
        break;
      case "Recipes & Cooking":
        categoryID = 7;
        break;
      case "Relationships":
        categoryID = 8;
        break;
      case "Sports":
        categoryID = 9;
        break;
      case "Travel":
        categoryID = 10;
        break;
      default:
        categoryID = 11;
    }

    console.log(categoryID);

    let postCourse = `
    INSERT INTO e_learning.courses (course_id, course_title, course_description, has_category)
    VALUES (${folderName}, "${title}", "${summary_title}", ${categoryID})`;
    let post = db.query(postCourse, (err, results) => {
      if (err) {
        throw err;
        results.sendStatus(500);
        return;
      }
    });
    res.send(".. Hello we made contact ;)");
  });
});

module.exports = router;
