"use strict";

const WishList = require("../../services/wish-list");

const process = {
  getWishList: (req, res) => {
    const wishList = new WishList(req);
    const response = wishList.getWishList();
    return res.json(response);
  },
};

module.exports = {
  process,
};
