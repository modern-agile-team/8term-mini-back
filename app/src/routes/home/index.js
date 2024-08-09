"use strict";

const express = require("express");
const router = express.Router();

const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const reviewInfoCtrl = require("../reviewInfo/reviewInfo.ctrl");
const wishListCtrl = require("../wishList/wishList.ctrl");

router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

router.get("/movies/:id/reviews", reviewInfoCtrl.process.checkReview); // 뒤에 페이지 쿼리 추가해야 됨
router.post("/movies/:id/reviews", reviewInfoCtrl.process.addReview);
router.delete("/users/my/reviews/:id", reviewInfoCtrl.process.removeReview);

router.get("/users/:id/wish-lists", wishListCtrl.process.getUserWishList);
router.post("/users/:id/wish-lists", wishListCtrl.process.addWishList);
router.delete("/users/my/wish-lists/:id", wishListCtrl.process.removeWishList);

module.exports = router;
