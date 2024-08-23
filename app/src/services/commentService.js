"use strict";

const CommentStorage = require("../models/commentStorage");
const stringUtils = require("../common/utils/stringUtils");

class CommentService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }

  async getComment() {
    // 댓글 조회
    const { id } = this.params;
    const page = parseInt(this.query.page, 10) || 1;
    const size = parseInt(this.query.size, 10) || 5;

    try {
      const commentCountResponse = await CommentStorage.getCommentCount(id);
      const totalCount = commentCountResponse[0][0].total_count;
      const response = await CommentStorage.getCommentInfo(id, page, size);
      return {
        status: 200,
        data: { totalCount: totalCount, comments: stringUtils.toCamelCase(response[0]) },
      };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async addComment() {
    // 댓글 추가
    const { id } = this.params;
    const { userId, text } = this.body;

    try {
      const ungetResponse = await CommentStorage.addCommentInfo(userId, id, text);
      if (ungetResponse[0].affectedRows) {
        const response = await CommentStorage.getResponse(ungetResponse[0].insertId);
        return { status: 201, data: stringUtils.toCamelCase(response[0]) };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async removeComment() {
    // 댓글 삭제
    const { id } = this.params;

    try {
      const response = await CommentStorage.removeCommentInfo(id);
      if (response[0].affectedRows) {
        return { status: 204 };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
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
        return { status: 200, data: stringUtils.toCamelCase(response[0]) };
      }
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = CommentService;
