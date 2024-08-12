"use strict";

const ReviewLikeStorage = require("../models/reviewLikeStorage");

class ReviewLike {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getReviewLike() {
    // 특정 리뷰의 좋아요 조회
    const reviewId = Number(this.params.id);

    try {
      const response = await ReviewLikeStorage.getReviewLikeInfo(reviewId);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

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

  async getUserReviewLike() {
    // 특정 유저의 좋아요 조회
    const userId = Number(this.params.id);

    try {
      const response = await ReviewLikeStorage.getUserReviewLikeInfo(userId);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

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
  async addReviewLike() {
    // 좋아요 추가
    const userId = Number(this.params.id);
    const reviewId = Number(this.body.reviewId);
    try {
      const check = await ReviewLikeStorage.getReviewLikeInfo(userId, reviewId);
      if (!check[0]) {
        //400 -> 409
        return { status: 400, data: { error: "이미 좋아요 누름" } };
      }
      const reviewLikeId = (await ReviewLikeStorage.addReviewLikeInfo(userId, reviewId))[0]
        .insertId;

      const response = await ReviewLikeStorage.processReviewLikeInfo(reviewLikeId);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

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

  async removeReviewLike() {
    // 좋아요 삭제
    const reviewLikeId = Number(this.params.id);
    try {
      const check = (await ReviewLikeStorage.removeReviewLikeInfo(reviewLikeId))[0].affectedRows;
      return check
        ? // 200 -> 204
          { status: 200 }
        : { status: 400, data: { error: "지워진 값이 없습니다." } };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

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

module.exports = ReviewLike;
