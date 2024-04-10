const Contact = require("../models/contact");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error("Error listing contacts:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
};

const listContactsPaginated = async (page, limit) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Contact.countDocuments();
    const contacts = await Contact.find().limit(limit).skip(startIndex);
    const hasNextPage = endIndex < totalCount;
    const hasPreviousPage = startIndex > 0;
    return {
      contacts,
      hasNextPage,
      hasPreviousPage,
    };
  } catch (error) {
    console.error("Error listing paginated contacts:", error);
    return {
      contacts: [],
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
};

const listFavoriteContacts = async () => {
  try {
    return await Contact.find({ favorite: true });
  } catch (error) {
    console.error("Error listing favorite contacts:", error);
    return [];
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    return result.deletedCount === 1;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return null;
    }

    contact.favorite = body.favorite;

    const updatedContact = await contact.save();

    return updatedContact;
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw error;
  }
};

module.exports = {
  addContact,
  getContactById,
  listContacts,
  listContactsPaginated,
  listFavoriteContacts,
  removeContact,
  updateContact,
  updateStatusContact,
};
