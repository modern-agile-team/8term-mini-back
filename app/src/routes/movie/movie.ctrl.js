"use strict";

const Movie = require("../../services/Movie");

const process = {
  getMovies: async (req, res) => {
    const movie = new Movie();
    const response = await movie.getLists();
    return res.json(response);
  },
};

module.exports = {
  process,
};
