const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    initials: {
      type: String,
      trim: true,
      uppercase: true,
    },

    // Testimonial Image
    image: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);