const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, resp) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  resp.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, resp) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // запись токена в БД
  await User.findByIdAndUpdate(user._id, {token});
  resp.json({
    token,
  });
};

const getCurrent = async (req, resp) => {
  const { email, name } = req.user;
  resp.json({ email, name });
};

const logout = async (req, resp) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ''});
  resp.json({
    message: 'Logout success'
  })
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
