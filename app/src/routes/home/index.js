"use strict";

const express = require("express");
const router = express.Router();

const newctrl = require("../movieInfo/movieInfo.ctrl");
const userCtrl = require("../user/user.ctrl");

router.get("/", newctrl.process.check);

router.post("/users", userCtrl.process.signUp);

module.exports = router;
