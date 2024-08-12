"use strict";

const db = require("../config/db");

class MovieStorage {
  static getMovieInfo(movieId) {
    const query = "SELECT * FROM movie WHERE movie_id = ?";
    return db.query(query, [movieId]);
  }

  static getMovieInfos() {
    const query = "SELECT * FROM movie";
    return db.query(query);
  }

  static getSortReleaseInfos() {
    const query = "SELECT * FROM movie order by release_date DESC";
    return db.query(query);
  }

  static getSortTitleInfos() {
    const query = "SELECT * FROM movie order by title";
    return db.query(query);
  }

  static getSortReviewCountInfos() {
    const query =
      "SELECT * FROM movie LEFT OUTER JOIN (SELECT movie_id, count(*) AS review_count FROM review GROUP BY movie_id) AS review_date ON movie.movie_id = review_date.movie_id ORDER BY review_count DESC";
    return db.query(query);
  }
}

module.exports = MovieStorage;
