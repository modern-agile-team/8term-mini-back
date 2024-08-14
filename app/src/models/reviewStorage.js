"use strict";

const db = require("../config/db");

class ReviewStorage {
  static getReviewInfo(movieId, page, size) {
    // 리뷰 조회
    const offset = (page - 1) * size;
    const query = `
        SELECT
            r.review_id,
            r.text,
            r.date,
            COALESCE(COUNT(DISTINCT rl.review_like_id), 0) AS like_count,
            COALESCE(COUNT(DISTINCT c.comment_id), 0) AS comment_count,
            u.id AS id,
            u.nickname
        FROM review r
        LEFT JOIN review_like rl ON r.review_id = rl.review_id
        LEFT JOIN comment c ON r.review_id = c.review_id
        LEFT JOIN user u ON r.user_id = u.user_id
        WHERE r.movie_id = ?
        GROUP BY
            r.review_id, r.text, r.date, u.id, u.nickname
        ORDER BY
            r.date DESC
        LIMIT ? OFFSET ?;
    `;
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

  static getReviewCount(movieId) {
    // 특정 영화의 리뷰 개수 리턴
    const query = "SELECT COUNT(*) AS total_count FROM review WHERE movie_id = ?";
    return db.query(query, [movieId]);
  }
}

module.exports = ReviewStorage;
