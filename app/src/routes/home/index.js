"use strict";

const express = require("express");
const router = express.Router();

const newctrl = require("../movieInfo/movieInfo.ctrl");
const userCtrl = require("../user/user.ctrl");

router.get("/", newctrl.process.check);

router.get("/login", userCtrl.output.login);
router.get("/register", userCtrl.output.register);

router.post("/login", userCtrl.process.login);
router.post("/register", userCtrl.process.register);

module.exports = router;
