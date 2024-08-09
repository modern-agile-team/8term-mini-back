"use strict";

const ReviewStorage = require("../models/reviewStorage");

class Review {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getReview() {
    // 리뷰 조회
    const movieId = this.params.id;
    const page = parseInt(this.query.page, 10) || 1;
    const size = parseInt(this.query.size, 10) || 5;

    try {
      const response = await ReviewStorage.getReviewInfo(+movieId, page, size);
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

    try {
      const ungetResponse = await ReviewStorage.addReviewInfo(
        userId,
        movieId,
        comment
      );
      if (ungetResponse[0].affectedRows) {
        const response = await ReviewStorage.getResponse(
          ungetResponse[0].insertId
        );
        return { status: 200, data: response[0] };
      }
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
    const params = this.params;

    try {
      const response = await ReviewStorage.removeReviewInfo(params.id);
      if (response[0].affectedRows) {
        return { status: 200 };
      }
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

  async updateReview() {
    // 리뷰 수정
    const params = this.params;
    const body = this.body;

    try {
      const ungetResponse = await ReviewStorage.updateReviewInfo(
        params.id,
        body.comment
      );

      if (ungetResponse[0].affectedRows) {
        const response = await ReviewStorage.getResponse(params.id);
        return { status: 200, data: response[0] };
      }
      return { status: 200, data: response[0] };
    } catch (error) {
      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "서버 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "서버 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "서버 오류" },
          };
        default:
          return { status: 500, data: { error: "서버 오류" } };
      }
    }
  }
}

module.exports = Review;
