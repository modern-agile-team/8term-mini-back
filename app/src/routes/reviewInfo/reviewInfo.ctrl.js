"use strict";

const Review = require("../../services/review");

const process = {
  checkReview: async (req, res) => {
    // 조회
    const review = new Review(req);
    const response = await review.checkReview();

    return res.json(response);
  },

  addReview: async (req, res) => {
    //추가
    const review = new Review(req);
    const response = await review.addReview();

    return res.json(response);
  },

  removeReview: async (req, res) => {
    //추가
    const review = new Review(req);
    const response = await review.removeReview();

    return res.json(response);
  },
};

module.exports = {
  process,
};
