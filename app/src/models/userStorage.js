"use strict";

const db = require("../config/db");

class UserStorage {
  static addUserInfo(nickname, id, password, profile) {
    const query = "INSERT INTO user(nickname, id, password, profile) VALUES(?,?,?,?);";
    return db.query(query, [nickname, id, password, profile]);
  }

  static getUserIdInfo(userId) {
    const query = "SELECT * FROM user WHERE user_id =?;";
    return db.query(query, [userId]);
  }

  static getUserInfo(id) {
    const query = "SELECT * FROM user WHERE id = ?;";
    return db.query(query, [id]);
  }

  static updateUserInfo(userId, nickname, password, profile) {
    const query = "UPDATE user SET nickname = ?, password = ?, profile = ? WHERE user_id = ?;";
    return db.query(query, [nickname, password, profile, userId]);
  }
}

module.exports = UserStorage;
