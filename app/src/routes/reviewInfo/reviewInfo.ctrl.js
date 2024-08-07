"use strict";

const Review = require("../../services/review");

const process = {
  reviewCheck: async (req, res) => {
    // 조회
    console.log(req.params, "route");
    const review = new Review(req);
    const response = await review.reviewCheck();

    return res.json(response);
  },
};

module.exports = {
  process,
};
