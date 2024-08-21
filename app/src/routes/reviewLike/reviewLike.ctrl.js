"use strict";

const ReviewLikeService = require("../../services/reviewLikeService");

const process = {
  getReviewLike: async (req, res) => {
    // 특정 리뷰의 좋아요 조회
    const reviewLikeService = new ReviewLike(req);
    const response = await reviewLikeService.getReviewLike();
    return res.json(response);
  },
  getUserReviewLike: async (req, res) => {
    // 특정 유저의 좋아요 조회
    const reviewLikeService = new ReviewLike(req);
    const response = await reviewLikeService.getUserReviewLike();
    return res.json(response);
  },
  addReviewLike: async (req, res) => {
    // 좋아요 추가
    const reviewLikeService = new ReviewLike(req);
    const response = await reviewLikeService.addReviewLike();
    return res.json(response);
  },
  removeReviewLike: async (req, res) => {
    // 좋아요 삭제
    const reviewLikeService = new ReviewLike(req);
    const response = await reviewLikeService.removeReviewLike();
    return res.json(response);
  },
};

module.exports = {
  process,
};
