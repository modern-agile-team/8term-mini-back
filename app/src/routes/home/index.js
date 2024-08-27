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

// validation 컨트롤러
const movieValidation = require("../movie/movieValidation");
const reviewValidation = require("../review/reviewValidation");
const commentValidation = require("../comment/commentValidation");
const wishListValidation = require("../wishList/wishListValidation");
const reviewLikeValidation = require("../reviewLike/reviewLikeValidation");
const userValidation = require("../user/userValidation");

// movie 라우팅
router.get("/movies", movieValidation.checkGetMovies, movieCtrl.process.getMovies);
router.get("/movies/:id", movieValidation.checkGetMovie, movieCtrl.process.getMovie);

// review 라우팅
router.get("/movies/:id/reviews", reviewValidation.checkGetReview, reviewCtrl.process.getReview);
router.post("/movies/:id/reviews", reviewValidation.checkAddReview, reviewCtrl.process.addReview);
router.delete(
  "/users/my/reviews/:id",
  reviewValidation.checkDeleteReview,
  reviewCtrl.process.removeReview
);
router.patch(
  "/users/my/reviews/:id",
  reviewValidation.checkUpdateReview,
  reviewCtrl.process.updateReview
);

// comment 라우팅
router.get(
  "/reviews/:id/comments",
  commentValidation.checkGetComment,
  commentCtrl.process.getComment
);
router.post(
  "/reviews/:id/comments",
  commentValidation.checkAddComment,
  commentCtrl.process.addComment
);
router.delete(
  "/users/my/comments/:id",
  commentValidation.checkDeleteComment,
  commentCtrl.process.removeComment
);
router.patch(
  "/users/my/comments/:id",
  commentValidation.checkUpdateComment,
  commentCtrl.process.updateComment
);

// wishList 라우팅
router.get(
  "/users/:id/wish-lists",
  wishListValidation.checkGetWishList,
  wishListCtrl.process.getUserWishList
);
router.get(
  "/users/:id/wish-lists/movies",
  wishListValidation.checkGetWishListMovies,
  wishListCtrl.process.getWishListMovies
);
router.post(
  "/users/:id/wish-lists",
  wishListValidation.checkAddWishList,
  wishListCtrl.process.addWishList
);
router.delete(
  "/users/my/wish-lists/:id",
  wishListValidation.checkDeleteWishList,
  wishListCtrl.process.removeWishList
);

// reviewLike 라우팅
router.get(
  "/reviews/:id/review-likes",
  reviewLikeValidation.checkGetReviewLike,
  reviewLikeCtrl.process.getReviewLike
);
router.get(
  "/users/:id/review-likes",
  reviewLikeValidation.checkGetUserReviewLike,
  reviewLikeCtrl.process.getUserReviewLike
);
router.post(
  "/users/:id/review-likes",
  reviewLikeValidation.checkAddReviewLike,
  reviewLikeCtrl.process.addReviewLike
);
router.delete(
  "/users/my/review-likes/:id",
  reviewLikeValidation.checkDeleteReviewLike,
  reviewLikeCtrl.process.removeReviewLike
);

// user 라우팅
router.post("/users", userCtrl.process.signUp);
router.post("/users/login", userCtrl.process.login);
router.get("/users/check-id", userCtrl.process.checkId);

module.exports = router;
