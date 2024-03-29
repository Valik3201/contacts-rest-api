const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15)
    .required(),
});

const contactIdSchema = Joi.string()
  .guid({
    version: ["uuidv4"],
  })
  .required();

module.exports = { contactSchema, contactIdSchema };
