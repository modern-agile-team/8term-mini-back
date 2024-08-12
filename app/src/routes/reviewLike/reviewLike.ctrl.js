"use strict";

const ReviewLike = require("../../services/reviewLike");

const process = {
  getReviewLike: async (req, res) => {
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.getReviewLike();
    return res.json(response);
  },
  getUserReviewLike: async (req, res) => {
    const reviewLike = new ReviewLike(req);
    const response = await reviewLike.getUserReviewLike();
    return res.json(response);
  },
  //   addReviewLike: async (req, res) => {
  //     const reviewLike = new ReviewLike(req);
  //     const response = await reviewLike.addReviewLike();
  //     return res.json(response);
  //   },
  //   removeReviewLike: async (req, res) => {
  //     const reviewLike = new ReviewLike(req);
  //     const response = await reviewLike.removeReviewLike();
  //     return res.json(response);
  //   },
};

module.exports = {
  process,
};
