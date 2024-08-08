"use strict";

const db = require("../config/db");

class WishListStorage {
  static getUserWishListInfo(id) {
    const query = "SELECT * FROM wish_list WHERE user_id = ?";
    return db.query(query, [id]);
  }

  static getWishListInfoAll() {
    const query = "SELECT * FROM wish_list";
    return db.query(query);
  }

  static addWishListInfo(userId, movieId) {
    const query = "INSERT INTO wish_list (user_id, movie_id) VALUES (?, ?)";
    return db.query(query, [userId, movieId]);
  }

  static deleteWishList(id) {
    const query = "DELETE FROM wish_list WHERE wish_list_id = ?";
    return db.query(query, [id]);
  }
}

module.exports = WishListStorage;
