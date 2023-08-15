const { Schema, model } = require("mongoose");
const joi = require("joi");

const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

// валидация при регистрации
const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});

// валидация при авторизации
const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}