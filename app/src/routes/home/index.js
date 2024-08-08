"use strict";

const express = require("express");
const router = express.Router();

const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const userCtrl = require("../user/user.ctrl");

router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

router.post("/users", userCtrl.process.signUp);

module.exports = router;
