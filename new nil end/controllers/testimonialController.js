const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");

const Testimonial = require("../models/Testimonial");

// ======================================================
// MULTER CONFIG
// ======================================================

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ======================================================
// IMGBB UPLOAD
// ======================================================

const uploadToImgBB = async (file) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  if (!process.env.IMGBB_API_KEY) {
    throw new Error("IMGBB_API_KEY is not configured");
  }

  if (!file.buffer) {
    throw new Error("Invalid image file");
  }

  const base64Image = file.buffer.toString("base64");

  const formData = new URLSearchParams();

  formData.append("key", process.env.IMGBB_API_KEY);
  formData.append("image", base64Image);

  const response = await axios.post(
    "https://api.imgbb.com/1/upload",
    formData.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 30000,
    }
  );

  if (!response.data || !response.data.success) {
    throw new Error(
      response.data?.error?.message ||
        "ImgBB image upload failed"
    );
  }

  return (
    response.data.data.display_url ||
    response.data.data.url
  );
};

// ======================================================
// CREATE TESTIMONIAL
// ======================================================

const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      role,
      rating,
      review,
      initials,
      status,
    } = req.body;

    // Required fields
    if (!name || !role || !review) {
      return res.status(400).json({
        success: false,
        message: "Name, role and review are required",
      });
    }

    // Rating
    let finalRating =
      rating === undefined || rating === ""
        ? 5
        : Number(rating);

    if (
      Number.isNaN(finalRating) ||
      finalRating < 1 ||
      finalRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Status
    let finalStatus = true;

    if (status !== undefined && status !== "") {
      finalStatus =
        status === true ||
        status === "true" ||
        status === "1";
    }

    // ==================================================
    // IMAGE UPLOAD
    // ==================================================

    let image = "";

    if (req.file) {
      image = await uploadToImgBB(req.file);
    }

    // ==================================================
    // CREATE
    // ==================================================

    const testimonial = await Testimonial.create({
      name: name.trim(),
      role: role.trim(),
      rating: finalRating,
      review: review.trim(),

      initials: initials
        ? initials.trim().toUpperCase()
        : "",

      image,

      status: finalStatus,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "Create Testimonial Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// GET ALL TESTIMONIALS
// ======================================================

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error(
      "Get Testimonials Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// ======================================================
// GET ACTIVE TESTIMONIALS
// ======================================================

const getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error(
      "Get Active Testimonials Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch active testimonials",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE TESTIMONIAL
// ======================================================

const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial =
      await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "Get Testimonial Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE TESTIMONIAL
// ======================================================

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial =
      await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const {
      name,
      role,
      rating,
      review,
      initials,
      status,
    } = req.body;

    // ==================================================
    // NAME
    // ==================================================

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      testimonial.name = name.trim();
    }

    // ==================================================
    // ROLE
    // ==================================================

    if (role !== undefined) {
      if (!role.trim()) {
        return res.status(400).json({
          success: false,
          message: "Role cannot be empty",
        });
      }

      testimonial.role = role.trim();
    }

    // ==================================================
    // REVIEW
    // ==================================================

    if (review !== undefined) {
      if (!review.trim()) {
        return res.status(400).json({
          success: false,
          message: "Review cannot be empty",
        });
      }

      testimonial.review = review.trim();
    }

    // ==================================================
    // RATING
    // ==================================================

    if (rating !== undefined && rating !== "") {
      const finalRating = Number(rating);

      if (
        Number.isNaN(finalRating) ||
        finalRating < 1 ||
        finalRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }

      testimonial.rating = finalRating;
    }

    // ==================================================
    // INITIALS
    // ==================================================

    if (initials !== undefined) {
      testimonial.initials = initials
        ? initials.trim().toUpperCase()
        : "";
    }

    // ==================================================
    // STATUS
    // ==================================================

    if (status !== undefined && status !== "") {
      testimonial.status =
        status === true ||
        status === "true" ||
        status === "1";
    }

    // ==================================================
    // NEW IMAGE
    // ==================================================

    if (req.file) {
      const imageUrl =
        await uploadToImgBB(req.file);

      testimonial.image = imageUrl;
    }

    // ==================================================
    // SAVE
    // ==================================================

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "Update Testimonial Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE TESTIMONIAL
// ======================================================

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID",
      });
    }

    const testimonial =
      await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Testimonial Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  upload,
  createTestimonial,
  getAllTestimonials,
  getActiveTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};