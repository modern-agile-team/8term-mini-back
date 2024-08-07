"use strict";

const db = require("../config/db");

class MovieStorage {
  static getMovieInfo(id) {
    const query = "SELECT * FROM movie WHERE movie_id = ?";
    return db.query(query, [id]);
  }

  static getMovieInfos() {
    const query = "SELECT * FROM movie";
    return db.query(query);
  }
}

module.exports = MovieStorage;
