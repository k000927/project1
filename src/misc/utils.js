const bcrypt = require('bcrypt');

/* 유틸 함수들의 묶음 */
// 데이터 클랜징용 함수, 특정 객체에서 값이 undefined인 key가 있으면 해당 key-value를 삭제한다.
// e.g. input: { a: undefined, b: 1 } / output: { b: 1 }
function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

// HTTP 응답을 보낼 때 일관된 응답을 보내주기 위한 보조 함수
// 만약 에러 메시지가 있다면 메시지를 담아서 보내주고 없다면 null로 하여 보내준다.
// 일관된 응답 메시지를 보냄으로써 클라이언트가 응답으로 받은 데이터를 다루기 쉽게 해준다.
function buildResponse(data, errorMessage) {
  return {
    error: errorMessage ?? null,
    data,
  };
}

hashPassword = async (pw) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(pw, salt);
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbol = '@$!%*#?&';
  return symbol[Math.floor(Math.random() * symbol.length)];
}

const randomFunc = [getRandomUpperCase, getRandomLowerCase, getRandomNumber, getRandomSymbol];

function getRandomFunc() {
  return randomFunc[Math.floor(Math.random() * Object.keys(randomFunc).length)];
}

function randomPassword() {
  let password = '';
  const passwordLength = Math.random() * (12 - 8) + 8;
  for (let i = 1; i <= passwordLength; i++) {
    password += getRandomFunc()();
  }
  //check with regex
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  if (!password.match(regex)) {
    password = randomPassword();
  }
  return password;
}


module.exports = {
  sanitizeObject,
  buildResponse,
  hashPassword,
  randomPassword,
};
