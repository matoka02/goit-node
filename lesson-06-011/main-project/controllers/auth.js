const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, resp) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

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

const updateAvatar = async (req, resp) => {
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, {avatarURL});

  resp.json({avatarURL});
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
