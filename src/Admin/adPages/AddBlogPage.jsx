
import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author: "",
        description: "",
        content: "",
        status: "Published",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Blog Data:", formData);

        navigate(-1);
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-3 sm:p-5 lg:p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] flex items-center justify-center text-[#606E6E] dark:text-[#AEB7BA] hover:text-[#3420FF]"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Add Blog
                        </h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Create a new fitness blog and publish it on your website
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm">
                        <div className="p-4 sm:p-6 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <h2 className="text-base sm:text-lg font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Blog Information
                            </h2>
                            <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA] mt-1">
                                Add the basic information and content for your blog
                            </p>
                        </div>

                        <div className="p-4 sm:p-6 space-y-5">
                            <div>
                                <label className="form-label">Cover Image</label>

                                <label className="w-full h-52 rounded-xl border-2 border-dashed border-[#D7DCDF] dark:border-[#3A454A] bg-[#F8F9FB] dark:bg-black flex flex-col items-center justify-center cursor-pointer hover:border-[#3420FF] overflow-hidden">
                                    {formData.image ? (
                                        <img
                                            src={URL.createObjectURL(formData.image)}
                                            alt="Blog Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload
                                                size={28}
                                                className="text-[#778387] mb-2"
                                            />
                                            <span className="text-sm text-[#778387]">
                                                Click to upload cover image
                                            </span>
                                            <span className="text-xs text-[#A0A8AA] mt-1">
                                                PNG, JPG or JPEG
                                            </span>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </label>

                                {formData.image && (
                                    <p className="text-xs text-[#606E6E] dark:text-[#AEB7BA] mt-2">
                                        {formData.image.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="form-label">Blog Title</label>

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Category</label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Strength Training">
                                            Strength Training
                                        </option>
                                        <option value="HIIT & Cardio">
                                            HIIT & Cardio
                                        </option>
                                        <option value="Yoga & Flexibility">
                                            Yoga & Flexibility
                                        </option>
                                        <option value="CrossFit">CrossFit</option>
                                        <option value="Zumba">Zumba</option>
                                        <option value="Pilates">Pilates</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label">Author</label>

                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="Enter author name"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Short Description</label>

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

                            <div>
                                <label className="form-label">Blog Content</label>

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

                            <div>
                                <label className="form-label">Status</label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="form-input"
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                        </div>

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
                                className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]"
                            >
                                Add Blog
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
