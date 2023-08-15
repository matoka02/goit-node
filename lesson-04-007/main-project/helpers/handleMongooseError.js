const handleMongooseError = (error, data, next) => {
  // error.status = 400;
  // next();

  // рефакторинг, добавлена проверка в MogoDB на уникальность 
  const { name, code } = error;
  // console.log(name);    // MongoServerError
  // console.log(code);    // 11000
  const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
  error.status = status;
  next()
  }

module.exports = handleMongooseError;
