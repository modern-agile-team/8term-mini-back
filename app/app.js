"use strict";

//모듈
const express = require("express");

const app = express();

const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");

app.use("/", home);

module.exports = app;
