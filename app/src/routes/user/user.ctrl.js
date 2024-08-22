"use strict";
const UserService = require("../../services/userService");

const process = {
  signUp: async (req, res) => {
    const userService = new UserService(req);
    const { status, data } = await userService.signUp();
    return res.status(status).json(data);
  },
  login: async (req, res) => {
    const userService = new UserService(req);
    const { status, data } = await userService.login();
    return res.status(status).json(data);
  },
};

module.exports = { process };
