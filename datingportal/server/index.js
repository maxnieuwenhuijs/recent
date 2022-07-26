const express = require('express');
const db = require("./connection");
const path = require("path");
const cors = require("cors");

const PostProfile = require('./routes/PostProfile')
const PostNewProfile = require('./routes/PostNewProfile')
const GetProfiles = require('./routes/GetProfiles')
const getNumberImages = require('./routes/getNumberImages')
const postMatch = require('./routes/postMatch')
const getFavorites = require('./routes/getFavorites')
const GetSingleProfile = require('./routes/GetSingleProfile')
const PostImages = require('./routes/PostImages')
const Login = require("./routes/Login");
const Logout = require("./routes/Logout");
const Cookie = require("./routes/GetCookie");
const StartChat = require("./routes/StartChat");
const PostChatMessage = require("./routes/PostChatMessage");
const GetChats = require("./routes/GetChats");
const GetChatId = require("./routes/GetChatId");
const GetChatMessages = require("./routes/GetChatMessages");

const app = express();

app.use(cors());
app.use('/api/cookie', Cookie);
app.use('/api/startchat', StartChat);
app.use('/api/message', PostChatMessage);
app.use('/api/getchatid', GetChatId);
app.use('/api/getmessages', GetChatMessages);
app.use('/api/getchats', GetChats);
app.use('/api/post', PostProfile);
app.use('/api/postnew', PostNewProfile);
app.use('/api/get', GetProfiles);
app.use('/api/getprofile', GetSingleProfile);
app.use('/api/images', getNumberImages);
app.use('/api/match', postMatch);
app.use('/api/favorite', getFavorites);
app.use('/api/postimage', PostImages);
app.use("/api/login", Login);
app.use("/api/logout", Logout);
//images
let profilesDir = path.join(__dirname, "/profiles");
app.use("/api/profile" ,express.static(profilesDir));

let publicDir = path.join(__dirname, "/api/public");
app.use(express.static(publicDir));

app.listen("8080", () => {
  console.log("Server started on port 8080...");
});