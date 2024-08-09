"use strict";

const WishListStorage = require("../models/wishListStorage");

class WishList {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getUserWishList() {
    const userId = Number(this.params.id);
    try {
      const response = await WishListStorage.getUserWishListInfo(userId);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async addWishList() {
    const userId = Number(this.params.id);
    const movieId = Number(this.body.movieId);
    try {
      const check = await WishListStorage.getUserWishListInfo(userId);
      if (check) {
        return { status: 500, data: { error: "이미 찜이 생성됨" } };
      }
      const wishListId = (
        await WishListStorage.addWishListInfo(userId, movieId)
      )[0].insertId;

      const response = await WishListStorage.processWishListInfo(wishListId);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async removeWishList() {
    const wishListId = Number(this.params.id);
    try {
      const check = (await WishListStorage.removeWishListInfo(wishListId))[0]
        .affectedRows;
      return check
        ? { status: 200 }
        : { status: 500, data: { error: "지워진 값이 없습니다." } };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }
}

module.exports = WishList;
