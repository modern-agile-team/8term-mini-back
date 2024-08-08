"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const home = require("./src/routes/home");

app.use(express.json());

//앱 세팅
app.set("views", "./src/views");

app.use("/", home);

module.exports = app;
