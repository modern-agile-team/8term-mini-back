"use strict";

const WishListService = require("../../services/wishListService");

const process = {
  getUserWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const response = await wishListService.getUserWishList();
    return res.json(response);
  },
  addWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const response = await wishListService.addWishList();
    return res.json(response);
  },
  removeWishList: async (req, res) => {
    const wishListService = new WishListService(req);
    const response = await wishListService.removeWishList();
    return res.json(response);
  },
};

module.exports = {
  process,
};
