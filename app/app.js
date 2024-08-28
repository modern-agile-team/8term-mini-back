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
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://mordern-movie.netlify.app/",
    ],
    credentials: true,
  })
);

//라우팅
app.use("/", home);

module.exports = app;
