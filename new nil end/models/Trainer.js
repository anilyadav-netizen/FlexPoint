const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    specialty: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "Users",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Trainer ||
  mongoose.model("Trainer", trainerSchema);