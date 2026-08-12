import React, { useState } from "react";
import { ArrowLeft, Star, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        program: "",
        rating: "5",
        review: "",
        image: null,
        status: "Published",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            program: formData.program,
            rating: Number(formData.rating),
            review: formData.review,
            image: formData.image ? URL.createObjectURL(formData.image) : null,
            date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            status: formData.status,
        };

        const existingReviews = JSON.parse(localStorage.getItem("programReviews")) || [];
        localStorage.setItem("programReviews", JSON.stringify([...existingReviews, newReview]));

        navigate("/admin/testimonials");
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] flex items-center justify-center text-[#606E6E] dark:text-[#AEB7BA] hover:text-[#3420FF]">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Add Review</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Add a member review for a specific program</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm">
                        <div className="p-4 sm:p-6 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <h2 className="text-base sm:text-lg font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Review Information</h2>
                            <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA] mt-1">Add member feedback and assign it to a program</p>
                        </div>

                        <div className="p-4 sm:p-6 space-y-5">
                            <div>
                                <label className="form-label">Member Image</label>
                                <label className="w-28 h-28 rounded-xl border-2 border-dashed border-[#D7DCDF] dark:border-[#3A454A] bg-[#F8F9FB] dark:bg-[#12181B] flex flex-col items-center justify-center cursor-pointer hover:border-[#3420FF]">
                                    <Upload size={21} className="text-[#778387] mb-2" />
                                    <span className="text-xs text-[#778387]">Upload Image</span>
                                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
                                </label>
                                {formData.image && <p className="text-xs text-[#606E6E] mt-2">{formData.image.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Member Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter member name" className="form-input" required />
                                </div>
                                <div>
                                    <label className="form-label">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="member@example.com" className="form-input" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Program</label>
                                    <select name="program" value={formData.program} onChange={handleChange} className="form-input" required>
                                        <option value="">Select Program</option>
                                        <option value="Strength Training">Strength Training</option>
                                        <option value="HIIT & Cardio">HIIT & Cardio</option>
                                        <option value="Yoga & Flexibility">Yoga & Flexibility</option>
                                        <option value="CrossFit">CrossFit</option>
                                        <option value="Pilates">Pilates</option>
                                        <option value="Zumba">Zumba</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label">Rating</label>
                                    <div className="relative">
                                        <Star size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                                        <select name="rating" value={formData.rating} onChange={handleChange} className="form-input pl-9" required>
                                            <option value="5">5 - Excellent</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="3">3 - Good</option>
                                            <option value="2">2 - Average</option>
                                            <option value="1">1 - Poor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Review</label>
                                <textarea name="review" value={formData.review} onChange={handleChange} rows="6" placeholder="Write member review..." className="form-input resize-none" required />
                            </div>

                            <div>
                                <label className="form-label">Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                                    <option value="Published">Published</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-[#E7EAED] dark:border-[#303A3F]">
                            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5">
                                Cancel
                            </button>
                            <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]">
                                Add Review
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                .form-label { display:block; font-size:.875rem; font-weight:500; color:#1F272B; margin-bottom:.5rem; }
                .form-input { width:100%; padding:.625rem .875rem; border-radius:.5rem; border:1px solid #E2E6E8; background:white; color:#1F272B; font-size:.875rem; outline:none; }
                .form-input:focus { border-color:#3420FF; }
                .dark .form-label { color:#F4F6F7; }
                .dark .form-input { background:#12181B; border-color:#303A3F; color:#F4F6F7; }
                .dark .form-input::placeholder { color:#778387; }
                .dark .form-input option { background:#12181B; color:#F4F6F7; }
            `}</style>
        </div>
    );
};

export default AddReview;