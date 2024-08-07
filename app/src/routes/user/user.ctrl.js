"use strict";

import UserService from "../../services/userService";

const process = {
  signUp: async (req, res) => {
    const userService = new UserService(req);
    const response = await userService.signUp();

    return res.json(response);
  },
};

export default signUp;
