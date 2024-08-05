"use strict";

const db = require("../../config/db");
const Movie = require("../../models/Movie");

const process = {
  //데이터 베이스 연결 확인용 테스트 코드입니다.
  test: async (req, res) => {
    db.query("select * from movie", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(data);
    });
  },
  getMovies: (req, res) => {
    const movie = new Movie();
    const response = movie.getLists();
    return res.json(response);
  },
};

module.exports = {
  process,
};
