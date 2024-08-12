"use strict";

const db = require("../config/db");

class CommentStorage {
  static getCommentInfo(commentId, page, size) {
    // 댓글 조회
    const offset = (page - 1) * size;
    const query = "SELECT * FROM comment WHERE comment_id = ? LIMIT ? OFFSET ?";
    return db.query(query, [commentId, size, offset]);
  }

  static addCommentInfo(userId, commentId, text) {
    // 댓글 추가
    const query =
      "INSERT INTO comment (user_id, comment_id, text) VALUES (?, ?, ?)";
    return db.query(query, [userId, commentId, text]);
  }

  static removeCommentInfo(commentId) {
    // 댓글 삭제
    const query = "DELETE FROM comment WHERE comment_id = ?";
    return db.query(query, [commentId]);
  }

  static updateCommentInfo(commentId, text) {
    // 댓글 수정
    const query = "UPDATE comment SET text = ? WHERE comment_id = ?";
    return db.query(query, [text, commentId]);
  }

  static getResponse(commentId) {
    // 추가된 데이터를 리턴
    const query = "SELECT * FROM comment WHERE comment_id = ?";
    return db.query(query, [commentId]);
  }
}

module.exports = CommentStorage;
