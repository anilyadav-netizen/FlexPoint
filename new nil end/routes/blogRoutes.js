const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// CREATE
router.post(
  "/",
  upload.single("image"),
  createBlog
);

// GET ALL
router.get("/", getBlogs);

// GET BY SLUG
router.get("/slug/:slug", getBlogBySlug);

// GET BY ID
router.get("/:id", getBlog);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);

// DELETE
router.delete("/:id", deleteBlog);

module.exports = router;