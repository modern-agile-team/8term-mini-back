"use strict";

const Comment = require("../../services/comment");

const process = {
  getComment: async (req, res) => {
    // 댓글 조회
    const comment = new Comment(req);
    const response = await comment.getComment();

    return res.json(response);
  },

  addComment: async (req, res) => {
    // 댓글 추가
    const comment = new Comment(req);
    const response = await comment.addComment();

    return res.json(response);
  },

  removeComment: async (req, res) => {
    // 댓글 삭제
    const comment = new Comment(req);
    const response = await comment.removeComment();

    return res.json(response);
  },

  updateComment: async (req, res) => {
    // 댓글 수정
    const review = new Comment(req);
    const response = await review.updateComment();

    return res.json(response);
  },
};

module.exports = {
  process,
};
