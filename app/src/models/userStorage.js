"use strict";

const db = require("../config/db");

class UserStorage {
  static addUserInfo(nickname, id, password) {
    const query = "INSERT INTO user(nickname, id, password) VALUES(?,?,?);";
    return db.query(query, [nickname, id, password]);
  }

  static getUserIdInfo(userId) {
    const query = "SELECT * FROM user WHERE user_id =?;";
    return db.query(query, [userId]);
  }

  static getUserInfo(id) {
    const query = "SELECT * FROM user WHERE id = ?;";
    return db.query(query, [id]);
  }
}

module.exports = UserStorage;
