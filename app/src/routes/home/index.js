"use strict";

const express = require("express");
const router = express.Router();

const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const reviewInfoCtrl = require("../reviewInfo/reviewInfo.ctrl");
const commentInfoCtrl = require("../commentInfo/commentInfo.ctrl");

router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

router.get("/movies/:id/reviews", reviewInfoCtrl.process.getReview); // 뒤에 페이지 쿼리 추가해야 됨
router.post("/movies/:id/reviews", reviewInfoCtrl.process.addReview);
router.delete("/users/my/reviews/:id", reviewInfoCtrl.process.removeReview);

router.get("/reviews/:id/comments", commentInfoCtrl.process.getComment); // 뒤에 페이지 쿼리 추가해야 됨
router.post("/reviews/:id/comments", commentInfoCtrl.process.addComment);
// router.delete("/users/my/comments/:id", commentInfoCtrl.process.removeComment);

module.exports = router;
