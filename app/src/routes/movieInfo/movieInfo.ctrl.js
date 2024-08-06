"use strict";

const Movie = require("../../services/movie");

const process = {
  check: async (req, res) => {
    //조회
    const movie = new Movie(req.body);
    const response = await movie.check();

    return res.json(response);
  },
};

module.exports = {
  process,
};
