"use strict";
const { validationResult } = require("express-validator");
const UserService = require("../../services/userService");

//유효성검사를 위한 미들웨어
const validationSignup = UserService.validationRules();

const process = {
  signUp: async (req, res) => {
    const userService = new UserService(req);
    const response = await userService.signUp();
    return res.json(response);
  },
};

module.exports = { process };
