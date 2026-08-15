import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Upload,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBlog, getBlog, updateBlog } from "../../redux/Slicer/blogSlice";
import { getPrograms } from "../../redux/Slicer/programSlice";
import { toast } from "react-toastify";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const { loading, error, selectedBlog } = useSelector(
    (state) => state.blog
  );

  const { program } = useSelector((state) => state.program);
  const programs = Array.isArray(program) ? program : [];

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    readTime: "",
    description: "",
    content: "",
    isPublished: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [oldImage, setOldImage] = useState("");

  // ============================
  // GET PROGRAMS
  // ============================
  useEffect(() => {
    dispatch(getPrograms());
  }, [dispatch]);

  // ============================
  // GET BLOG FOR EDIT
  // ============================
  useEffect(() => {
    if (editId) {
      dispatch(getBlog(editId));
    }
  }, [dispatch, editId]);

  // ============================
  // SET BLOG DATA IN FORM
  // ============================
  useEffect(() => {
    if (!selectedBlog || !isEditMode) return;

    setFormData({
      title: selectedBlog.title || "",
      category: selectedBlog.category || "",
      date: selectedBlog.date
        ? new Date(selectedBlog.date).toISOString().split("T")[0]
        : "",
      readTime: selectedBlog.readTime || "",
      description: selectedBlog.description || "",
      content: selectedBlog.content || "",
      isPublished: selectedBlog.isPublished ?? true,
    });

    setOldImage(selectedBlog.image || "");
    setImagePreview(selectedBlog.image || "");
    setImageFile(null);
  }, [selectedBlog, isEditMode]);

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // HANDLE IMAGE
  // ============================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ============================
  // SUBMIT
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Blog title is required.");
      return;
    }

    if (!formData.readTime.trim()) {
      toast.error("Read time is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Short description is required.");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Blog content is required.");
      return;
    }

    // Image required only while creating
    if (!isEditMode && !imageFile) {
      toast.error("Please select a blog image.");
      return;
    }

    try {
      const data = new FormData();

      data.append("category", formData.category);
      data.append(
        "date",
        formData.date || new Date().toISOString()
      );
      data.append("readTime", formData.readTime);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("content", formData.content);
      data.append(
        "isPublished",
        String(formData.isPublished)
      );

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await dispatch(
          updateBlog({
            id: editId,
            formData: data,
          })
        ).unwrap();

        toast.success("Blog updated successfully!");
      } else {
        await dispatch(createBlog(data)).unwrap();

        toast.success("Blog created successfully!");
      }

      navigate("/admin/adblogs");
    } catch (err) {
      console.error("Blog submit error:", err);
      toast.error(
        err?.message ||
          err ||
          `Failed to ${isEditMode ? "update" : "create"} blog`
      );
    }
  };

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] flex items-center justify-center text-[#606E6E] dark:text-[#AEB7BA] hover:text-[#3420FF]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
              {isEditMode ? "Edit Blog" : "Add Blog"}
            </h1>

            <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
              {isEditMode
                ? "Update your fitness blog"
                : "Create a new fitness blog and publish it on your website"}
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm">

            {/* FORM HEADER */}
            <div className="p-4 sm:p-6 border-b border-[#E7EAED] dark:border-[#303A3F]">
              <h2 className="text-base sm:text-lg font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                Blog Information
              </h2>

              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA] mt-1">
                Add the basic information and content for your blog
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-5">

              {/* IMAGE */}
              <div>
                <label className="form-label">
                  Cover Image
                </label>

                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[#D9DEE1] dark:border-[#303A3F] rounded-xl p-6 hover:border-[#3420FF] transition">
                    <div className="flex flex-col items-center justify-center">

                      <div className="w-12 h-12 rounded-full bg-[#F1F3FF] dark:bg-[#3420FF]/10 flex items-center justify-center mb-3">
                        <Upload
                          size={21}
                          className="text-[#3420FF]"
                        />
                      </div>

                      <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                        Click to upload image
                      </p>

                      <p className="text-xs text-[#778387] mt-1">
                        PNG, JPG, JPEG or WEBP — Max 5MB
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </label>

                {/* IMAGE PREVIEW */}
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[#E2E6E8] dark:border-[#303A3F]">
                      <img
                        src={imagePreview}
                        alt="Blog Preview"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2">
                        <p className="text-xs text-white">
                          {imageFile
                            ? imageFile.name
                            : "Current blog image"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!imagePreview && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#778387]">
                    <ImageIcon size={15} />
                    {isEditMode
                      ? "Select a new image only if you want to replace the current image."
                      : "Please select an image for your blog."}
                  </div>
                )}
              </div>

              {/* TITLE */}
              <div>
                <label className="form-label">
                  Blog Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="form-input"
                  required
                />
              </div>

              {/* CATEGORY + READ TIME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="form-label">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">
                      Select Program / Category
                    </option>

                    {programs
                      .filter(
                        (item) => item.isActive !== false
                      )
                      .map((item) => (
                        <option
                          key={item._id}
                          value={item.title}
                        >
                          {item.title}
                        </option>
                      ))}
                  </select>

                  {programs.length === 0 && (
                    <p className="text-xs text-[#E05252] mt-1">
                      No programs available. Please add a program first.
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label">
                    Read Time
                  </label>

                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 5 min read"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="form-label">
                  Publish Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="form-label">
                  Short Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write a short description for the blog..."
                  className="form-input resize-none"
                  required
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="form-label">
                  Blog Content
                </label>

                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="10"
                  placeholder="Write your complete blog content here..."
                  className="form-input resize-y"
                  required
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="form-label">
                  Status
                </label>

                <select
                  value={
                    formData.isPublished
                      ? "Published"
                      : "Draft"
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPublished:
                        e.target.value === "Published",
                    }))
                  }
                  className="form-input"
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-[#E7EAED] dark:border-[#303A3F]">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && (
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                )}

                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Blog"
                  : "Add Blog"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .form-label {
          display: block;
          font-size: .875rem;
          font-weight: 500;
          color: #1F272B;
          margin-bottom: .5rem;
        }

        .form-input {
          width: 100%;
          padding: .625rem .875rem;
          border-radius: .5rem;
          border: 1px solid #E2E6E8;
          background: white;
          color: #1F272B;
          font-size: .875rem;
          outline: none;
        }

        .form-input:focus {
          border-color: #3420FF;
        }

        .dark .form-label {
          color: #F4F6F7;
        }

        .dark .form-input {
          background: #000;
          border-color: #303A3F;
          color: #fff;
        }

        .dark .form-input::placeholder {
          color: #778387;
        }

        .dark .form-input option {
          background: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default AddBlogPage;