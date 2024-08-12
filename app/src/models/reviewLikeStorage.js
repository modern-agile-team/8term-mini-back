"use strict";

const db = require("../config/db");

class ReviewLikeStorage {
  static getReviewLikeInfo(reviewId) {
    const query = "SELECT * FROM review_like WHERE review_id =?";
    return db.query(query, [reviewId]);
  }

  static getUserReviewLikeInfo(userId) {
    const query = "SELECT * FROM review_like WHERE user_id = ?";
    return db.query(query, [userId]);
  }

  //   static processReviewLikeInfo(reviewLikeId) {
  //     const query = "SELECT * FROM review_like WHERE review_id = ?";
  //     return db.query(query, [reviewLikeId]);
  //   }

  //   static addReviewLikeInfo(userId, movieId) {
  //     const query = "INSERT INTO review_like (user_id, movie_id) VALUES (?, ?)";
  //     return db.query(query, [userId, movieId]);
  //   }

  //   static removeReviewLikeInfo(id) {
  //     const query = "DELETE FROM review_like WHERE review_like_id = ?";
  //     return db.query(query, [id]);
  //   }
}

module.exports = ReviewLikeStorage;
