const Joi = require("joi");

const baseContactSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15),
  favorite: Joi.boolean(),
});

const contactSchemaForCreate = baseContactSchema.fork(
  ["name", "email", "phone"],
  (field) => field.required()
);

const contactSchemaForUpdate = baseContactSchema;

const favoriteSchemaForUpdate = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactIdSchema = Joi.string().required();

module.exports = {
  contactSchemaForCreate,
  contactSchemaForUpdate,
  favoriteSchemaForUpdate,
  contactIdSchema,
};
