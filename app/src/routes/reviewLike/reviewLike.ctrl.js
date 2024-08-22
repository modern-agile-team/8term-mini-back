"use strict";

const ReviewLikeService = require("../../services/reviewLikeService");

const process = {
  getReviewLike: async (req, res) => {
    // 특정 리뷰의 좋아요 조회
    const reviewLikeService = new ReviewLikeService(req);
    const { status, data } = await reviewLikeService.getReviewLike();
    return res.status(status).json(data);
  },
  getUserReviewLike: async (req, res) => {
    // 특정 유저의 좋아요 조회
    const reviewLikeService = new ReviewLikeService(req);
    const { status, data } = await reviewLikeService.getUserReviewLike();
    return res.status(status).json(data);
  },
  addReviewLike: async (req, res) => {
    // 좋아요 추가
    const reviewLikeService = new ReviewLikeService(req);
    const { status, data } = await reviewLikeService.addReviewLike();
    return res.status(status).json(data);
  },
  removeReviewLike: async (req, res) => {
    // 좋아요 삭제
    const reviewLikeService = new ReviewLikeService(req);
    const { status, data } = await reviewLikeService.removeReviewLike();
    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
