import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createTrainer,
  updateTrainer,
} from "../../redux/Slicer/trainerSlice";

const AddTrainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.trainer);

  const editingTrainer = location.state?.trainer;
  const isEdit = location.state?.isEdit === true;

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    role: "",
    specialty: "",
    experience: "",
    icon: "Users",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ============================
  // LOAD EDIT DATA
  // ============================
  useEffect(() => {
    if (isEdit && editingTrainer) {
      setFormData({
        number: editingTrainer.number || "",
        name: editingTrainer.name || "",
        role: editingTrainer.role || "",
        specialty: editingTrainer.specialty || "",
        experience: editingTrainer.experience || "",
        icon: editingTrainer.icon || "Users",
        isActive: editingTrainer.isActive ?? true,
      });

      setPreview(editingTrainer.image || "");
    }
  }, [isEdit, editingTrainer]);

  // ============================
  // INPUT CHANGE
  // ============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // STATUS CHANGE
  // ============================
  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.value === "true",
    }));
  };

  // ============================
  // IMAGE CHANGE
  // ============================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ============================
  // REMOVE IMAGE
  // ============================
  const removeImage = () => {
    setImage(null);

    if (isEdit && editingTrainer?.image) {
      setPreview(editingTrainer.image);
    } else {
      setPreview("");
    }
  };

  // ============================
  // SUBMIT
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (
      !formData.number ||
      !formData.name ||
      !formData.role ||
      !formData.specialty ||
      !formData.experience
    ) {
      alert(
        "Number, name, role, specialty and experience are required."
      );
      return;
    }

    // Image required only while creating
    if (!isEdit && !image) {
      alert("Trainer image is required.");
      return;
    }

    try {
      if (isEdit && editingTrainer?._id) {
        await dispatch(
          updateTrainer({
            id: editingTrainer._id,
            trainerData: {
              ...formData,
              image,
            },
          })
        ).unwrap();

        alert("Trainer updated successfully.");
      } else {
        await dispatch(
          createTrainer({
            ...formData,
            image,
          })
        ).unwrap();

        alert("Trainer created successfully.");
      }

      navigate("/admin/adtrainers");
    } catch (error) {
      alert(error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
      {/* ============================
          HEADER
      ============================ */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/adtrainers")}
          className="w-9 h-9 rounded-lg border border-[#303A3F] bg-[#1C2529] text-[#AEB7BA] flex items-center justify-center hover:bg-[#263136] transition"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F6F7]">
            {isEdit ? "Edit Trainer" : "Add Trainer"}
          </h1>

          <p className="text-xs sm:text-sm text-[#AEB7BA] mt-1">
            {isEdit
              ? "Update trainer information"
              : "Add a new fitness trainer"}
          </p>
        </div>
      </div>

      {/* ============================
          FORM CARD
      ============================ */}

      <form
        onSubmit={handleSubmit}
        className="bg-[#1C2529] rounded-xl border border-[#303A3F] overflow-hidden"
      >
        {/* Card Header */}
        <div className="px-6 py-6 border-b border-[#303A3F]">
          <h2 className="text-base sm:text-lg font-semibold text-[#F4F6F7]">
            Trainer Information
          </h2>

          <p className="text-xs sm:text-sm text-[#AEB7BA] mt-1">
            Enter trainer details below
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* ============================
              IMAGE
          ============================ */}
          <div>
            <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
              Trainer Image
            </label>

            <div className="relative w-32 h-32">
              {preview ? (
                <div className="relative w-32 h-32">
                  <img
                    src={preview}
                    alt="Trainer preview"
                    className="w-full h-full rounded-xl object-cover border border-[#303A3F]"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 rounded-xl border-2 border-dashed border-[#3A474C] bg-[#12181B] flex flex-col items-center justify-center cursor-pointer hover:border-[#3420FF] transition">
                  <Upload
                    size={22}
                    className="text-[#89959A]"
                  />

                  <span className="text-xs text-[#7E8B90] mt-2">
                    Upload Image
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-xs text-[#778387] mt-2">
              JPG, PNG or WEBP. Maximum 5MB.
            </p>
          </div>

          {/* ============================
              ROW 1
          ============================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter trainer name"
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] placeholder:text-[#6F7C81] outline-none focus:border-[#3420FF] transition"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Role
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Fitness Trainer"
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] placeholder:text-[#6F7C81] outline-none focus:border-[#3420FF] transition"
              />
            </div>
          </div>

          {/* ============================
              ROW 2
          ============================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Number */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Phone / Trainer Number
              </label>

              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] placeholder:text-[#6F7C81] outline-none focus:border-[#3420FF] transition"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Specialization
              </label>

              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] outline-none focus:border-[#3420FF] transition"
              >
                <option value="">
                  Select specialization
                </option>
                <option value="Strength Training">
                  Strength Training
                </option>
                <option value="Cardio & HIIT">
                  Cardio & HIIT
                </option>
                <option value="CrossFit">
                  CrossFit
                </option>
                <option value="Yoga & Flexibility">
                  Yoga & Flexibility
                </option>
                <option value="Pilates">
                  Pilates
                </option>
                <option value="Personal Training">
                  Personal Training
                </option>
                <option value="Functional Training">
                  Functional Training
                </option>
              </select>
            </div>
          </div>

          {/* ============================
              ROW 3
          ============================ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5 Years"
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] placeholder:text-[#6F7C81] outline-none focus:border-[#3420FF] transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
                Status
              </label>

              <select
                value={String(formData.isActive)}
                onChange={handleStatusChange}
                className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] outline-none focus:border-[#3420FF] transition"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* ============================
              ICON
          ============================ */}
          <div>
            <label className="block text-sm font-semibold text-[#F4F6F7] mb-2">
              Icon
            </label>

            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Users"
              className="w-full px-4 py-3 rounded-lg border border-[#303A3F] bg-[#12181B] text-sm text-[#F4F6F7] placeholder:text-[#6F7C81] outline-none focus:border-[#3420FF] transition"
            />

            <p className="text-xs text-[#778387] mt-1">
              Enter a Lucide icon name, e.g. Users, Dumbbell,
              HeartPulse.
            </p>
          </div>
        </div>

        {/* ============================
            FOOTER BUTTONS
        ============================ */}
        <div className="px-6 py-5 border-t border-[#303A3F] flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/trainers")}
            className="px-5 py-2.5 rounded-lg border border-[#303A3F] bg-[#12181B] text-[#AEB7BA] text-sm hover:bg-[#263136] transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm hover:bg-[#2818D9] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={16} />

            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Trainer"
                : "Create Trainer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainer;