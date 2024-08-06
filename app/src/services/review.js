"use strict";

const ReviewStorage = require("../models/reviewStorage");

class Review {
  constructor(body) {
    this.body = body;
  }

  reviewCheck(movieInfo) {
    const response = ReviewStorage.getReviewInfo(+movieInfo.id);
    return response;
  }
}

module.exports = Review;
