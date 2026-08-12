import React, { useState } from "react";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        plan: "",
        trainer: "",
        joinDate: "",
        address: "",
        emergencyContact: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Member Data:", formData);
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Add Member
                    </h1>

                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                        Add a new member to your fitness center
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/admin/members")}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-lg text-sm text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:block">Back</span>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Personal Information */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm p-4 sm:p-5 mb-4">

                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
                            <UserPlus size={19} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Personal Information
                            </h2>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-0.5">
                                Basic details of the member
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Full Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Email Address *
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Phone Number *
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Join Date *
                            </label>

                            <input
                                type="date"
                                name="joinDate"
                                value={formData.joinDate}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                    </div>
                </div>

                {/* Membership Information */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm p-4 sm:p-5 mb-4">

                    <div className="mb-5">
                        <h2 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Membership Information
                        </h2>

                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                            Select membership plan and trainer
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Membership Plan *
                            </label>

                            <select
                                name="plan"
                                value={formData.plan}
                                onChange={handleChange}
                                required
                                className="form-input"
                            >
                                <option value="">Select plan</option>
                                <option value="Basic">Basic</option>
                                <option value="Premium">Premium</option>
                                <option value="Gold">Gold</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Assign Trainer
                            </label>

                            <select
                                name="trainer"
                                value={formData.trainer}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Select trainer</option>
                                <option value="Amit">Amit</option>
                                <option value="Rohit">Rohit</option>
                                <option value="Deepak">Deepak</option>
                                <option value="Vikas">Vikas</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm p-4 sm:p-5 mb-4">

                    <div className="mb-5">
                        <h2 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Additional Information
                        </h2>

                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                            Optional member information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Emergency Contact
                            </label>

                            <input
                                type="tel"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                placeholder="Emergency contact number"
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Address
                            </label>

                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="form-input"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] mb-1.5">
                                Notes
                            </label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Add any additional notes..."
                                className="form-input resize-none"
                            />
                        </div>

                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/members")}
                        className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#1C2529] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition"
                    >
                        <Save size={16} />
                        Save Member
                    </button>

                </div>
            </form>

            <style>{`
                .form-input {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid #E2E6E8;
                    background: white;
                    color: #1F272B;
                    font-size: 14px;
                    outline: none;
                    transition: 0.2s;
                }

                .form-input:focus {
                    border-color: #3420FF;
                }

                .form-input::placeholder {
                    color: #9AA3A6;
                }

                .dark .form-input {
                    border-color: #303A3F;
                    background: #12181B;
                    color: #F4F6F7;
                }

                .dark .form-input:focus {
                    border-color: #3420FF;
                }

                .dark .form-input option {
                    background: #1C2529;
                    color: #F4F6F7;
                }
            `}</style>
        </div>
    );
};

export default AddMember;