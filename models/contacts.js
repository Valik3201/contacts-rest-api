const fs = require("fs/promises");

const DB_FILE = "models/contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
      return false;
    }

    await fs.writeFile(DB_FILE, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: String(Date.now()), ...body };
    contacts.push(newContact);
    await fs.writeFile(DB_FILE, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(DB_FILE, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
