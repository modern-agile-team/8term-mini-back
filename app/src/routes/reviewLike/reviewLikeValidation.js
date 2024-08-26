"use strict";

const { body, param, validationResult } = require("express-validator");

const checkGetReviewLike = [
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

const checkGetUserReviewLike = [
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

const checkAddReviewLike = [
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  body("reviewId")
    .exists()
    .withMessage("reviewId 전달 오류")
    .bail()
    .isInt()
    .withMessage("reviewId 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ data: errors.array()[0].msg });
  },
];

const checkDeleteReviewLike = [
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

module.exports = {
  checkGetReviewLike,
  checkGetUserReviewLike,
  checkAddReviewLike,
  checkDeleteReviewLike,
};
