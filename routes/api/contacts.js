const express = require("express");
const router = express.Router();
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { contactSchema, contactIdSchema } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactIdSchema.validate(req.params.contactId);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const removedContact = await removeContact(req.params.contactId);
    if (!removedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error: idError } = contactIdSchema.validate(req.params.contactId);
    if (idError) {
      return res.status(400).json({ message: idError.details[0].message });
    }

    const { error: bodyError } = contactSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ message: bodyError.details[0].message });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
