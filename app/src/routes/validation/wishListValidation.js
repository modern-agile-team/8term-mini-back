"use strict";

const { body, param, validationResult } = require("express-validator");

const checkGetWishList = [
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
    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkGetWishListMovies = [
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
    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkAddWishList = [
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  body("movieId")
    .exists()
    .withMessage("movieId 전달 오류")
    .bail()
    .isInt()
    .withMessage("movieId 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkDeleteWishList = [
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
    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

module.exports = {
  checkGetWishList,
  checkGetWishListMovies,
  checkAddWishList,
  checkDeleteWishList,
};
