"use strict";

const db = require("../config/db");

class ReviewStorage {
  static getReviewInfo(movieId, page, size) {
    // 리뷰 조회
    const offset = (page - 1) * size;
    const query = "SELECT * FROM review WHERE movie_id = ? LIMIT ? OFFSET ?";
    return db.query(query, [movieId, size, offset]);
  }

  static addReviewInfo(userId, movieId, text) {
    // 리뷰 추가
    const query = "INSERT INTO review (user_id, movie_id, text) VALUES (?, ?, ?)";
    return db.query(query, [userId, movieId, text]);
  }

  static removeReviewInfo(reviewId) {
    // 리뷰 삭제
    const query = "DELETE FROM review WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }

  static updateReviewInfo(reviewId, text) {
    // 리뷰 수정
    const query = "UPDATE review SET text = ? WHERE review_id = ?";
    return db.query(query, [text, reviewId]);
  }

  static getResponse(reviewId) {
    // 추가된 데이터를 리턴
    const query = "SELECT * FROM review WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }
}

module.exports = ReviewStorage;
