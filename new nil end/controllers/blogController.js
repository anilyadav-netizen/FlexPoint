const Blog = require("../models/blogModel");

// ==========================================
// CREATE BLOG
// ==========================================

const createBlog = async (req, res) => {
  try {
    const {
      category,
      date,
      readTime,
      title,
      description,
      content,
      image,
      isPublished,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!readTime) {
      return res.status(400).json({
        success: false,
        message: "Read time is required",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Blog content is required",
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ==========================================
    // CHECK DUPLICATE TITLE
    // ==========================================

    const existingBlog = await Blog.findOne({
      title: title.trim(),
    });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "Blog with this title already exists",
      });
    }

    // ==========================================
    // CREATE
    // ==========================================

    const blog = await Blog.create({
      category,
      date: date || new Date(),
      readTime,
      title,
      description,
      content,
      image,
      isPublished:
        typeof isPublished === "boolean"
          ? isPublished
          : true,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL BLOGS
// ==========================================

const getBlogs = async (req, res) => {
  try {
    const { category, published } = req.query;

    const filter = {};

    if (category) {
      filter.category = category.toUpperCase();
    }

    if (published !== undefined) {
      filter.isPublished = published === "true";
    }

    const blogs = await Blog.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE BLOG
// ==========================================

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

// ==========================================
// GET BLOG BY SLUG
// ==========================================

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug: slug.toLowerCase(),
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET BLOG BY SLUG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE BLOG
// ==========================================

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      category,
      date,
      readTime,
      title,
      description,
      content,
      image,
      isPublished,
    } = req.body;

    if (category !== undefined) {
      blog.category = category;
    }

    if (date !== undefined) {
      blog.date = date;
    }

    if (readTime !== undefined) {
      blog.readTime = readTime;
    }

    if (title !== undefined) {
      blog.title = title;
    }

    if (description !== undefined) {
      blog.description = description;
    }

    if (content !== undefined) {
      blog.content = content;
    }

    if (image !== undefined) {
      blog.image = image;
    }

    if (isPublished !== undefined) {
      blog.isPublished = isPublished;
    }

    const updatedBlog = await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE BLOG
// ==========================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};