"use strict";

const ReviewStorage = require("../models/reviewStorage");

class ReviewService {
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
      const reviewCountResponse = await ReviewStorage.getReviewCount(movieId);
      const totalCount = reviewCountResponse[0][0].total_count;
      const response = await ReviewStorage.getReviewInfo(+movieId, page, size);
      return { status: 200, totalCount, data: response[0] };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async addReview() {
    // 리뷰 추가
    const { movieId } = this.params;
    const { userId, text } = this.body;

    try {
      const ungetResponse = await ReviewStorage.addReviewInfo(userId, movieId, text);
      if (ungetResponse[0].affectedRows) {
        const response = await ReviewStorage.getResponse(ungetResponse[0].insertId);
        return { status: 201, data: response[0] };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async removeReview() {
    // 리뷰 삭제
    const { id } = this.params;

    try {
      const response = await ReviewStorage.removeReviewInfo(id);
      if (response[0].affectedRows) {
        return { status: 204 };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async updateReview() {
    // 리뷰 수정
    const { id } = this.params;
    const { text } = this.body;

    try {
      const ungetResponse = await ReviewStorage.updateReviewInfo(id, text);
      if (ungetResponse[0].affectedRows) {
        const response = await ReviewStorage.getResponse(id);
        return { status: 200, data: response[0] };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = ReviewService;
