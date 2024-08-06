"use strict";

const express = require("express");
const router = express.Router();

const newctrl = require("../movieInfo/movieInfo.ctrl");
const reviewCheckCtrl = require("../reviewInfo/reviewInfo.ctrl");

router.get("/movies/:id", newctrl.process.check);
router.get("/movies/:id/reviews", reviewCheckCtrl.process.reviewCheck);

module.exports = router;
