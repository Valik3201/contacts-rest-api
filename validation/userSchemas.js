const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifySchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  userSchema,
  subscriptionUpdateSchema,
  verifySchema,
};
