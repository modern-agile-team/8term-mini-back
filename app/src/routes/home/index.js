"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
const newctrl = require("../movieInfo/movieInfo.ctrl");

//데이터 베이스 연결 확인용 테스트 코드입니다.
router.get("/", ctrl.process.test);
router.get("/", newctrl.process.check);

module.exports = router;
