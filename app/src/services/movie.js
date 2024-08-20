"use strict";

const MovieStorage = require("../models/movieStorage");

class Movie {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getMovies() {
    const { sort } = this.query;
    let response;
    try {
      switch (sort) {
        case "release_date":
          response = await MovieStorage.getSortReleaseInfos();
          break;
        case "title":
          response = await MovieStorage.getSortTitleInfos();
          break;
        case "popularity":
          response = await MovieStorage.getSortReviewCountInfos();
          break;
        default:
          response = await MovieStorage.getMovieInfos();
          break;
      }
      return { status: 200, data: response[0] };
    } catch (error) {
      // testfunc(error.code) 하면  =>   //obj가  => { status: 503, data: { error: "서버 오류" } 이런 오브젝트를 리턴하도록
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "서버 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "서버 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "서버 오류" },
          };
        default:
          return { status: 500, data: { error: "서버 오류" } };
      }
    }
  }

  async getMovie() {
    const { id } = this.params;
    try {
      const response = await MovieStorage.getMovieInfo(id);
      return { status: 200, data: response[0] };
    } catch (error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 코드:", error.code);

      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "서버 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "서버 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "서버 오류" },
          };
        default:
          return { status: 500, data: { error: "서버 오류" } };
      }
    }
  }
}

module.exports = Movie;
