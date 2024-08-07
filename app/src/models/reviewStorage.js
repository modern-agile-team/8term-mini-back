"use strict";

const db = require("../config/db");

class ReviewStorage {
  static getReviewInfo(movie_id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM review WHERE movie_id = ?";

      db.query(query, [movie_id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static addReview(review_data) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO review ( user_id, movie_id, comment, Field) VALUES (?, ?, ?, ?)";
      const user_id = review_data.user_id;
      const movie_id = review_data.movie_id;
      const comment = review_data.comment;
      const field = review_data.field;

      db.query(query, [user_id, movie_id, comment, field], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static deleteReview(review_id) {
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
