"use strict";

const MovieStorage = require("../models/movieStorage");

class Movie {
  constructor(body) {
    this.body = body;
  }

  check() {
    const response = MovieStorage.getMovieInfo();
    return response;
  }
}

module.exports = Movie;
