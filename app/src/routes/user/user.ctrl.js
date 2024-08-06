"use strict";

const userService = require("../../services/userService");

const output = {
  login: (req, res) => {
    res.render("user/login");
  },

  register: (req, res) => {
    res.render("user/register");
  },
};

const process = {
  login: async (req, res) => {
    const userservice = new userService(req.body);
    const response = await userservice.login();

    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };
    return res.status(url.status).json(response);
  },

  register: async (req, res) => {
    const userservice = new userService(req.body);
    const response = await userservice.register();

    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 401 : 201,
    };
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};
