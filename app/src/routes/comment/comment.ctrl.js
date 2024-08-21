"use strict";

const CommentService = require("../../services/commentService");

const process = {
  getComment: async (req, res) => {
    // 댓글 조회
    const commentService = new CommentService(req);
    const { status, data } = await commentService.getComment();
    return res.status(status).json(data);
  },

  addComment: async (req, res) => {
    // 댓글 추가
    const commentService = new CommentService(req);
    const { status, data } = await commentService.addComment();
    return res.json(status, data);
  },

  removeComment: async (req, res) => {
    // 댓글 삭제
    const commentService = new CommentService(req);
    const { status, data } = await commentService.removeComment();
    return res.status(status).json(data);
  },

  updateComment: async (req, res) => {
    // 댓글 수정
    const commentService = new CommentService(req);
    const { status, data } = await commentService.updateComment();
    return res.status(status).json(data);
  },
};

module.exports = {
  process,
};
