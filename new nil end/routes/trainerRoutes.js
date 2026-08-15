const express = require("express");
const multer = require("multer");

const {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");

const router = express.Router();

// ======================================
// Multer Configuration
// ======================================
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ======================================
// Routes
// ======================================

// Create
router.post(
  "/",
  upload.single("image"),
  createTrainer
);

// Get All
router.get(
  "/",
  getTrainers
);

// Get One
router.get(
  "/:id",
  getTrainerById
);

// Update
router.put(
  "/:id",
  upload.single("image"),
  updateTrainer
);

// Delete
router.delete(
  "/:id",
  deleteTrainer
);

module.exports = router;