import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTrainers = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    members: "",
    rating: "",
    status: "Active",
    bio: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trainer Data:", formData);
  };

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] flex items-center justify-center text-[#606E6E] dark:text-[#AEB7BA] hover:text-[#3420FF]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
              Add Trainer
            </h1>

            <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
              Add a new fitness trainer
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm">
            <div className="p-4 sm:p-6 border-b border-[#E7EAED] dark:border-[#303A3F]">
              <h2 className="text-base sm:text-lg font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                Trainer Information
              </h2>

              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA] mt-1">
                Enter trainer details below
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              <div>
                <label className="form-label">Trainer Image</label>

                <label className="w-32 h-32 rounded-xl border-2 border-dashed border-[#D7DCDF] dark:border-[#3A454A] bg-[#F8F9FB] dark:bg-[#12181B] flex flex-col items-center justify-center cursor-pointer hover:border-[#3420FF]">
                  <Upload size={22} className="text-[#778387] mb-2" />

                  <span className="text-xs text-[#778387]">
                    Upload Image
                  </span>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {formData.image && (
                  <p className="text-xs text-[#606E6E] mt-2">
                    {formData.image.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter trainer name"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="trainer@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Specialization</label>

                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select specialization</option>
                    <option value="Strength Training">
                      Strength Training
                    </option>
                    <option value="Cardio & HIIT">Cardio & HIIT</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Yoga & Flexibility">
                      Yoga & Flexibility
                    </option>
                    <option value="Personal Training">
                      Personal Training
                    </option>
                    <option value="Zumba">Zumba</option>
                    <option value="Nutrition">Nutrition</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="form-label">Experience</label>

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5 Years"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Members</label>

                  <input
                    type="number"
                    name="members"
                    value={formData.members}
                    onChange={handleChange}
                    placeholder="0"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Rating</label>

                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="4.8"
                    min="0"
                    max="5"
                    step="0.1"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Trainer Bio</label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write a short description..."
                  className="form-input resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-[#E7EAED] dark:border-[#303A3F]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]"
              >
                Add Trainer
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
          background: #12181B;
          border-color: #303A3F;
          color: #F4F6F7;
        }

        .dark .form-input::placeholder {
          color: #778387;
        }
      `}</style>
    </div>
  );
};

export default AddTrainers;