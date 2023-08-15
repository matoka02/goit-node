const { User } = require("../models/user");

const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, resp) => {
  // проверка для выдачи кастомного сообщения
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  // создание пользователя
  const newUser = await User.create(req.body);
  resp.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
