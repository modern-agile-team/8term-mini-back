"use strict";

const db = require("../config/db");

class UserStorage {
  static addUserInfo(nickname, id, password) {
    const query = "INSERT INTO user(nickname, id, password) VALUES(?,?,?);";
    return db.query(query, [nickname, id, password]);
  }

  static getUserInfo(id) {
    const query = "SELECT * FROM WHERE id = ?;";
    return db.query(
      query,
      [id].then((rows) => rows[0])
    );
  }
}

module.exports = UserStorage;
