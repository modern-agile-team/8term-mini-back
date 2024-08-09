"use strict";

const MovieStorage = require("../models/movieStorage");

class Movie {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async getMovie() {
    const movieId = Number(this.params.id);
    let response;
    try {
      if (movieId) {
        //단일조회
        response = await MovieStorage.getMovieInfo(movieId);
      } else {
        //전체조회
        response = await MovieStorage.getMovieInfos();
      }
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }
}

module.exports = Movie;
