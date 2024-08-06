"use strict";

const express = require("express");
const router = express.Router();

const newctrl = require("../movieInfo/movieInfo.ctrl");

router.get("/", newctrl.process.check);

module.exports = router;
