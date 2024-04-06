const Joi = require("joi");

const contactSchemaForCreate = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15)
    .required(),
});

const contactSchemaForUpdate = Joi.object({
  name: Joi.string().trim().min(1).max(50),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15),
});

const contactIdSchema = Joi.string().required();

module.exports = {
  contactSchemaForCreate,
  contactSchemaForUpdate,
  contactIdSchema,
};
