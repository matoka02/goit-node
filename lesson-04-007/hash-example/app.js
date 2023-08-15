const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  // const result = await bcrypt.hash(password, 10);
  // console.log(result);    // $2b$10$R0z/XjmJf1NCnSlXWoCbJOjmHbpmyUSGNKLJgODX7f/ejzE4bqxlq

  // рефакторинг, добавление случайных символов
  // const salt = await bcrypt.genSalt(10);
  // console.log(salt);      // $2b$10$0TlI0c.ZkhmQ5qRXgpHcx.
  // const result = await bcrypt.hash(password, 10);
  // console.log(result);    // $2b$10$r/aFs1aHfhNykLwVj41FU.RYf244QgU2.9MzwcZSd5eFwoqFf9XqG

  // рефакторинг, проверка пароля, был ли захеширован ранее
  const result = await bcrypt.hash(password, 10);
  const compareResult1 = await bcrypt.compare(password, result);
  console.log(compareResult1);    // true
  const compareResult2 = await bcrypt.compare("123457", result);     
  console.log(compareResult2);    // false
};

createHashPassword("123456");