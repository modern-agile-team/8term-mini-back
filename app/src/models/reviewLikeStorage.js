"use strict";

const db = require("../config/db");

class ReviewLikeStorage {
  static getReviewLikeInfo(reviewId) {
    const query = "SELECT * FROM review_like WHERE review_id =?";
    return db.query(query, [reviewId]);
  }

  static getUserReviewLikeInfo(userId) {
    const query = "SELECT review_id, review_like_id FROM review_like WHERE user_id = ?";
    return db.query(query, [userId]);
  }

  static addReviewLikeInfo(userId, reviewId) {
    const query = "INSERT INTO review_like (user_id, review_id) VALUES (?, ?)";
    return db.query(query, [userId, reviewId]);
  }

  static processReviewLikeInfo(reviewLikeId) {
    const query = "SELECT * FROM review_like WHERE review_like_id = ?";
    return db.query(query, [reviewLikeId]);
  }

  static removeReviewLikeInfo(reviewLikeId) {
    const query = "DELETE FROM review_like WHERE review_like_id = ?";
    return db.query(query, [reviewLikeId]);
  }

  static getCheckReviewLikeInfo(userId, reviewId) {
    const query = "SELECT * FROM review_like WHERE user_id = ? and review_id = ?";
    return db.query(query, [userId, reviewId]);
  }
}

module.exports = ReviewLikeStorage;
