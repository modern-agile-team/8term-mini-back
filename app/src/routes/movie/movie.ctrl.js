"use strict";

const MovieService = require("../../services/movieService");

const process = {
  getMovies: async (req, res) => {
    const movieService = new MovieService(req);
    const { status, data } = await movieService.getMovies();
    return res.status(status).json(data);
  },
  getMovie: async (req, res) => {
    const movieService = new MovieService(req);
    const { status, data } = await movieService.getMovie();
    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
