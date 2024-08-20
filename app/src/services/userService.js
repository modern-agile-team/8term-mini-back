"use strict";

const bcrypt = require("bcrypt"); //bcrypt라이브러리 이용하여 비밀번호 해싱
const UserStorage = require("../models/userStorage");

class UserService {
  constructor(req) {
    this.body = req.body;
    console.log(this.body);
  }
  static validationRules(nickname, id, password, confirmPassword) {
    //nickname 검증
    const regex_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if (!regex_nickname.test(nickname)) {
      return { status: 400 };
    }
    //id 검증
    const regex_id = /^(?=.*[a-z0-9])[a-z0-9]{6,16}$/;
    if (!regex_id.test(id)) {
      return { status: 400 };
    }
    //password 검증
    const regex_password = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!regex_password.test(password)) {
      return { status: 400 };
    }
    //confirmPassword 검증
    if (password !== confirmPassword) {
      return { status: 400 };
    }
    // 모든 검증을 통과 시 성공 상태 반환
    return { status: 200 };
  }

  async signUp() {
    const userInfo = this.body;
    console.log(userInfo);

    if (!userInfo) {
      return {
        status: 400,
      };
    }

    //입력값 검증
    const validation = UserService.validationRules(
      userInfo.nickname,
      userInfo.id,
      userInfo.password,
      userInfo.confirmPassword
    );
    if (validation.status !== 200) {
      return validation;
    }
    //db에 저장
    try {
      //비밀번호 해싱
      const saltRounds = 10; //솔트 라운드 수
      const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds); //try문에 넣기

      //사용자 정보 저장
      const response = await UserStorage.addUserInfo(
        userInfo.nickname,
        userInfo.id,
        hashedPassword
      );
      return {
        status: 200,
        data: response,
      };
    } catch (error) {
      return {
        status: 500,
      };
    }
  }
}

module.exports = UserService;
