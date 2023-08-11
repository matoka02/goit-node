const { HttpError } = require("../helpers");

const validateBody = (schemas) => {
  const func = (req, resp, next) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
