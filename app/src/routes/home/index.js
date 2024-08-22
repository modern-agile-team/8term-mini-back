"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러
const movieCtrl = require("../movie/movie.ctrl");
const reviewCtrl = require("../review/review.ctrl");
const commentCtrl = require("../comment/comment.ctrl");
const wishListCtrl = require("../wishList/wishList.ctrl");
const reviewLikeCtrl = require("../reviewLike/reviewLike.ctrl");
const userCtrl = require("../user/user.ctrl");

// movie 라우팅
router.get("/movies", movieCtrl.process.getMovies);
router.get("/movies/:id", movieCtrl.process.getMovie);

// review 라우팅
router.get("/movies/:id/reviews", reviewCtrl.process.getReview);
router.post("/movies/:id/reviews", reviewCtrl.process.addReview);
router.delete("/users/my/reviews/:id", reviewCtrl.process.removeReview);
router.patch("/users/my/reviews/:id", reviewCtrl.process.updateReview);

// comment 라우팅
router.get("/reviews/:id/comments", commentCtrl.process.getComment);
router.post("/reviews/:id/comments", commentCtrl.process.addComment);
router.delete("/users/my/comments/:id", commentCtrl.process.removeComment);
router.patch("/users/my/comments/:id", commentCtrl.process.updateComment);

// wishList 라우팅
router.get("/users/:id/wish-lists", wishListCtrl.process.getUserWishList);
router.get("/users/:id/wish-lists/movies", wishListCtrl.process.getWishListMovies);
router.post("/users/:id/wish-lists", wishListCtrl.process.addWishList);
router.delete("/users/my/wish-lists/:id", wishListCtrl.process.removeWishList);

// reviewLike 라우팅
router.get("/reviews/:id/review-likes", reviewLikeCtrl.process.getReviewLike);
router.get("/users/:id/review-likes", reviewLikeCtrl.process.getUserReviewLike);
router.post("/users/:id/review-likes", reviewLikeCtrl.process.addReviewLike);
router.delete("/users/my/review-likes", reviewLikeCtrl.process.removeReviewLike);

// signUp 라우팅
router.post("/users", userCtrl.process.signUp);
router.post("/users/login", userCtrl.process.login);

module.exports = router;
