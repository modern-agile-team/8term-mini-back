"use strict";

const Movie = require("../../services/movie");

const process = {
  getMovies: async (req, res) => {
    const movie = new Movie(req);
    const response = await movie.getMovies();
    return res.json(response);
  },
  getMovie: async (req, res) => {
    const movie = new Movie(req);
    const response = await movie.getMovie();
    return res.json(response);
  },
};

module.exports = {
  process,
};
