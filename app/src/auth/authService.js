"use strict";

const { jwtVerify } = require("jose");

class Auth {
  constructor(req) {
    this.headers = req.headers;
  }
  async accessToken() {
    try {
      const authHeader = this.headers.authorization;
      console.log(req);
      if (!authHeader) {
        return { status: 401, data: { error: "Authorization header가 없습니다." } };
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return { status: 401, data: { error: "Authorization header에 토큰이 없습니다." } };
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      return { status: 200 };
    } catch (err) {
      console.error(err);
      return { status: 403, data: { error: "유효하지 않거나 만료된 토큰입니다." } };
    }
  }
}

module.exports = Auth;
