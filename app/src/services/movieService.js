"use strict";

const MovieStorage = require("../models/movieStorage");
const stringUtils = require("../common/utils/stringUtils");

class MovieService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getMovies() {
    const { sort, title } = this.query;
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
          response = title
            ? await MovieStorage.getMovieSearchInfos(title)
            : await MovieStorage.getMovieInfos();
          break;
      }
      response = stringUtils.toCamelCase(response[0]);
      return { status: 200, data: response };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async getMovie() {
    const { id } = this.params;
    try {
      const response = await MovieStorage.getMovieInfo(id);
      return { status: 200, data: stringUtils.toCamelCase(response[0]) };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = MovieService;
