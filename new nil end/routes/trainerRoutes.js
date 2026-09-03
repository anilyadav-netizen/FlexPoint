const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");

// ======================================
// MULTER CONFIG
// ======================================
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype &&
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// ======================================
// CREATE TRAINER
// POST /api/trainers
// ======================================
router.post(
  "/",
  upload.single("image"),
  createTrainer
);

// ======================================
// GET ALL TRAINERS
// GET /api/trainers
// GET /api/trainers?active=true
// ======================================
router.get("/", getTrainers);

// ======================================
// GET SINGLE TRAINER
// GET /api/trainers/:id
// ======================================
router.get("/:id", getTrainerById);

// ======================================
// UPDATE TRAINER
// PUT /api/trainers/:id
// ======================================
router.put(
  "/:id",
  upload.single("image"),
  updateTrainer
);

// ======================================
// DELETE TRAINER
// DELETE /api/trainers/:id
// ======================================
router.delete("/:id", deleteTrainer);

module.exports = router;