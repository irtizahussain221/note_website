const Joi = require("@hapi/joi");

module.exports.folderValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });
  return Schema.validate(data);
};

module.exports.folderDeleteValidation = (data) => {
  const Schema = Joi.object({
    _id: Joi.string().required().min(24).max(24),
  });

  return Schema.validate(data);
};
