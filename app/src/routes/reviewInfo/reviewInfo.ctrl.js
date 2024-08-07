"use strict";

const Review = require("../../services/review");

const process = {
  reviewCheck: async (req, res) => {
    // 조회
    const review = new Review(req);
    const response = await review.reviewCheck();

    return res.json(response);
  },

  reviewAdd: async (req, res) => {
    //추가
    const review = new Review(req);
    const response = await review.reviewAdd();

    return res.json(response);
  },
};

module.exports = {
  process,
};
