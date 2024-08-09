"use strict";

const UserStorage = require("../models/userStorage");

class UserService {
  constructor(req) {
    this.body = req.body;
  }

  async signUp() {
    const userInfo = this.body;

    //비밀번호확인
    if (userInfo.password !== userInfo.confirmPassword) {
      return { success: false, msg: "비밀번호가 다릅니다." };
    }
    //
    const response = await UserStorage.postUserInfo({
      nickname: userInfo.nickname,
      id: userInfo.id,
      password: userInfo.password,
    });
    return response;
  }
}

module.exports = UserService;
