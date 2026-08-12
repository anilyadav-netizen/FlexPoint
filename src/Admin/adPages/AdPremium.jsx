
import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, Crown, CheckCircle, Users, IndianRupee } from "lucide-react";

const initialPlans = [
    { id: 1, name: "Premium Monthly", description: "Perfect for members who want flexible monthly access.", price: 999, duration: "1 Month", members: 128, status: "Active" },
    { id: 2, name: "Premium Quarterly", description: "Save more with a 3-month premium membership.", price: 2499, duration: "3 Months", members: 86, status: "Active" },
    { id: 3, name: "Premium Yearly", description: "Best value plan with full-year premium access.", price: 7999, duration: "12 Months", members: 54, status: "Active" },
];

const AdPremium = () => {
    const [plans, setPlans] = useState(initialPlans);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", price: "", duration: "", status: "Active" });

    const filteredPlans = plans.filter((plan) => plan.name.toLowerCase().includes(search.toLowerCase()));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openAddModal = () => {
        setEditingPlan(null);
        setFormData({ name: "", description: "", price: "", duration: "", status: "Active" });
        setShowModal(true);
    };

    const openEditModal = (plan) => {
        setEditingPlan(plan);
        setFormData({ name: plan.name, description: plan.description, price: plan.price, duration: plan.duration, status: plan.status });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingPlan) {
            setPlans(plans.map((plan) => plan.id === editingPlan.id ? { ...plan, ...formData, price: Number(formData.price) } : plan));
        } else {
            setPlans([...plans, { ...formData, id: Date.now(), price: Number(formData.price), members: 0 }]);
        }

        setShowModal(false);
        setEditingPlan(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this premium plan?")) {
            setPlans(plans.filter((plan) => plan.id !== id));
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Premium Plans</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage premium membership plans and subscriptions</p>
                    </div>

                    <button onClick={openAddModal} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition">
                        <Plus size={18} /> Add Premium Plan
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Plans</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{plans.length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <Crown size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Premium Members</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{plans.reduce((sum, plan) => sum + plan.members, 0)}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#EEF5FF] dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Users size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Active Plans</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{plans.filter((plan) => plan.status === "Active").length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                        <input type="text" placeholder="Search premium plans..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Crown size={19} className="text-yellow-500" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Premium Membership Plans</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Plan</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Price</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Duration</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Members</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredPlans.map((plan) => (
                                    <tr key={plan.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{plan.name}</p>
                                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1 max-w-[280px] truncate">{plan.description}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1 text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                <IndianRupee size={14} /> {plan.price.toLocaleString()}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{plan.duration}</td>
                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{plan.members}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${plan.status === "Active" ? "bg-green-500 text-white" : "bg-[#778387] text-white"}`}>
                                                {plan.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button onClick={() => openEditModal(plan)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition">
                                                    <Edit size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(plan.id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPlans.length === 0 && <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No premium plans found.</div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">{editingPlan ? "Edit Premium Plan" : "Add New Premium Plan"}</h2>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">Add premium membership details below</p>
                            </div>

                            <button onClick={() => setShowModal(false)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FB] dark:hover:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA]">
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Plan Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter plan name" required className="form-input" />
                                </div>

                                <div>
                                    <label className="form-label">Price</label>
                                    <div className="relative">
                                        {/* <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" /> */}
                                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" min="0" required className="form-input pl-9" />
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">Duration</label>
                                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3 Months" required className="form-input" />
                                </div>

                                <div>
                                    <label className="form-label">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Write a short description..." rows="4" required className="form-input resize-none" />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]">
                                    {editingPlan ? "Update Plan" : "Add Plan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
          background: #fff;
          color: #1F272B;
          font-size: .875rem;
          outline: none;
        }
        .form-input:focus {
          border-color: #3420FF;
        }
        .form-input::placeholder {
          color: #778387;
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
        .dark .form-input option {
          background: #12181B;
          color: #F4F6F7;
        }
      `}</style>
        </div>
    );
};

export default AdPremium;

