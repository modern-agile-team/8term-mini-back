"use strict";

const { body, param, query, validationResult } = require("express-validator");

const checkAddUser = [
  body("nickname")
    .exists()
    .withMessage("nickname 전달 오류")
    .bail()
    .matches(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/)
    .withMessage("nickname 입력 오류")
    .bail(),

  body("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .matches(/^(?=.*[a-z0-9])[a-z0-9]{6,16}$/)
    .withMessage("id 입력 오류")
    .bail(),

  body("password")
    .exists()
    .withMessage("password 전달 오류")
    .bail()
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/)
    .withMessage("password 입력 오류")
    .bail(),

  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword 전달 오류")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirmPassword 입력 오류");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkUser = [
  body("id").exists().withMessage("id 전달 오류").bail(),

  body("password").exists().withMessage("password 전달 오류").bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkUserId = [
  query("id").exists().withMessage("id 전달 오류").bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

const checkKeyUserId = [
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

const checkUpdateUser = [
  param("id")
    .exists()
    .withMessage("id 전달 오류")
    .bail()
    .isInt()
    .withMessage("id 입력 오류")
    .bail(),

  body("nickname")
    .optional()
    .matches(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/)
    .withMessage("nickname 입력 오류")
    .bail(),

  body("password")
    .optional()
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/)
    .withMessage("password 입력 오류")
    .bail(),

  body("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error("confirmPassword 입력 오류");
      }
      return true;
    }),

  body("profile")
    .optional()
    .matches(/^profileimg[1-8]\.png$/)
    .withMessage("profile 입력 오류")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ error: errors.array()[0].msg });
  },
];

module.exports = { checkAddUser, checkUser, checkUserId, checkUpdateUser, checkKeyUserId };
