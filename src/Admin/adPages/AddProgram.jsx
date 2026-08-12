import React, { useState } from "react";
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProgram = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    trainer: "",
    duration: "",
    level: "",
    price: "",
    members: "",
    status: "Active",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const addFeature = () => setFeatures([...features, ""]);

  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, image, features });
  };

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
      <div className="">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F1F3F4] dark:hover:bg-white/5 transition">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Add Program</h1>
              <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Create and manage fitness program details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                  <Plus size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Program Information</h2>
                  <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-0.5">Enter basic program information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="form-label">Program Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Strength Training" required className="form-input" />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="form-input">
                    <option value="">Select category</option>
                    <option>Strength Training</option>
                    <option>HIIT & Cardio</option>
                    <option>Yoga & Flexibility</option>
                    <option>CrossFit</option>
                    <option>Pilates</option>
                    <option>Zumba</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Trainer</label>
                  <select name="trainer" value={formData.trainer} onChange={handleChange} required className="form-input">
                    <option value="">Select trainer</option>
                    <option>John Smith</option>
                    <option>Sarah Wilson</option>
                    <option>Mike Johnson</option>
                    <option>Emma Davis</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Duration</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 60 Minutes" className="form-input" />
                </div>

                <div>
                  <label className="form-label">Difficulty Level</label>
                  <select name="level" value={formData.level} onChange={handleChange} className="form-input">
                    <option value="">Select level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" min="0" className="form-input" />
                </div>

                <div>
                  <label className="form-label">Expected Members</label>
                  <input type="number" name="members" value={formData.members} onChange={handleChange} placeholder="e.g. 50" min="0" className="form-input" />
                </div>

                <div>
                  <label className="form-label">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Write a short description..." rows="5" className="form-input resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5 h-fit">
              <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Program Image</h2>
              <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1 mb-4">Upload an image for this program</p>

              <label className="block cursor-pointer">
                <div className="h-56 rounded-xl border-2 border-dashed border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] flex items-center justify-center overflow-hidden hover:border-[#3420FF] transition">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img src={image} alt="Program Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="px-3 py-2 bg-white rounded-lg text-sm text-[#1F272B] font-medium">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                        <Upload size={21} />
                      </div>
                      <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">Upload Image</p>
                      <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">PNG, JPG or WEBP</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-5 mt-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Program Features</h2>
                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">Add the benefits included in this program</p>
              </div>
              <button type="button" onClick={addFeature} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF] text-xs font-semibold hover:bg-[#E9E5FF] dark:hover:bg-[#3420FF]/20 transition">
                <Plus size={15} /> Add Feature
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} placeholder={`Feature ${index + 1}`} className="form-input" />
                  {features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(index)} className="w-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#1C2529] text-[#606E6E] dark:text-[#AEB7BA] text-sm font-medium hover:bg-[#F8F9FB] dark:hover:bg-white/5 transition">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition">
              Save Program
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-label{display:block;font-size:.875rem;font-weight:500;color:#1F272B;margin-bottom:.5rem}
        .form-input{width:100%;padding:.625rem .875rem;border-radius:.5rem;border:1px solid #E2E6E8;background:#fff;color:#1F272B;font-size:.875rem;outline:none;transition:.2s}
        .form-input:focus{border-color:#3420FF;box-shadow:0 0 0 2px rgba(52,32,255,.08)}
        .form-input::placeholder{color:#778387}
        .dark .form-label{color:#F4F6F7}
        .dark .form-input{background:#12181B;border-color:#303A3F;color:#F4F6F7}
        .dark .form-input::placeholder{color:#778387}
        .dark .form-input option{background:#12181B;color:#F4F6F7}
      `}</style>
    </div>
  );
};

export default AddProgram;