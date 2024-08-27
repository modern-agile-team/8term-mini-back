"use strict";

const { jwtVerify } = require("jose");

class Auth {
  constructor(req) {
    this.headers = req.headers["authorization"];
  }
  async accessToken() {
    try {
      // Authorization 헤더에서 토큰을 꺼냄
      const authHeader = this.headers;

      // 헤더가 존재하는지 확인
      if (!authHeader) {
        return { status: 401, data: { error: "Authorization header is missing" } };
      }

      // Bearer 스키마를 사용한 경우 "Bearer " 이후의 토큰 부분만 추출
      const token = authHeader.split(" ")[1];

      // 토큰이 없을 경우 에러 처리
      if (!token) {
        return { status: 401, data: { error: "Token is missing from Authorization header" } };
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      return { status: 200 };
    } catch (err) {
      console.error(err);
      return { status: 403, data: { error: "Invalid or expired token" } };
    }
  }
}

module.exports = Auth;
