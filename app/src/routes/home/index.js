"use strict";

const express = require("express");
const router = express.Router();

const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const reviewInfoCtrl = require("../reviewInfo/reviewInfo.ctrl");

router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

router.get("/movies/:id/reviews", reviewInfoCtrl.process.reviewCheck);
router.post("/movies/:id/reviews", reviewInfoCtrl.process.reviewAdd);

module.exports = router;
