const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// ==========================================
// CREATE BLOG
// POST /api/blogs
// ==========================================

router.post("/", createBlog);

// ==========================================
// GET ALL BLOGS
// GET /api/blogs
// ==========================================

router.get("/", getBlogs);

// ==========================================
// GET BLOG BY SLUG
// GET /api/blogs/slug/:slug
// ==========================================

router.get("/slug/:slug", getBlogBySlug);

// ==========================================
// GET SINGLE BLOG
// GET /api/blogs/:id
// ==========================================

router.get("/:id", getBlog);

// ==========================================
// UPDATE BLOG
// PUT /api/blogs/:id
// ==========================================

router.put("/:id", updateBlog);

// ==========================================
// DELETE BLOG
// DELETE /api/blogs/:id
// ==========================================

router.delete("/:id", deleteBlog);

module.exports = router;