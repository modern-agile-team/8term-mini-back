"use strict";

const ReviewLikeStorage = require("../models/reviewLikeStorage");
const stringUtils = require("../common/utils/stringUtils");

class ReviewLikeService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getReviewLike() {
    // 특정 리뷰의 좋아요 조회
    const reviewId = this.params.id;

    try {
      const response = await ReviewLikeStorage.getReviewLikeInfo(reviewId);
      return { status: 200, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async getUserReviewLike() {
    // 특정 유저의 좋아요 조회
    const userId = this.params.id;

    try {
      const response = await ReviewLikeStorage.getUserReviewLikeInfo(userId);
      return { status: 200, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async addReviewLike() {
    // 좋아요 추가
    const userId = this.params.id;
    const reviewId = this.body.reviewId;

    try {
      const check = await ReviewLikeStorage.getCheckReviewLikeInfo(userId, reviewId);
      if (check[0].length) {
        return { status: 409, data: { error: "이미 좋아요 누름" } };
      }
      const reviewLikeId = (await ReviewLikeStorage.addReviewLikeInfo(userId, reviewId))[0]
        .insertId;

      const response = await ReviewLikeStorage.processReviewLikeInfo(reviewLikeId);
      return { status: 201, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async removeReviewLike() {
    // 좋아요 삭제
    const reviewLikeId = this.params.id;

    try {
      const check = (await ReviewLikeStorage.removeReviewLikeInfo(reviewLikeId))[0].affectedRows;
      return check ? { status: 204 } : { status: 400, data: { error: "지워진 값이 없습니다." } };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = ReviewLikeService;
