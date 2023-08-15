const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
  id: "64db6362b56cdabe515879c9",
};

// создание токена, указаны id, ключ и срок жизни токена
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
console.log(token);     
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGI2MzYyYjU2Y2RhYmU1MTU4NzljOSIsImlhdCI6MTY5MjEyMjQ2OCwiZXhwIjoxNjkyMjA1MjY4fQ.XY0GRBceJXJNuIMzBGxakJbvZ_NwBxyq0uKLbV22eqk

const decodeToken = jwt.decode(token);
// console.log(decodeToken);
// { id: '64db6362b56cdabe515879c9', iat: 1692122664, exp: 1692205464 }

// проверка валидности токена
try {
  const { id } = jwt.verify(token, SECRET_KEY);
  console.log(id);      // 64db6362b56cdabe515879c9
  const invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGI2MzYyYjU2Y2RhYmU1MTU4NzljOSIsImlhdCI6MTY5MjEyMjQ2OCwiZXhwIjoxNjkyMjA1MjY4fQ.XY0GRBceJXJNuIMzBGxakJbvZ_NwBxyq0uKLbV22eqk";
  const result = jwt.verify(invalidToken, SECRET_KEY);
} catch (error) {
  console.log(error.message);     // invalid signature
}
