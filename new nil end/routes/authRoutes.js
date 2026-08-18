const express = require("express");

const {
  register,
  login,
  getProfile,
  getAllUsers,
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

router.get("/users", protect, getAllUsers);

router.post("/logout", logout);

module.exports = router;