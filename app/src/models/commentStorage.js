"use strict";

const db = require("../config/db");

class CommentStorage {
  static getCommentInfo(reviewId, page, size) {
    // 댓글 조회
    const offset = (page - 1) * size;
    const query = `
    SELECT c.comment_id, c.review_id, c.text, c.date, u.id ,u.nickname
    FROM comment c
    JOIN user u ON c.user_id = u.user_id
    WHERE c.review_id = ?
    LIMIT ? OFFSET ?;
  `;
    return db.query(query, [reviewId, size, offset]);
  }

  static addCommentInfo(userId, reviewId, text) {
    // 댓글 추가
    const query = "INSERT INTO comment (user_id, review_id, text) VALUES (?, ?, ?)";
    return db.query(query, [userId, reviewId, text]);
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

  static getCommentCount(reviewId) {
    // 특정 리뷰의 댓글 개수 리턴
    const query = "SELECT COUNT(*) AS total_count FROM comment WHERE review_id = ?";
    return db.query(query, [reviewId]);
  }
}

module.exports = CommentStorage;
