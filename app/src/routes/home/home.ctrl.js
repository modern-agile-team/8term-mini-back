"use strict";

const db = require("../../config/db");
const Movie = require("../../models/Movie");

const process = {
  getMovies: async (req, res) => {
    const movie = new Movie();
    const response = await movie.getLists();
    console.log(response);
    return res.json(response);
  },
};

module.exports = {
  process,
};
