const Gallery = require("../models/galleryModel");
const uploadToImgBB = require("../utils/uploadToImgBB");

// ==========================================
// CREATE GALLERY
// ==========================================

const createGallery = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload to ImgBB
    const imageUrl = await uploadToImgBB(req.file);

    const gallery = await Gallery.create({
      image: imageUrl,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create gallery",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL GALLERY
// ==========================================

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE GALLERY
// ==========================================

const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("GET GALLERY BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE GALLERY
// ==========================================

const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (description !== undefined) {
      gallery.description = description;
    }

    // Upload new image only if provided
    if (req.file) {
      const imageUrl = await uploadToImgBB(req.file);
      gallery.image = imageUrl;
    }

    const updatedGallery = await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: updatedGallery,
    });
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE GALLERY
// ==========================================

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery",
      error: error.message,
    });
  }
};

module.exports = {
  createGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
};