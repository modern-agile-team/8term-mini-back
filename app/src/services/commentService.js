"use strict";

const CommentStorage = require("../models/commentStorage");

class CommentService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getComment() {
    // 댓글 조회
    const reviewId = this.params.id;
    const page = parseInt(this.query.page, 10) || 1;
    const size = parseInt(this.query.size, 10) || 5;

    const response = await CommentStorage.getCommentInfo(+reviewId, page, size);

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
    const { userId, reviewId, text } = this.body;
    try {
      const ungetResponse = await CommentStorage.addCommentInfo(userId, reviewId, text);
      //0번지로 바꿔놓을것
      if (ungetResponse[0].affectedRows) {
        const response = await CommentStorage.getResponse(ungetResponse[0].insertId);
        return { status: 200, data: response[0] };
      }
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

  async removeComment() {
    // 댓글 삭제
    const { id } = this.params;

    try {
      const response = await CommentStorage.removeCommentInfo(id);
      if (response[0].affectedRows) {
        return { status: 200 };
      }
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

  async updateComment() {
    // 댓글 수정
    const { id } = this.params;
    const { text } = this.body;

    try {
      const ungetResponse = await CommentStorage.updateCommentInfo(id, text);
      if (ungetResponse[0].affectedRows) {
        const response = await CommentStorage.getResponse(id);
        return { status: 200, data: response[0] };
      }
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
}

module.exports = CommentService;
