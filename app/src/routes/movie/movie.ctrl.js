"use strict";

const MovieService = require("../../services/movieService");

const process = {
  getMovies: async (req, res) => {
    const movieService = new MovieService(req);
    const response = await movieService.getMovies();
    return res.status(response.status).json(response);
  },
  getMovie: async (req, res) => {
    const movieService = new MovieService(req);
    const response = await movieService.getMovie();
    return res.status(response.status).json(response);
  },
};

module.exports = {
  process,
};
