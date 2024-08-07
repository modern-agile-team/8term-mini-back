"use strict";

const ReviewStorage = require("../models/reviewStorage");

class Review {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async reviewCheck() {
    const movieId = this.params.id;
    const response = await ReviewStorage.getReviewInfo(+movieId);
    console.log(response[0]);
    try {
      if (!response[0]) {
        return {
          message: "해당 영화의 리뷰가 존재하지 않습니다.",
        };
      }
      return { status: 200, data: response[0] };
    } catch (error) {
      console.log("Error", error);
      return {
        status: 500,
        data: { error: "Failed to fetch review information" },
      };
    }
  }
}

module.exports = Review;
