"use strict";

const Movie = require("../../services/Movie");

const process = {
  getMovie: async (req, res) => {
    const movie = new Movie(req);
    const response = await movie.getMovie();
    return res.json(response);
  },
};

module.exports = {
  process,
};
