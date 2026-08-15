const axios = require("axios");
const Trainer = require("../models/Trainer");

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
// CREATE TRAINER
// ======================================
const createTrainer = async (req, res) => {
  try {
    const {
      number,
      name,
      role,
      specialty,
      experience,
      icon,
      isActive,
    } = req.body;

    if (
      !number ||
      !name ||
      !role ||
      !specialty ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Number, name, role, specialty and experience are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Trainer image is required",
      });
    }

    const existingTrainer = await Trainer.findOne({ number });

    if (existingTrainer) {
      return res.status(409).json({
        success: false,
        message: `Trainer number ${number} already exists`,
      });
    }

    const imageUrl = await uploadToImgBB(req.file);

    const trainer = await Trainer.create({
      number,
      name,
      role,
      specialty,
      experience,
      image: imageUrl,
      icon: icon || "Users",
      isActive:
        isActive !== undefined
          ? isActive === "true" || isActive === true
          : true,
    });

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Create Trainer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// GET ALL TRAINERS
// ======================================
const getTrainers = async (req, res) => {
  try {
    const { active } = req.query;

    const filter = {};

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    const trainers = await Trainer.find(filter).sort({
      number: 1,
    });

    return res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers,
    });
  } catch (error) {
    console.error("Get Trainers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// GET SINGLE TRAINER
// ======================================
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: trainer,
    });
  } catch (error) {
    console.error("Get Trainer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// UPDATE TRAINER
// ======================================
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await Trainer.findById(id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const {
      number,
      name,
      role,
      specialty,
      experience,
      icon,
      isActive,
    } = req.body;

    // Check duplicate number
    if (number !== undefined && number !== trainer.number) {
      const existingTrainer = await Trainer.findOne({
        number,
        _id: { $ne: id },
      });

      if (existingTrainer) {
        return res.status(409).json({
          success: false,
          message: `Trainer number ${number} already exists`,
        });
      }

      trainer.number = number;
    }

    if (name !== undefined) {
      trainer.name = name;
    }

    if (role !== undefined) {
      trainer.role = role;
    }

    if (specialty !== undefined) {
      trainer.specialty = specialty;
    }

    if (experience !== undefined) {
      trainer.experience = experience;
    }

    if (icon !== undefined) {
      trainer.icon = icon;
    }

    if (isActive !== undefined) {
      trainer.isActive =
        isActive === "true" || isActive === true;
    }

    // New image
    if (req.file) {
      const imageUrl = await uploadToImgBB(req.file);
      trainer.image = imageUrl;
    }

    await trainer.save();

    return res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Update Trainer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================
// DELETE TRAINER
// ======================================
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(
      req.params.id
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.error("Delete Trainer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};