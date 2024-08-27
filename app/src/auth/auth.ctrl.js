"use strict";

const Auth = require("./authService");

const process = {
  accessToken: async (req, res) => {
    const auth = new Auth(req);
    const { status, data } = await auth.accessToken();
    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
