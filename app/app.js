"use strict";

//모듈
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const home = require("./src/routes/home");

const app = express();
dotenv.config();

//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://mordern-movie.netlify.app"],
    credentials: true,
  })
);

//라우팅
app.use("/", home);

module.exports = app;
