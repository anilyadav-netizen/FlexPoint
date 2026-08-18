const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

// Create contact message
router.post("/", createContact);

// Get all contact messages
router.get("/", getAllContacts);

// Get single contact message
router.get("/:id", getContactById);

// Delete contact message
router.delete("/:id", deleteContact);

module.exports = router;