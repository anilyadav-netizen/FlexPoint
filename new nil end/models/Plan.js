const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

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
  mongoose.models.Plan || mongoose.model("Plan", planSchema);