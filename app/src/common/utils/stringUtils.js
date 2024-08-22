"use strict";

const stringUtils = {
  toCamelCase: (array) => {
    console.log("받은배열 값 : ", array);
    return array.map((obj) => {
      console.log("map으로 꺼낸 객체 : ", obj);
      let newObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log("확인됨 : ", typeof key);
          const camelCaseKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
          console.log("카멜키 : ", camelCaseKey);
          newObj[camelCaseKey] = obj[key];
        }
      }
      console.log("리털할 카멜 객체 : ", newObj);
      return newObj;
    });
  },
};

module.exports = stringUtils;
