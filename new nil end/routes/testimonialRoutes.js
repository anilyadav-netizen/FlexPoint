const express = require("express");

const {
  upload,
  createTestimonial,
  getAllTestimonials,
  getActiveTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

// Create testimonial
router.post(
  "/",
  upload.single("image"),
  createTestimonial
);

// Get all testimonials
router.get("/", getAllTestimonials);

// Get active testimonials
router.get("/active", getActiveTestimonials);

// Get single testimonial
router.get("/:id", getTestimonialById);

// Update testimonial
router.put(
  "/:id",
  upload.single("image"),
  updateTestimonial
);

// Delete testimonial
router.delete("/:id", deleteTestimonial);

module.exports = router;