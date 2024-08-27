"use strict";

const { body, param, validationResult } = require("express-validator");

const checkGetReview = [
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

const checkAddReview = [
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  body("userId")
    .exists()
    .withMessage("userId 전달 오류")
    .bail()
    .isInt()
    .withMessage("userId 입력 오류")
    .bail(),

  body("text")
    .exists()
    .withMessage("text 전달 오류")
    .bail()
    .matches(/^(?=.*[^\s])[a-z0-9가-힣!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,255}$/)
    .withMessage("text 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ data: errors.array()[0].msg });
  },
];

const checkUpdateReview = [
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  body("text")
    .exists()
    .withMessage("text 전달 오류")
    .bail()
    .matches(/^(?=.*[^\s])[a-z0-9가-힣!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,255}$/)
    .withMessage("text 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ data: errors.array()[0].msg });
  },
];

const checkDeleteReview = [
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

module.exports = { checkGetReview, checkAddReview, checkUpdateReview, checkDeleteReview };
