"use strict";

const UserStorage = require("../models/userStorage");

class UserService {
  constructor(req) {
    this.body = req.body;
  }

  async signUp() {
    const userInfo = this.body;
    const response = await UserStorage.postUserInfo({
      nickname: userInfo.nickname,
      id: userInfo.id,
      password: userInfo.password,
    });
    return response;
  }
}

module.exports = UserService;
