import React, { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    X,
    Crown,
    CheckCircle,
    IndianRupee,
    Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan,
    clearPlanError,
    clearPlanSuccess,
} from "../../redux/Slicer/planSlice";

const AdPremium = () => {
    const dispatch = useDispatch();

    const {
        plans,
        loading,
        error,
        success,
        message,
    } = useSelector((state) => state.plans);

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        popular: false,
        features: [""],
        isActive: true,
    });

    // ============================
    // GET PLANS
    // ============================
    useEffect(() => {
        dispatch(getPlans());
    }, [dispatch]);

    // ============================
    // SUCCESS MESSAGE
    // ============================
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(clearPlanSuccess());
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    // ============================
    // SEARCH
    // ============================
    const filteredPlans = plans.filter((plan) =>
        plan.name.toLowerCase().includes(search.toLowerCase())
    );

    // ============================
    // FORM CHANGE
    // ============================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ============================
    // FEATURE CHANGE
    // ============================
    const handleFeatureChange = (index, value) => {
        setFormData((prev) => {
            const features = [...prev.features];
            features[index] = value;

            return {
                ...prev,
                features,
            };
        });
    };

    // ============================
    // ADD FEATURE
    // ============================
    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    };

    // ============================
    // REMOVE FEATURE
    // ============================
    const removeFeature = (index) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    // ============================
    // OPEN ADD MODAL
    // ============================
    const openAddModal = () => {
        dispatch(clearPlanError());
        dispatch(clearPlanSuccess());

        setEditingPlan(null);

        setFormData({
            name: "",
            price: "",
            popular: false,
            features: [""],
            isActive: true,
        });

        setShowModal(true);
    };

    // ============================
    // OPEN EDIT MODAL
    // ============================
    const openEditModal = (plan) => {
        dispatch(clearPlanError());
        dispatch(clearPlanSuccess());

        setEditingPlan(plan);

        setFormData({
            name: plan.name || "",
            price: plan.price || "",
            popular: plan.popular || false,
            features:
                plan.features?.length > 0
                    ? [...plan.features]
                    : [""],
            isActive: plan.isActive ?? true,
        });

        setShowModal(true);
    };

    // ============================
    // SUBMIT
    // ============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const planData = {
            name: formData.name.trim(),
            price: Number(formData.price),
            popular: formData.popular,
            features: formData.features
                .map((feature) => feature.trim())
                .filter(Boolean),
            isActive: formData.isActive,
        };

        let result;

        if (editingPlan) {
            result = await dispatch(
                updatePlan({
                    id: editingPlan._id,
                    planData,
                })
            );
        } else {
            result = await dispatch(createPlan(planData));
        }

        if (
            createPlan.fulfilled.match(result) ||
            updatePlan.fulfilled.match(result)
        ) {
            setShowModal(false);
            setEditingPlan(null);
        }
    };

    // ============================
    // DELETE
    // ============================
    const handleDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to delete this premium plan?"
            )
        ) {
            await dispatch(deletePlan(id));
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div>
                {/* ================= HEADER ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Premium Plans
                        </h1>

                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage premium membership plans and subscriptions
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition"
                    >
                        <Plus size={18} />
                        Add Premium Plan
                    </button>
                </div>

                {/* ================= SUCCESS ================= */}
                {success && message && (
                    <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                        <CheckCircle size={17} />
                        {message}
                    </div>
                )}

                {/* ================= ERROR ================= */}
                {error && (
                    <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        <span>{error}</span>

                        <button
                            onClick={() => dispatch(clearPlanError())}
                            className="text-xs underline"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* ================= STATS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Total Plans */}
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    Total Plans
                                </p>

                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                                    {plans.length}
                                </h3>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <Crown size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Active Plans */}
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    Active Plans
                                </p>

                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                                    {
                                        plans.filter(
                                            (plan) => plan.isActive
                                        ).length
                                    }
                                </h3>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SEARCH ================= */}
                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="relative max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                        />

                        <input
                            type="text"
                            placeholder="Search premium plans..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                        />
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Crown
                            size={19}
                            className="text-yellow-500"
                        />

                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Premium Membership Plans
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Plan
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Price
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Features
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Popular
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-12 text-sm text-[#778387]"
                                        >
                                            Loading plans...
                                        </td>
                                    </tr>
                                )}

                                {!loading &&
                                    filteredPlans.map((plan) => (
                                        <tr
                                            key={plan._id}
                                            className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition"
                                        >
                                            {/* PLAN */}
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                    {plan.name}
                                                </p>

                                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                                    {plan.features?.length || 0}{" "}
                                                    features
                                                </p>
                                            </td>

                                            {/* PRICE */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1 text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                    <IndianRupee size={14} />
                                                    {Number(
                                                        plan.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </div>
                                            </td>

                                            {/* FEATURES */}
                                            <td className="px-5 py-4">
                                                <div className="max-w-[300px] flex flex-wrap gap-1">
                                                    {plan.features
                                                        ?.slice(0, 3)
                                                        .map(
                                                            (
                                                                feature,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="px-2 py-1 rounded-md bg-[#F1F3F4] dark:bg-white/5 text-[11px] text-[#606E6E] dark:text-[#AEB7BA]"
                                                                >
                                                                    {
                                                                        feature
                                                                    }
                                                                </span>
                                                            )
                                                        )}

                                                    {plan.features?.length >
                                                        3 && (
                                                        <span className="px-2 py-1 rounded-md bg-[#F1F3F4] dark:bg-white/5 text-[11px] text-[#606E6E] dark:text-[#AEB7BA]">
                                                            +
                                                            {plan.features
                                                                .length -
                                                                3}{" "}
                                                            more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* POPULAR */}
                                            <td className="px-5 py-4">
                                                {plan.popular ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                                                        <Crown
                                                            size={12}
                                                        />
                                                        Popular
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-[#778387]">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        plan.isActive
                                                            ? "bg-green-500 text-white"
                                                            : "bg-[#778387] text-white"
                                                    }`}
                                                >
                                                    {plan.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                plan
                                                            )
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                                                    >
                                                        <Edit size={15} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                plan._id
                                                            )
                                                        }
                                                        disabled={loading}
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition disabled:opacity-50"
                                                    >
                                                        <Trash2
                                                            size={15}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {!loading &&
                        filteredPlans.length === 0 && (
                            <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">
                                No premium plans found.
                            </div>
                        )}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {editingPlan
                                        ? "Edit Premium Plan"
                                        : "Add New Premium Plan"}
                                </h2>

                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                    Add premium membership details below
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FB] dark:hover:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA]"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-5 space-y-5"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* NAME */}
                                <div>
                                    <label className="form-label">
                                        Plan Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Premium Monthly"
                                        required
                                        className="form-input"
                                    />
                                </div>

                                {/* PRICE */}
                                <div>
                                    <label className="form-label">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        min="0"
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* FEATURES */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="form-label !mb-0">
                                        Features
                                    </label>

                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="text-xs font-medium text-[#3420FF] hover:underline"
                                    >
                                        + Add Feature
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {formData.features.map(
                                        (feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="relative flex-1">
                                                    <Check
                                                        size={14}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
                                                    />

                                                    <input
                                                        type="text"
                                                        value={
                                                            feature
                                                        }
                                                        onChange={(e) =>
                                                            handleFeatureChange(
                                                                index,
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="Enter plan feature"
                                                        className="form-input pl-9"
                                                    />
                                                </div>

                                                {formData.features
                                                    .length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFeature(
                                                                index
                                                            )
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500"
                                                    >
                                                        <X size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* POPULAR + ACTIVE */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="popular"
                                        checked={formData.popular}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-[#3420FF]"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                            Popular Plan
                                        </p>

                                        <p className="text-xs text-[#778387]">
                                            Mark as most popular
                                        </p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-[#3420FF]"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                            Active Plan
                                        </p>

                                        <p className="text-xs text-[#778387]">
                                            Show this plan on website
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] disabled:opacity-60"
                                >
                                    {loading
                                        ? "Saving..."
                                        : editingPlan
                                        ? "Update Plan"
                                        : "Add Plan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= FORM CSS ================= */}
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