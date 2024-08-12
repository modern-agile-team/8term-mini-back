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

  static getSortMovieInfos(sort) {
    const query = "SELECT * FROM movie order by ?";
    return db.query(query, [sort]);
  }
}

module.exports = MovieStorage;
