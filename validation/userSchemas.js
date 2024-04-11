const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userSchema,
  subscriptionUpdateSchema,
};
