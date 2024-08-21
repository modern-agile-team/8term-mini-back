"use strict";

const Review = require("../../services/review");

const process = {
  getReview: async (req, res) => {
    // 리뷰 조회
    const review = new Review(req);
    const response = await review.getReview();

    return res.json(response);
  },

  addReview: async (req, res) => {
    // 리뷰 추가
    const review = new Review(req);
    const response = await review.addReview();

    return res.json(response);
  },

  removeReview: async (req, res) => {
    // 리뷰 삭제
    const review = new Review(req);
    const response = await review.removeReview();

    return res.json(response);
  },

  updateReview: async (req, res) => {
    // 리뷰 수정
    const review = new Review(req);
    const response = await review.updateReview();

    return res.json(response);
  },
};

module.exports = {
  process,
};
