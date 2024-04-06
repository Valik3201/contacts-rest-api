const mongoose = require("mongoose");

// Определение схемы модели контакта
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

// Создание модели на основе схемы
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
