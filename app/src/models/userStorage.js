"use strict";

const db = require("../config/db");

class UserStorage {
  static postUserInfo({ nickname, id, password }) {
    const query = "INSERT INTO user(nickname, id, password) VALUES(?,?,?);";
    return db.query(query, [nickname, id, password]);
  }
}

module.exports = UserStorage;
