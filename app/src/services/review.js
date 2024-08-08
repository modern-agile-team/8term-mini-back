"use strict";

const ReviewStorage = require("../models/reviewStorage");

class Review {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getReview() {
    // 리뷰 조회
    const movieId = this.params.id;
    const response = await ReviewStorage.getReviewInfo(+movieId);

    console.log(response[0]);
    try {
      return { status: 200, data: response[0] };
    } catch (error) {
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

  async addReview() {
    // 리뷰 추가
    const { userId, movieId, comment } = this.body;
    const unprocessedResponse = await ReviewStorage.addReviewInfo(
      userId,
      movieId,
      comment
    );
    const response = await ReviewStorage.processResponse(
      unprocessedResponse[0].insertId
    );
    try {
      return { status: 200, data: response[0] };
    } catch (error) {
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

  async removeReview() {
    // 리뷰 삭제
    const body = this.body;
    const response = await ReviewStorage.removeReviewInfo(body.reviewId);

    try {
      return { status: 200, data: response[0] };
    } catch (error) {
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

module.exports = Review;
