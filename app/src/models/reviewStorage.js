"use strict";

const db = require("../config/db");

class ReviewStorage {
  static getReviewInfo(movieId) {
    // 조회
    const query = "SELECT * FROM review WHERE movie_id = ?";
    return db.query(query, [movieId]);
  }

  static reviewAdd(reviewData) {
    // 추가
    const query =
      "INSERT INTO review (user_id, movie_id, comment, Field) VALUES (?, ?, ?, ?)";
    const user_id = reviewData.user_id;
    const movie_id = reviewData.movie_id;
    const comment = reviewData.comment;
    const field = reviewData.field;

    console.log("Executing query:", query);
    console.log("With values:", [user_id, movie_id, comment, field]);

    return db.query(query, [user_id, movie_id, comment, field]);
  }

  static deleteReview(review_id) {
    // 삭제
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM review WHERE review_id = ?";

      db.query(query, [review_id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = ReviewStorage;
