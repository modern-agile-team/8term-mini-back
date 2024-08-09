"use strict";

const WishList = require("../../services/wishList");

const process = {
  getUserWishList: async (req, res) => {
    const wishList = new WishList(req);
    const response = await wishList.getUserWishList();
    return res.json(response);
  },
  addWishList: async (req, res) => {
    const wishList = new WishList(req);
    const response = await wishList.addWishList();
    return res.json(response);
  },
  removeWishList: async (req, res) => {
    const wishList = new WishList(req);
    const response = await wishList.removeWishList();
    return res.json(response);
  },
};

module.exports = {
  process,
};
