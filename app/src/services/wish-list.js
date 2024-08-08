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

      if (error.code === "ECONNREFUSED") {
        return { status: 503, data: { error: "데이터베이스 연결 오류" } };
      } else if (error.code === "ER_PARSE_ERROR") {
        return { status: 500, data: { error: "SQL 구문 오류" } };
      } else if (error.code === "ETIMEOUT") {
        return { status: 504, data: { error: "데이터베이스 연결 시간 초과" } };
      } else {
        return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async addWishList() {
    const userId = Number(this.params.id);
    const movieId = Number(this.body.movieId);
    try {
      const response = await WishListStorage.addWishListInfo(userId, movieId);
      console.log(response); //확인후 삭제
      return { status: 200, data: response };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      if (error.code === "ECONNREFUSED") {
        return { status: 503, data: { error: "데이터베이스 연결 오류" } };
      } else if (error.code === "ER_PARSE_ERROR") {
        return { status: 500, data: { error: "SQL 구문 오류" } };
      } else if (error.code === "ETIMEOUT") {
        return { status: 504, data: { error: "데이터베이스 연결 시간 초과" } };
      } else {
        return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }
}

module.exports = WishList;
