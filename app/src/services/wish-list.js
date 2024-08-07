"use strict";

const WishListStorage = require("../models/wishListStorage");

class WishList {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getWishList() {
    const userId = Number(this.params.id);
    const response = await WishListStorage.getWishListInfo(userId);
    return response;
  }
}

module.exports = WishList;
