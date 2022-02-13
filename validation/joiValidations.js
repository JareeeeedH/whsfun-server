const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(24).required(),

    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
      .required()
      .min(3)
      .max(1024)
      .email({ minDomainSegments: 2 }),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
