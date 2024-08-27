"use strict";

const WishListStorage = require("../models/wishListStorage");
const stringUtils = require("../common/utils/stringUtils");

class WishListService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getUserWishList() {
    const userId = this.params.id;
    try {
      const response = await WishListStorage.getUserWishListInfo(userId);
      return { status: 200, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async getWishListMovies() {
    const userId = this.params.id;
    try {
      const response = await WishListStorage.getWishListMoviesInfo(userId);
      return { status: 200, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async addWishList() {
    const userId = this.params.id;
    const movieId = this.body.movieId;
    try {
      const check = await WishListStorage.getWishListInfo(userId, movieId);
      if (check[0].length) {
        return { status: 409, data: { error: "이미 찜이 생성됨" } };
      }
      const wishListId = (await WishListStorage.addWishListInfo(userId, movieId))[0].insertId;

      const response = await WishListStorage.processWishListInfo(wishListId);
      return { status: 201, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async removeWishList() {
    const wishListId = this.params.id;
    try {
      const check = (await WishListStorage.removeWishListInfo(wishListId))[0].affectedRows;
      return check ? { status: 204 } : { status: 400, data: { error: "지워진 값이 없습니다." } };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = WishListService;
