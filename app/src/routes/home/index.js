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
const authCtrl = require("../../auth/auth.ctrl");

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
router.post(
  "/movies/:id/reviews",
  authCtrl.check.accessToken,
  reviewValidation.checkAddReview,
  reviewCtrl.process.addReview
);
router.delete(
  "/users/my/reviews/:id",
  authCtrl.check.accessToken,
  reviewValidation.checkDeleteReview,
  reviewCtrl.process.removeReview
);
router.patch(
  "/users/my/reviews/:id",
  authCtrl.check.accessToken,
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
  authCtrl.check.accessToken,
  commentValidation.checkAddComment,
  commentCtrl.process.addComment
);
router.delete(
  "/users/my/comments/:id",
  authCtrl.check.accessToken,
  commentValidation.checkDeleteComment,
  commentCtrl.process.removeComment
);
router.patch(
  "/users/my/comments/:id",
  authCtrl.check.accessToken,
  commentValidation.checkUpdateComment,
  commentCtrl.process.updateComment
);

// wishList 라우팅
router.get(
  "/users/:id/wish-lists",
  authCtrl.check.accessToken,
  wishListValidation.checkGetWishList,
  wishListCtrl.process.getUserWishList
);
router.get(
  "/users/:id/wish-lists/movies",
  authCtrl.check.accessToken,
  wishListValidation.checkGetWishListMovies,
  wishListCtrl.process.getWishListMovies
);
router.post(
  "/users/:id/wish-lists",
  authCtrl.check.accessToken,
  wishListValidation.checkAddWishList,
  wishListCtrl.process.addWishList
);
router.delete(
  "/users/my/wish-lists/:id",
  authCtrl.check.accessToken,
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
  authCtrl.check.accessToken,
  reviewLikeValidation.checkGetUserReviewLike,
  reviewLikeCtrl.process.getUserReviewLike
);
router.post(
  "/users/:id/review-likes",
  authCtrl.check.accessToken,
  reviewLikeValidation.checkAddReviewLike,
  reviewLikeCtrl.process.addReviewLike
);
router.delete(
  "/users/my/review-likes/:id",
  authCtrl.check.accessToken,
  reviewLikeValidation.checkDeleteReviewLike,
  reviewLikeCtrl.process.removeReviewLike
);

// user 라우팅
router.post("/users", userCtrl.process.signUp);
router.post("/users/login", userCtrl.process.login);
router.get("/users/check-id", userCtrl.process.checkId);
router.put("/users/:user_id", userCtrl.process.updateUser);

module.exports = router;
