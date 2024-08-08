"use strict";

const Comment = require("../../services/comment");

const process = {
  checkComment: async (req, res) => {
    // 조회
    const comment = new Comment(req);
    const response = await comment.checkComment();

    return res.json(response);
  },

  addComment: async (req, res) => {
    //추가
    const comment = new Comment(req);
    const response = await comment.addComment();

    return res.json(response);
  },

  removeComment: async (req, res) => {
    //추가
    const comment = new Comment(req);
    const response = await comment.removeComment();

    return res.json(response);
  },
};

module.exports = {
  process,
};
