const express = require("express");

const {
  createGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// CREATE
router.post(
  "/",
  upload.single("image"),
  createGallery
);

// GET ALL
router.get("/", getGallery);

// GET SINGLE
router.get("/:id", getGalleryById);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  updateGallery
);

// DELETE
router.delete("/:id", deleteGallery);

module.exports = router;