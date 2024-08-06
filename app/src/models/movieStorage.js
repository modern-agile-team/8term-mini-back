"use strict";

const db = require("../config/db");

class MovieStorage {
  getMovieInfo() {
    return new Promise((resolve, reject) => {
      const query = " SELECT * FROM movie";
      db.query(query, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = MovieStorage;
