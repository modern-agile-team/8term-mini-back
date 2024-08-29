"use strict";

const bcrypt = require("bcrypt");
const UserStorage = require("../models/userStorage");
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

  async signUp() {
    const userInfo = this.body;
    if (!userInfo) {
      return {
        status: 400,
        message: "입력하지 않았습니다.",
      };
    }

    try {
      const checkIdResult = await this.checkId(userInfo.id);
      console.log(checkIdResult);
      if (checkIdResult.status != 200) {
        return checkIdResult;
      }
      const hashedPassword = await UserService.hashPassword(userInfo.password);

      await UserStorage.addUserInfo(
        userInfo.nickname,
        userInfo.id,
        hashedPassword,
        "profileimg1.png"
      );

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
        profile: userInfo[0][0].profile,
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

  async checkId(signupId) {
    let id;
    if (signupId) {
      id = signupId;
    } else {
      id = this.query.id;
    }
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
    const userId = this.params.id;
    const { nickname, password, confirmPassword, profile } = this.body;

    if (!userId) {
      return {
        status: 400,
        data: { error: "user_id가 필요합니다." },
      };
    }

    try {
      const userExists = await UserStorage.getUserIdInfo(userId);
      if (userExists[0].length === 0) {
        return { status: 404, data: { error: "존재하지 않는 userId 입니다." } };
      }

      const hashedPassword = await UserService.hashPassword(password);
      await UserStorage.updateUserInfo(userId, nickname, hashedPassword, profile);
      return { status: 204 };
    } catch (error) {
      return { status: 500, data: { error: "서버오류" } };
    }
  }
  async getUserInfo() {
    const userId = this.params.id;

    if (!userId) {
      return {
        status: 400,
        data: { error: "user_id가 필요합니다." },
      };
    }
    try {
      const userInfo = await UserStorage.getUserIdInfo(userId);
      if (userInfo[0].length === 0) {
        return { status: 404, data: { error: "존재하지 않는 userId 입니다." } };
      }
      const { password, ...others } = userInfo[0][0];
      return { status: 200, data: others };
    } catch (error) {
      return { status: 500, data: { error: "서버 오류" } };
    }
  }
}

module.exports = UserService;
