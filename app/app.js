"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const home = require("./src/routes/home");

//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//앱 세팅
app.set("views", "./src/views");

app.use("/", home);

module.exports = app;
