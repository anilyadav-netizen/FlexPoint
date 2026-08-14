const express = require("express");
const multer = require("multer");

const {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

const router = express.Router();

// ======================================
// Multer Configuration
// ======================================
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
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

router.post(
  "/",
  upload.single("image"),
  createProgram
);

router.get(
  "/",
  getPrograms
);

router.get(
  "/:id",
  getProgramById
);

router.put(
  "/:id",
  upload.single("image"),
  updateProgram
);

router.delete(
  "/:id",
  deleteProgram
);

module.exports = router;