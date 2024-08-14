"use strict";

const db = require("../config/db");

class WishListStorage {
  static getUserWishListInfo(userId) {
    const query = "SELECT * FROM wish_list WHERE user_id = ?";
    return db.query(query, [userId]);
  }

  static getWishListInfo(userId, movieId) {
    const query = "SELECT * FROM wish_list WHERE user_id = ? and movie_id = ?";
    return db.query(query, [userId, movieId]);
  }

  static processWishListInfo(wishListId) {
    const query = "SELECT * FROM wish_list WHERE wish_list_id = ?";
    return db.query(query, [wishListId]);
  }

  static addWishListInfo(userId, movieId) {
    const query = "INSERT INTO wish_list (user_id, movie_id) VALUES (?, ?)";
    return db.query(query, [userId, movieId]);
  }

  static removeWishListInfo(wishListId) {
    const query = "DELETE FROM wish_list WHERE wish_list_id = ?";
    return db.query(query, [wishListId]);
  }
}

module.exports = WishListStorage;
