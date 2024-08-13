"use strict";

const ReviewLike = require("../../services/reviewLike");

const process = {
  getReviewLike: async (req, res) => {
    // 특정 리뷰의 좋아요 조회
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.getReviewLike();
    return res.json(response);
  },
  getUserReviewLike: async (req, res) => {
    // 특정 유저의 좋아요 조회
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.getUserReviewLike();
    return res.json(response);
  },
  addReviewLike: async (req, res) => {
    // 좋아요 추가
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.addReviewLike();
    return res.json(response);
  },
  removeReviewLike: async (req, res) => {
    // 좋아요 삭제
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.removeReviewLike();
    return res.json(response);
  },
};

module.exports = {
  process,
};
