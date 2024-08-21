"use strict";

const ReviewService = require("../../services/reviewService");

const process = {
  getReview: async (req, res) => {
    // 리뷰 조회
    const reviewService = new ReviewService(req);
    const { status, data } = await reviewService.getReview();
    return res.status(status).json(data);
  },

  addReview: async (req, res) => {
    // 리뷰 추가
    const reviewService = new ReviewService(req);
    const { status, data } = await reviewService.addReview();

    return res.status(status).json(data);
  },

  removeReview: async (req, res) => {
    // 리뷰 삭제
    const reviewService = new ReviewService(req);
    const { status, data } = await reviewService.removeReview();

    return res.status(status).json(data);
  },

  updateReview: async (req, res) => {
    // 리뷰 수정
    const reviewService = new ReviewService(req);
    const { status, data } = await reviewService.updateReview();

    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
