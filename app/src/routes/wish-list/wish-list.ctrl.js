"use strict";

const WishList = require("../../services/wish-list");

const process = {
  getUserWishList: (req, res) => {
    const wishList = new WishList(req);
    const response = wishList.getUserWishList();
    return res.json(response);
  },
  addWishList: (req, res) => {
    const wishList = new WishList(req);
    const response = wishList.addWishList();
    return res.json(response);
  },
};

module.exports = {
  process,
};
