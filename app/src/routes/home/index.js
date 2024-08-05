"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/movies", ctrl.process.getMovies);

module.exports = router;
