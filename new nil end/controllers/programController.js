const axios = require("axios");
const Program = require("../models/Program");

// ======================================
// Upload Image to ImgBB
// ======================================
const uploadToImgBB = async (file) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  if (!process.env.IMGBB_API_KEY) {
    throw new Error("IMGBB_API_KEY is not configured");
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
    }
  );

  if (!response.data.success) {
    throw new Error("ImgBB image upload failed");
  }

  return response.data.data.url;
};

// ======================================
// CREATE PROGRAM
// ======================================
const createProgram = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      icon,
      isActive,
    } = req.body;

    if (!title || !subtitle || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, subtitle and description are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Program image is required",
      });
    }

    const imageUrl = await uploadToImgBB(req.file);

    const program = await Program.create({
      title,
      subtitle,
      description,
      icon: icon || "",
      image: imageUrl,
      isActive:
        isActive !== undefined
          ? isActive === "true" || isActive === true
          : true,
    });

    return res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    console.error("Create Program Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// GET ALL PROGRAMS
// ======================================
const getPrograms = async (req, res) => {
  try {
    const { active } = req.query;

    const filter = {};

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    const programs = await Program.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    console.error("Get Programs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// GET SINGLE PROGRAM
// ======================================
const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error("Get Program Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// UPDATE PROGRAM
// ======================================
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    const {
      title,
      subtitle,
      description,
      icon,
      isActive,
    } = req.body;

    if (title !== undefined) {
      program.title = title;
    }

    if (subtitle !== undefined) {
      program.subtitle = subtitle;
    }

    if (description !== undefined) {
      program.description = description;
    }

    if (icon !== undefined) {
      program.icon = icon;
    }

    if (isActive !== undefined) {
      program.isActive =
        isActive === "true" || isActive === true;
    }

    // New image uploaded
    if (req.file) {
      const imageUrl = await uploadToImgBB(req.file);

      program.image = imageUrl;
    }

    await program.save();

    return res.status(200).json({
      success: true,
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    console.error("Update Program Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// DELETE PROGRAM
// ======================================
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    console.error("Delete Program Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};