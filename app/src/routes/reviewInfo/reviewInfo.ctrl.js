"use strict";

const Review = require("../../services/review");

const process = {
  reviewCheck: async (req, res) => {
    //조회
    console.log(req.params, "route");
    const review = new Review();
    const response = await review.reviewCheck(req.params);

    return res.json(response);
  },
};

module.exports = {
  process,
};
