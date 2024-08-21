"use strict";

const CommentService = require("../../services/commentService");

const process = {
  getComment: async (req, res) => {
    // 댓글 조회
    const commentService = new CommentService(req);
    const response = await commentService.getComment();

    return res.json(response);
  },

  addComment: async (req, res) => {
    // 댓글 추가
    const commentService = new CommentService(req);
    const response = await commentService.addComment();

    return res.json(response);
  },

  removeComment: async (req, res) => {
    // 댓글 삭제
    const commentService = new CommentService(req);
    const response = await commentService.removeComment();

    return res.json(response);
  },

  updateComment: async (req, res) => {
    // 댓글 수정
    const commentService = new CommentService(req);
    const response = await commentService.updateComment();

    return res.json(response);
  },
};

module.exports = {
  process,
};
