"use strict";

import db from "../config/db";

class UserStorage {
  static postUserInfo(userInfo) {
    const query = "INSERT INTO user(id, password, nickname) VALUES(?,?,?);";
    const id = userInfo.id;
    const password = userInfo.password;
    const nickname = userInfo.nickname;

    return db.query(query, [id, password, nickname]);
  }
}

export default UserStorage;
