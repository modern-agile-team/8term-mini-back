"use strict";

const bcrypt = require("bcrypt"); //bcrypt라이브러리 이용하여 비밀번호 해싱
const UserStorage = require("../models/userStorage");

class UserService {
  constructor(req) {
    this.body = req.body;
  }

  async signUp() {
    const userInfo = this.body;

    //비밀번호입력값과 비밀번호 확인 입력값이 다른 경우(오류처리)
    if (userInfo.password !== userInfo.confirmPassword) {
      return { success: 400, msg: "입력값 오류" }; //msg 자세히 적으면 안되는지 확인해보기 "password와 confirmpsword입력값이 다릅니다"
    }
    //비밀번호 해싱
    const saltRounds = 10; //솔트 라운드 수 (10으로 설정). env에 넣어야 한다.
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

    //db에 저장
    try {
      const response = await UserStorage.addUserInfo(
        userInfo.nickname,
        userInfo.id,
        hashedPassword
      );
      return {
        status: 200,
        msg: "successfully saved",
        data: response,
      };
    } catch (error) {
      return {
        status: 500,
        msg: "failed",
        error: error.msg,
      };
    }
  }
}

module.exports = UserService;
