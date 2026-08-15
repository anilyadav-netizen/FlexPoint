import React, { useEffect, useState } from "react";
import { ArrowLeft, Upload, Plus, Trash2, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProgram,
  updateProgram,
  getProgramById,
  clearProgramError,
  clearProgramSuccess,
  clearSelectedProgram,
} from "../../redux/Slicer/programSlice";

const AddProgram = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // URL: /admin/addprogram?edit=PROGRAM_ID
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const { loading, error, success, message, selectedProgram } = useSelector(
    (state) => state.program
  );

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [features, setFeatures] = useState([""]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    icon: "",
    isActive: true,
  });

  // ==========================================
  // GET PROGRAM FOR EDIT
  // ==========================================
  useEffect(() => {
    if (editId) {
      dispatch(getProgramById(editId));
    } else {
      dispatch(clearSelectedProgram());
    }

    return () => {
      dispatch(clearSelectedProgram());
    };
  }, [editId, dispatch]);

  // ==========================================
  // FILL FORM WHEN PROGRAM IS FETCHED
  // ==========================================
  useEffect(() => {
    if (!isEditMode || !selectedProgram) return;

    setFormData({
      title: selectedProgram.title || "",
      subtitle: selectedProgram.subtitle || "",
      description: selectedProgram.description || "",
      icon: selectedProgram.icon || "",
      isActive: selectedProgram.isActive ?? true,
    });

    // Existing image
    if (selectedProgram.image) {
      setImagePreview(selectedProgram.image);
    }

    // Features agar backend me available hain
    if (
      Array.isArray(selectedProgram.features) &&
      selectedProgram.features.length > 0
    ) {
      setFeatures(selectedProgram.features);
    } else {
      setFeatures([""]);
    }
  }, [selectedProgram, isEditMode]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // IMAGE CHANGE
  // ==========================================
  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ==========================================
  // ADD FEATURE
  // ==========================================
  const addFeature = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  // ==========================================
  // UPDATE FEATURE
  // ==========================================
  const updateFeature = (index, value) => {
    setFeatures((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // ==========================================
  // REMOVE FEATURE
  // ==========================================
  const removeFeature = (index) => {
    setFeatures((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      return updated.length > 0 ? updated : [""];
    });
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearProgramError());
    dispatch(clearProgramSuccess());

    // ------------------------------------------
    // CREATE MODE
    // ------------------------------------------
    if (!isEditMode) {
      if (!imageFile) {
        alert("Please upload a program image.");
        return;
      }

      const programData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        icon: formData.icon,
        isActive: formData.isActive,
        image: imageFile,
      };

      console.log("Creating Program:", programData);

      const result = await dispatch(createProgram(programData));

      if (createProgram.fulfilled.match(result)) {
        navigate("/admin/adprogram");
      }

      return;
    }

    // ------------------------------------------
    // UPDATE MODE
    // ------------------------------------------
    const programData = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      icon: formData.icon,
      isActive: formData.isActive,
    };

    // New image selected hai tabhi bhejenge
    if (imageFile) {
      programData.image = imageFile;
    }

    console.log("Updating Program:", {
      id: editId,
      programData,
    });

    const result = await dispatch(
      updateProgram({
        id: editId,
        programData,
      })
    );

    if (updateProgram.fulfilled.match(result)) {
      navigate("/admin/adprogram");
    }
  };

  // ==========================================
  // LOADING EDIT PROGRAM
  // ==========================================
  if (isEditMode && loading && !selectedProgram) {
    return (
      <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw
            size={28}
            className="animate-spin text-[#3420FF]"
          />

          <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
            Loading program...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
      <div>

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/admin/adprogram")}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F1F3F4] dark:hover:bg-white/5 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                {isEditMode ? "Edit Program" : "Add Program"}
              </h1>

              <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                {isEditMode
                  ? "Update fitness program details"
                  : "Create and manage fitness program details"}
              </p>
            </div>

          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ================= SUCCESS ================= */}
        {success && (
          <div className="mb-5 rounded-lg border border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
            {message ||
              (isEditMode
                ? "Program updated successfully"
                : "Program created successfully")}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* ================= PROGRAM INFORMATION ================= */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5">

              <div className="flex items-center gap-2 mb-5">

                <div className="w-8 h-8 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                  {isEditMode ? (
                    <RefreshCw size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                    Program Information
                  </h2>

                  <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-0.5">
                    {isEditMode
                      ? "Update existing program information"
                      : "Enter basic program information"}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* TITLE */}
                <div>
                  <label className="form-label">
                    Program Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. STRENGTH"
                    required
                    className="form-input"
                  />
                </div>

                {/* SUBTITLE */}
                <div>
                  <label className="form-label">
                    Program Subtitle
                  </label>

                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="e.g. TRAINING"
                    required
                    className="form-input"
                  />
                </div>

                {/* ICON */}
                <div className="md:col-span-2">
                  <label className="form-label">
                    Lucide Icon Name
                  </label>

                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g. Dumbbell"
                    className="form-input"
                  />

                  <p className="text-xs text-[#778387] mt-1">
                    Example: Dumbbell, HeartPulse, Leaf, Users
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    value={formData.isActive ? "Active" : "Inactive"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.value === "Active",
                      }))
                    }
                    className="form-input"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write a short description..."
                    rows="5"
                    required
                    className="form-input resize-none"
                  />
                </div>

              </div>
            </div>

            {/* ================= IMAGE ================= */}
            <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5 h-fit">

              <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                Program Image
              </h2>

              <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1 mb-4">
                {isEditMode
                  ? "Change the program image if required"
                  : "Upload an image for this program"}
              </p>

              <label className="block cursor-pointer">

                <div className="h-56 rounded-xl border-2 border-dashed border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] flex items-center justify-center overflow-hidden hover:border-[#3420FF] transition">

                  {imagePreview ? (
                    <div className="relative w-full h-full">

                      <img
                        src={imagePreview}
                        alt="Program Preview"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="px-3 py-2 bg-white rounded-lg text-sm text-[#1F272B] font-medium">
                          Change Image
                        </span>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center">

                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                        <Upload size={21} />
                      </div>

                      <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                        Upload Image
                      </p>

                      <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                        PNG, JPG or WEBP
                      </p>

                    </div>
                  )}

                </div>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImage}
                  className="hidden"
                />

              </label>

              {imageFile && (
                <p className="text-xs text-[#606E6E] dark:text-[#AEB7BA] mt-3 truncate">
                  Selected: {imageFile.name}
                </p>
              )}

              {isEditMode && !imageFile && imagePreview && (
                <p className="text-xs text-[#606E6E] dark:text-[#AEB7BA] mt-3">
                  Existing program image
                </p>
              )}

            </div>

          </div>

          {/* ================= FEATURES ================= */}
          <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5 mt-5">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                  Program Features
                </h2>

                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                  Add the benefits included in this program
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF] text-xs font-semibold hover:bg-[#E9E5FF] transition"
              >
                <Plus size={15} />
                Add Feature
              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">

                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      updateFeature(index, e.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                    className="form-input"
                  />

                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="w-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}

                </div>
              ))}

            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex justify-end gap-3 mt-5">

            <button
              type="button"
              onClick={() => navigate("/admin/adprogram")}
              className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#1C2529] text-[#606E6E] dark:text-[#AEB7BA] text-sm font-medium hover:bg-[#F8F9FB] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Program"
                : "Save Program"}
            </button>

          </div>

        </form>
      </div>

      <style>{`
        .form-label{
          display:block;
          font-size:.875rem;
          font-weight:500;
          color:#1F272B;
          margin-bottom:.5rem
        }

        .form-input{
          width:100%;
          padding:.625rem .875rem;
          border-radius:.5rem;
          border:1px solid #E2E6E8;
          background:#fff;
          color:#1F272B;
          font-size:.875rem;
          outline:none;
          transition:.2s
        }

        .form-input:focus{
          border-color:#3420FF;
          box-shadow:0 0 0 2px rgba(52,32,255,.08)
        }

        .form-input::placeholder{
          color:#778387
        }

        .dark .form-label{
          color:#F4F6F7
        }

        .dark .form-input{
          background:#12181B;
          border-color:#303A3F;
          color:#F4F6F7
        }

        .dark .form-input::placeholder{
          color:#778387
        }

        .dark .form-input option{
          background:#12181B;
          color:#F4F6F7
        }
      `}</style>
    </div>
  );
};

export default AddProgram;