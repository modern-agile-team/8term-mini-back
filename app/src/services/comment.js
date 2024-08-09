"use strict";

const CommentStorage = require("../models/commentStorage");

class Comment {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getComment() {
    // 댓글 조회
    const commentId = this.params.id;
    const page = parseInt(this.query.page, 10) || 1;
    const size = parseInt(this.query.size, 10) || 5;

    const response = await CommentStorage.getCommentInfo(
      +commentId,
      page,
      size
    );

    try {
      return { status: 200, data: response[0] };
    } catch (error) {
      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "서버 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "서버 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "서버 오류" },
          };
        default:
          return { status: 500, data: { error: "서버 오류" } };
      }
    }
  }

  async addComment() {
    // 댓글 추가
    const { userId, commentId, text } = this.body;
    try {
      const ungetResponse = await CommentStorage.addCommentInfo(
        userId,
        commentId,
        text
      );
      if (ungetResponse.affectedRows) {
        const response = await CommentStorage.getResponse(
          ungetResponse[0].insertId
        );
        return { status: 200, data: response[0] };
      }
    } catch (error) {
      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async removeComment() {
    // 댓글 삭제
    const params = this.params;

    try {
      const response = await CommentStorage.removeCommentInfo(params.id);
      if (response.affectedRows) {
        return { status: 200 };
      }
    } catch (error) {
      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }

  async updateComment() {
    // 댓글 수정
    const params = this.params;
    const body = this.body;

    try {
      const ungetResponse = await CommentStorage.updateCommentInfo(
        params.id,
        body.text
      );
      if (ungetResponse[0].affectedRows) {
        const response = await ReviewStorage.getResponse(params.id);
        return { status: 200, data: response[0] };
      }
    } catch (error) {
      switch (error.code) {
        case "ECONNREFUSED":
          return { status: 503, data: { error: "데이터베이스 연결 오류" } };
        case "ER_PARSE_ERROR":
          return { status: 500, data: { error: "SQL 구문 오류" } };
        case "ETIMEOUT":
          return {
            status: 504,
            data: { error: "데이터베이스 연결 시간 초과" },
          };
        default:
          return { status: 500, data: { error: "일반적인 서버 오류" } };
      }
    }
  }
}

module.exports = Comment;
