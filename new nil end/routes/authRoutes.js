const express = require("express");

const {
  register,
  login,
  getProfile,
  logout,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", protect, getProfile);
router.post("/logout", logout);

module.exports = router;