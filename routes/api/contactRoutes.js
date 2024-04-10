const express = require("express");
const router = express.Router();
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactController");

const {
  contactSchemaForCreate,
  contactSchemaForUpdate,
  favoriteSchemaForUpdate,
  contactIdSchema,
} = require("../../validation/contactSchemas");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
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
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchemaForCreate.validate(req.body);
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
    res.status(200).json({ message: "Contact deleted" });
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

    const { error: bodyError } = contactSchemaForUpdate.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ message: bodyError.details[0].message });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  try {
    const { error: idError } = contactIdSchema.validate(req.params.contactId);
    if (idError) {
      return res.status(400).json({ message: idError.details[0].message });
    }

    const { error, value } = favoriteSchemaForUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateStatusContact(
      req.params.contactId,
      value
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
