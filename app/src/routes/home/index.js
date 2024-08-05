"use strict";

const express = require("express");
const router = express.Router();

const movieCtrl = require("../movie/movie.ctrl");

router.get("/movies", movieCtrl.process.getMovies);

module.exports = router;
