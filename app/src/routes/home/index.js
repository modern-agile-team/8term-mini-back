"use strict";

const express = require("express");
const router = express.Router();

const movieInfoCtrl = require("../movieInfo/movieInfo.ctrl");
const wishListCtrl = require("../wish-list/wish-list.ctrl");

router.get("/movies", movieInfoCtrl.process.getMovie);
router.get("/movies/:id", movieInfoCtrl.process.getMovie);

router.get("/users/:id/wish-lists", wishListCtrl.process.getUserWishList);
router.post("/users/:id/wish-lists", wishListCtrl.process.addWishList);
//router.delete("/users/my/wish-lists/:id", wishListCtrl.process.delete);

module.exports = router;
