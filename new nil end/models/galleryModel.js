const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;