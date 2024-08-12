"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러
const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const reviewInfoCtrl = require("../reviewInfo/reviewInfo.ctrl");
const commentInfoCtrl = require("../commentInfo/commentInfo.ctrl");
const wishListCtrl = require("../wishList/wishList.ctrl");
const reviewLikeCtrl = require("../reviewLike/reviewLike.ctrl");

// movie 라우팅
router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

// review 라우팅
router.get("/movies/:id/reviews", reviewInfoCtrl.process.getReview);
router.post("/movies/:id/reviews", reviewInfoCtrl.process.addReview);
router.delete("/users/my/reviews/:id", reviewInfoCtrl.process.removeReview);
router.patch("/users/my/reviews/:id", reviewInfoCtrl.process.updateReview);

// comment 라우팅
router.get("/reviews/:id/comments", commentInfoCtrl.process.getComment);
router.post("/reviews/:id/comments", commentInfoCtrl.process.addComment);
router.delete("/users/my/comments/:id", commentInfoCtrl.process.removeComment);
router.patch("/users/my/comments/:id", commentInfoCtrl.process.updateComment);

// wishList 라우팅
router.get("/users/:id/wish-lists", wishListCtrl.process.getUserWishList);
router.post("/users/:id/wish-lists", wishListCtrl.process.addWishList);
router.delete("/users/my/wish-lists/:id", wishListCtrl.process.removeWishList);

// reviewLike 라우팅
router.get("/reviews/:id/review-likes", reviewLikeCtrl.process.getReviewLike);
router.get("/users/:id/review-likes", reviewLikeCtrl.process.getUserReviewLike);
router.post("/users/:id/review-likes", reviewLikeCtrl.process.addReviewLike);
router.delete("/users/my/review-likes", reviewLikeCtrl.process.removeReviewLike);

module.exports = router;
