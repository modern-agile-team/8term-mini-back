"use strict";

const db = require("../config/db");

class CommentStorage {
  static getCommentInfo(reviewId) {
    // 댓글 조회
    const query = "SELECT * FROM comment WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }

  static addCommentInfo(userId, reviewId, text) {
    // 댓글 추가
    const query =
      "INSERT INTO comment (user_id, review_id, text) VALUES (?, ?, ?)";
    return db.query(query, [userId, reviewId, text]);
  }

  static removeCommentInfo(commentId) {
    // 댓글 삭제
    const query = "DELETE FROM comment WHERE comment_id = ?";
    return db.query(query, [commentId]);
  }

  static processResponse(commentId) {
    // 추가된 데이터를 리턴
    const query = "SELECT * FROM comment WHERE comment_id = ?";
    return db.query(query, [commentId]);
  }
}

module.exports = CommentStorage;
