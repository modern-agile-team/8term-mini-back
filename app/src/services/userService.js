"use strict";

import UserStorage from "../models/userStorage";

class UserService {
  constructor(req) {
    this.body = req.body;
  }

  async signUp() {
    const userInfo = this.body;
    const response = await UserStorage.postUserInfo(
      userInfo.nickname,
      userInfo.id,
      userInfo.password
    );
  }
}

export default UserService;
