const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // ==========================================
    // CATEGORY
    // ==========================================
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      uppercase: true,
    },

    // ==========================================
    // DATE
    // ==========================================
    date: {
      type: Date,
      default: Date.now,
    },

    // ==========================================
    // READ TIME
    // ==========================================
    readTime: {
      type: String,
      required: [true, "Read time is required"],
      trim: true,
    },

    // ==========================================
    // TITLE
    // ==========================================
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    // ==========================================
    // SLUG
    // ==========================================
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ==========================================
    // SHORT DESCRIPTION
    // ==========================================
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    // ==========================================
    // FULL BLOG CONTENT
    // ==========================================
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },

    // ==========================================
    // IMAGE
    // ==========================================
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    // ==========================================
    // PUBLISHED STATUS
    // ==========================================
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// GENERATE SLUG
// ==========================================

blogSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;