const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const db = require("./connection");

//Import Routes
const Login = require("./routes/Login");
const Login2 = require("./routes/Login2");
const Logout = require("./routes/Logout");
const getCategory = require("./routes/getCategory");
const getCourses = require("./routes/getCourses");
const getFullCourse = require("./routes/getFullCourse");
const getText = require("./routes/getText");
const sendVideo = require("./routes/sendVideo");
const getEbook = require("./routes/getEbook");
const postLesson = require("./routes/postLesson");
const postImages = require("./routes/postImages");
const postEbook = require("./routes/postEbook");
const sendLocale = require("./routes/sendLocale");
const postNewCourse = require("./routes/postNewCourse");

app.use("/category", getCategory);
app.use("/courses", getCourses);
app.use("/course", getFullCourse);
app.use("/text/", getText);
app.use("/video/", sendVideo);
app.use("/download/", getEbook);

app.use("/admin/create", postNewCourse);
app.use("/admin/upload", postLesson);
app.use("/admin/image", postImages);
app.use("/admin/ebook", postEbook);

app.use("/login", Login);
app.use("/login2", Login2);
app.use("/logout", Logout);

app.use("/portal", sendLocale);


let publicDir = path.join(__dirname, "/public");
app.use(express.static(publicDir));

app.get("/", (req, res) => { 
  res.send('Connection made')
})

app.listen("8000", () => {
  console.log("Server started on port 8000...");

});

