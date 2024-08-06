"use strict";

const express = require("express");
const router = express.Router();

const movieCtrl = require("../movie/movie.ctrl");
const newctrl = require("../movieInfo/movieInfo.ctrl");

router.get("/movies", movieCtrl.process.getMovies);
router.get("/", newctrl.process.check);

module.exports = router;
