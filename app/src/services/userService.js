"use strict";

const bcrypt = require("bcrypt");
const UserStorage = require("../models/userStorage");

class UserService {
  constructor(req) {
    this.body = req.body;
  }
  static userInputValidation(nickname, id, password, confirmPassword) {
    //함수 이름 수정
    //nickname 검증
    const regex_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if (!regex_nickname.test(nickname)) {
      return { status: 400, message: "닉네임 입력 오류" };
    }
    //id 검증
    const regex_id = /^(?=.*[a-z0-9])[a-z0-9]{6,16}$/;
    if (!regex_id.test(id)) {
      return { status: 400, message: "아이디 입력 오류" };
    }
    //password 검증
    const regex_password = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!regex_password.test(password)) {
      return { status: 400, messgae: "비밀번호 입력 오류" };
    }
    //confirmPassword 검증
    if (password !== confirmPassword) {
      return { status: 400, message: "비밀번호 값 불일치" };
    }
    // 모든 검증을 통과 시 성공 상태 반환
    return { status: 200, message: "All inputs are valid" };
  }

  async signUp() {
    const userInfo = this.body;

    if (!userInfo) {
      return {
        status: 400,
      };
    }

    //입력값 검증
    const UserInputValidation = UserService.userInputValidation(
      userInfo.nickname,
      userInfo.id,
      userInfo.password,
      userInfo.confirmPassword
    );
    if (UserInputValidation.status !== 200) {
      return UserInputValidation;
    }
    //db에 저장
    try {
      //비밀번호 해싱
      const saltRounds = parseInt(process.env.SALT_ROUND); //솔트 라운드 수
      const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
      console.log(hashedPassword);
      //사용자 정보 저장
      const userId = (
        await UserStorage.addUserInfo(userInfo.nickname, userInfo.id, hashedPassword)
      )[0].insertId;

      const response = await UserStorage.getUserIdInfo(userId);
      console.log(response);

      return {
        status: 200,
        data: response[0],
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
      };
    }
  }
}

module.exports = UserService;
