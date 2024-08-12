"use strict";

const db = require("../config/db");

class ReviewLikeStorage {
  static getReviewLikeInfo(reviewId) {
    const query = "SELECT * FROM review_like WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }

  //   static getReviewLikeInfo(userId, movieId) {
  //     const query = "SELECT * FROM wish_list WHERE user_id = ? and movie_id = ?";
  //     return db.query(query, [userId, movieId]);
  //   }

  //   static processReviewLikeInfo(reviewLikeId) {
  //     const query = "SELECT * FROM wish_list WHERE wish_list_id = ?";
  //     return db.query(query, [reviewLikeId]);
  //   }

  //   static addReviewLikeInfo(userId, movieId) {
  //     const query = "INSERT INTO wish_list (user_id, movie_id) VALUES (?, ?)";
  //     return db.query(query, [userId, movieId]);
  //   }

  //   static removeReviewLikeInfo(id) {
  //     const query = "DELETE FROM wish_list WHERE wish_list_id = ?";
  //     return db.query(query, [id]);
  //   }
}

module.exports = ReviewLikeStorage;
