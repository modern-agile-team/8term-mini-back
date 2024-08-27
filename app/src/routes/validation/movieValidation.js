"use strict";

const { param, query, validationResult } = require("express-validator");

const checkGetMovie = [
  // 특정 영화의 정보
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ data: errors.array()[0].msg });
  },
];

const checkGetMovies = [
  // 영화 정렬 및 검색
  query("sort")
    .optional()
    .custom((value) => {
      if (value === "release_date" || value === "title" || value === "popularity") {
        return true;
      } else {
        throw new Error("sort 입력 오류");
      }
    }),

  query("title").optional().isString().withMessage("title 입력 오류").bail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ data: errors.array()[0].msg });
  },
];

module.exports = {
  checkGetMovie,
  checkGetMovies,
};
