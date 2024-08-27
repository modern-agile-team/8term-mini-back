"use strict";

const Auth = require("./authService");

const check = {
  accessToken: async (req, res, next) => {
    const auth = new Auth(req);
    const { status, data } = await auth.accessToken();
    return status === 200 ? next() : res.status(status).json(data);
  },
};

module.exports = {
  check,
};
