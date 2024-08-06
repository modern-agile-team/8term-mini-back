"use strict";

const Movie = require("../../services/Movie");

const process = {
  check: async (req, res) => {
    //조회
    const movie = new Movie();
    const response = await movie.check();

    return res.json(response);
  },
};

module.exports = {
  process,
};
