"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const home = require("./src/routes/home");

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // 요청을 허용할 도메인
  credentials: true, // 자격 증명을 허용
};

//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

//앱 세팅
app.set("views", "./src/views");

app.use("/", home);

module.exports = app;
