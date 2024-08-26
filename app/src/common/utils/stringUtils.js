"use strict";

const stringUtils = {
  toCamelCase: (array) => {
    return array.map((obj) => {
      let newObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelCaseKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
          newObj[camelCaseKey] = obj[key];
        }
      }
      return newObj;
    });
  },
};

module.exports = stringUtils;
