"use strict";

const ReviewStorage = require("../models/reviewStorage");

class Review {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async reviewCheck() {
    const movieId = this.params.id;
    const response = await ReviewStorage.getReviewInfo(+movieId);

    console.log(response[0]);
    try {
      if (!response[0]) {
        return {
          message: "해당 영화의 리뷰가 존재하지 않습니다.",
        };
      }
      return { status: 200, data: response[0] };
    } catch (error) {
      if (error.message.includes("ECONNREFUSED")) {
        return {
          status: 503,
          data: { error: "데이터베이스 연결 오류" },
        };
      } else if (error.message.includes("ER_PARSE_ERROR")) {
        return {
          status: 500,
          data: { error: "SQL 구문 오류" },
        };
      } else if (error.message.includes("ETIMEOUT")) {
        return {
          status: 504,
          data: { error: "데이터베이스 연결 시간 초과" },
        };
      } else {
        return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async reivewAdd() {
    const body = this.body;
    const response = await ReviewStorage.reviewAdd(body);

    return response;
  }
}

module.exports = Review;