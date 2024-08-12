"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러
const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const reviewInfoCtrl = require("../reviewInfo/reviewInfo.ctrl");
const commentInfoCtrl = require("../commentInfo/commentInfo.ctrl");
const wishListCtrl = require("../wishList/wishList.ctrl");

// movie 라우팅
router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

// review 라우팅
router.get("/movies/:id/reviews", reviewInfoCtrl.process.getReview); // 뒤에 페이지 쿼리 추가해야 됨
router.post("/movies/:id/reviews", reviewInfoCtrl.process.addReview);
router.delete("/users/my/reviews/:id", reviewInfoCtrl.process.removeReview);

// comment 라우팅
router.get("/reviews/:id/comments", commentInfoCtrl.process.getComment); // 뒤에 페이지 쿼리 추가해야 됨
router.post("/reviews/:id/comments", commentInfoCtrl.process.addComment);
router.delete("/users/my/comments/:id", commentInfoCtrl.process.removeComment);

// wishList 라우팅
router.get("/users/:id/wish-lists", wishListCtrl.process.getUserWishList);
router.post("/users/:id/wish-lists", wishListCtrl.process.addWishList);
router.delete("/users/my/wish-lists/:id", wishListCtrl.process.removeWishList);

module.exports = router;
