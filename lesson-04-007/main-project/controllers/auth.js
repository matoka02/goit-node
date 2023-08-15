const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");

const { ctrlWrapper, HttpError } = require("../helpers");

const {SECRET_KEY} = process.env;

const register = async (req, resp) => {
  // проверка для выдачи кастомного сообщения
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  // // создание пользователя
  // const newUser = await User.create(req.body);
  // resp.status(201).json({
  //   name: newUser.name,
  //   email: newUser.email,
  // });

  // хеширование пароля
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  resp.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, resp) => {
  const {email, password} = req.body;
  // проверка наличия пользователя
  const user = await User.findOne({email});
  if (!user) {
    throw HttpError(401, 'Email or password invalid')
  };
  // проверка его пароля
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid')
  };
  // создание токена
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
  resp.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
