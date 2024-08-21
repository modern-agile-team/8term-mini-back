"use strict";

const ReviewService = require("../../services/reviewService");

const process = {
  getReview: async (req, res) => {
    // 리뷰 조회
    const reviewService = new ReviewService(req);
    const response = await reviewService.getReview();

    return res.json(response);
  },

  addReview: async (req, res) => {
    // 리뷰 추가
    const reviewService = new ReviewService(req);
    const response = await reviewService.addReview();

    return res.json(response);
  },

  removeReview: async (req, res) => {
    // 리뷰 삭제
    const reviewService = new ReviewService(req);
    const response = await reviewService.removeReview();

    return res.json(response);
  },

  updateReview: async (req, res) => {
    // 리뷰 수정
    const reviewService = new ReviewService(req);
    const response = await reviewService.updateReview();

    return res.json(response);
  },
};

module.exports = {
  process,
};
