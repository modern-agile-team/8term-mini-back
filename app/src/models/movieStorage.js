"use strict";

const db = require("../config/db");

class MovieStorage {
  static getMovieInfo(id) {
    return new Promise((resolve, reject) => {
      let query;
      let params = [];

      if (id) {
        query = "SELECT * FROM movie WHERE id = ?";
        params = [id];
      } else {
        query = "SELECT * FROM movie";
      }

      db.query(query, params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = MovieStorage;
