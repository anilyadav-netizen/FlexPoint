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

// ======================================================
// CREATE TESTIMONIAL
// POST /api/testimonials
// ======================================================

router.post(
  "/",
  upload.single("image"),
  createTestimonial
);

// ======================================================
// GET ALL TESTIMONIALS
// GET /api/testimonials
// ======================================================

router.get(
  "/",
  getAllTestimonials
);

// ======================================================
// GET ACTIVE TESTIMONIALS
// GET /api/testimonials/active
// ======================================================

router.get(
  "/active",
  getActiveTestimonials
);

// ======================================================
// GET SINGLE TESTIMONIAL
// GET /api/testimonials/:id
// ======================================================

router.get(
  "/:id",
  getTestimonialById
);

// ======================================================
// UPDATE TESTIMONIAL
// PUT /api/testimonials/:id
// ======================================================

router.put(
  "/:id",
  upload.single("image"),
  updateTestimonial
);

// ======================================================
// DELETE TESTIMONIAL
// DELETE /api/testimonials/:id
// ======================================================

router.delete(
  "/:id",
  deleteTestimonial
);

module.exports = router;