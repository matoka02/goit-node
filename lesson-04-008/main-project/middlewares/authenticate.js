const jwt = require("jsonwebtoken");

const {User} = require("../models/user");
const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env;

const authenticate = async (req, resp, next) => {
  const {autorization = ''} = req.headers;
  const [bearer, token] = autorization.split(' ');
  if(bearer!=='Bearer'){
    next(HttpError(401))
  };
  try {
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    // проверка для вывода сообщения
    if (!user) {
      next(HttpError(401, 'User not found'))
    };
    // команда идти к следующей функции, если все ок
    next();
  } catch  {
    next(HttpError(401))
  };


};

module.exports = authenticate;