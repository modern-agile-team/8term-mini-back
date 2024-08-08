"use strict";

const db = require("../config/db");

class ReviewStorage {
  static checkReviewInfo(movieId) {
    // 리뷰 조회
    const query = "SELECT * FROM review WHERE movie_id = ?";
    return db.query(query, [movieId]);
  }

  static addReviewInfo(userId, movieId, comment) {
    // 리뷰 추가
    const query =
      "INSERT INTO review (user_id, movie_id, comment) VALUES (?, ?, ?)";
    return db.query(query, [userId, movieId, comment]);
  }

  static processResponse(reviewId) {
    // 추가된 데이터를 리턴
    const query = "SELECT * FROM review WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }

  static removeReviewInfo(reviewId) {
    // 리뷰 삭제
    const query = "DELETE FROM review WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }
}

module.exports = ReviewStorage;
