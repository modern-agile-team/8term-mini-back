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
    let query = "UPDATE user SET ";
    const values = [];

    if (nickname !== undefined) {
      query += "nickname = ?, ";
      values.push(nickname);
    }
    if (password !== undefined) {
      query += "password = ?, ";
      values.push(password);
    }
    if (profile !== undefined) {
      query += "profile = ?, ";
      values.push(profile);
    }

    query = query.slice(0, -2); // 마지막의 ', ' 제거
    query += " WHERE user_id = ?;";
    values.push(userId);

    console.log("Generated Query:", query);
    console.log("Values:", values);

    return db.query(query, values);
  }
}

module.exports = UserStorage;
