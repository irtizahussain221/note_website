const Joi = require("@hapi/joi");

module.exports.notesCreationValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    text: Joi.string().required(),
    folder: Joi.string().required().min(24).max(24),
  });

  return Schema.validate(data);
};

module.exports.noteDetailsPasswordValidation = (data) => {
  const Schema = Joi.object({
    _id: Joi.string().required(),
    password: Joi.string().required(),
  });

  return Schema.validate(data);
};

module.exports.noteUpdateValidation = (data) => {
  const Schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    text: Joi.string().required(),
    folder: Joi.string().required().min(24).max(24),
  });

  return Schema.validate(data);
};
