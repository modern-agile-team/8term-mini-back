"use strict";

const bcrypt = require("bcrypt");
const UserStorage = require("../models/userStorage");
const stringUtils = require("../common/utils/stringUtils");
const jose = require("jose");

class UserService {
  constructor(req) {
    this.body = req.body;
    this.query = req.query;
    this.params = req.params;
  }
  static async hashPassword(password) {
    const saltRounds = parseInt(process.env.SALT_ROUND);
    return await bcrypt.hash(password, saltRounds);
  }

  static userSignUpValidation(nickname, id, password, confirmPassword) {
    //nickname 검증
    const regex_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if (!regex_nickname.test(nickname)) {
      return { status: 400, data: { error: "닉네임 입력 오류" } };
    }
    //id 검증
    const regex_id = /^(?=.*[a-z0-9])[a-z0-9]{6,16}$/;
    if (!regex_id.test(id)) {
      return { status: 400, data: { error: "아이디 입력 오류" } };
    }
    //password 검증
    const regex_password = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!regex_password.test(password)) {
      return { status: 400, data: { error: "비밀번호 입력 오류" } };
    }
    //confirmPassword 검증
    if (password !== confirmPassword) {
      return { status: 400, data: { error: "비밀번호 값 불일치" } };
    }
    // 모든 검증을 통과 시 성공 상태 반환
    return { status: 200 };
  }

  static userUpdateValidation(nickname, password, confirmPassword) {
    //nickname 검증
    const regex_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if (!regex_nickname.test(nickname)) {
      return { status: 400, data: { error: "닉네임 입력 오류" } };
    }
    //password 검증
    const regex_password = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!regex_password.test(password)) {
      return { status: 400, data: { error: "비밀번호 입력 오류" } };
    }
    //confirmPassword 검증
    if (password !== confirmPassword) {
      return { status: 400, data: { error: "비밀번호 값 불일치" } };
    }
    // 모든 검증을 통과 시 성공 상태 반환
    return { status: 200 };
  }

  async signUp() {
    const userInfo = this.body;
    if (!userInfo) {
      return {
        status: 400,
        message: "입력하지 않았습니다.",
      };
    }

    //입력값 검증
    const UserSignUpValidation = UserService.userSignUpValidation(
      userInfo.nickname,
      userInfo.id,
      userInfo.password,
      userInfo.confirmPassword
    );
    if (UserSignUpValidation.status !== 200) {
      return UserSignUpValidation;
    }

    //db에 저장
    try {
      //비밀번호 해싱
      const hashedPassword = await UserService.hashPassword(userInfo.password);
      //사용자 정보 저장
      const userId = (
        await UserStorage.addUserInfo(userInfo.nickname, userInfo.id, hashedPassword, "1.png")
      )[0].insertId;

      return {
        status: 201,
      };
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async login() {
    const { id, password } = this.body;

    //사용자 입력 검증
    if (!id || !password) {
      return {
        status: 400,
        data: { error: "아이디와 비밀번호 모두 입력하세요" },
      };
    }
    try {
      const userInfo = await UserStorage.getUserInfo(id);
      if (!userInfo[0].length) {
        return { status: 400, data: { error: "존재하지 않는 사용자입니다." } };
      }

      //비밀번호 비교
      const checkPassword = await bcrypt.compare(password, userInfo[0][0].password);
      if (!checkPassword) {
        return {
          status: 400,
          data: { error: "비밀번호가 일치하지 않습니다." },
        };
      }

      //토큰 생성
      const jwt = await new jose.SignJWT({
        user_id: userInfo[0][0].user_id,
        id: userInfo[0][0].id,
        nickname: userInfo[0][0].nickname,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

      return {
        status: 200,
        data: { message: "로그인 성공", token: jwt },
      };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }

  async checkId() {
    const { id } = this.query;
    if (!id) {
      return {
        status: 400,
        data: { error: "아이디를 입력하세요" },
      };
    }
    try {
      const userExists = await UserStorage.getUserInfo(id);
      if (userExists[0].length) {
        return {
          status: 409,
          data: { message: "이미 사용중인 아이디입니다." },
        };
      }
      return {
        status: 200,
        data: { message: "사용 가능한 아이디입니다." },
      };
    } catch (error) {
      return {
        status: 500,
        data: { error: "서버 오류" },
      };
    }
  }
  async updateUser() {
    const userId = this.params.user_id;
    const { nickname, password, confirmPassword, profile } = this.body;

    if (!userId) {
      return {
        status: 400,
        data: { error: "user_id가 필요합니다." },
      };
    }
    const validation = UserService.userUpdateValidation(nickname, password, confirmPassword);
    if (validation.status !== 200) {
      return validation;
    }

    try {
      const hashedPassword = await UserService.hashPassword(password);
      await UserStorage.updateUserInfo(userId, nickname, hashedPassword, profile);
      return { status: 200 };
    } catch (error) {
      return { status: 500, data: { error: "서버오류" } };
    }
  }
}

module.exports = UserService;
