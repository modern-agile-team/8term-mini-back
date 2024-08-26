"use strict";

const WishListService = require("../../services/wishListService");

const process = {
  getUserWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const { status, data } = await wishListService.getUserWishList();
    return res.status(status).json(data);
  },
  getWishListMovies: async (req, res) => {
    const wishListService = new WishListService(req);
    const { status, data } = await wishListService.getWishListMovies();
    return res.status(status).json(data);
  },
  addWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const { status, data } = await wishListService.addWishList();
    return res.status(status).json(data);
  },
  removeWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const { status, data } = await wishListService.removeWishList();
    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
