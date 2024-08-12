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
      return { success: false, msg: "비밀번호가 다릅니다." }; //status코드값으로 적기
    }
    //비밀번호 해싱
    const saltRounds = 10; //솔트 라운드 수 (10으로 설정)
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

    //db에 저장
    const response = await UserStorage.addUserInfo(
      userInfo.nickname,
      userInfo.id,
      hashedPassword
    );
    return response; //status코드값으로 적기
  }
}

module.exports = UserService;
