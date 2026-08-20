import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Trash2,
    Star,
    MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    getTestimonials,
    deleteTestimonial,
    clearTestimonialError,
    clearTestimonialSuccess,
} from "../../redux/Slicer/testimonialSlice";

const Testimonials = () => {
    const dispatch = useDispatch();

    const {
        testimonials,
        loading,
        error,
        success,
    } = useSelector((state) => state.testimonial);

    const [search, setSearch] = useState("");

    // =====================================================
    // GET ALL TESTIMONIALS
    // =====================================================

    useEffect(() => {
        dispatch(getTestimonials());
    }, [dispatch]);

    // =====================================================
    // ERROR TOAST
    // =====================================================

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearTestimonialError());
        }
    }, [error, dispatch]);

    // =====================================================
    // SUCCESS TOAST
    // =====================================================

    useEffect(() => {
        if (success) {
            toast.success(success);
            dispatch(clearTestimonialSuccess());
        }
    }, [success, dispatch]);

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredTestimonials = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        if (!searchValue) {
            return testimonials;
        }

        return testimonials.filter((item) =>
            `${item.name || ""} ${item.role || ""} ${
                item.review || ""
            } ${item.initials || ""}`
                .toLowerCase()
                .includes(searchValue)
        );
    }, [testimonials, search]);

    // =====================================================
    // TOTAL REVIEWS
    // =====================================================

    const totalReviews = testimonials.length;

    // =====================================================
    // AVERAGE RATING
    // =====================================================

    const averageRating =
        testimonials.length > 0
            ? (
                  testimonials.reduce(
                      (sum, item) =>
                          sum + Number(item.rating || 0),
                      0
                  ) / testimonials.length
              ).toFixed(1)
            : "0.0";

    // =====================================================
    // PUBLISHED REVIEWS
    // =====================================================

    const publishedReviews = testimonials.filter(
        (item) => item.status === true
    ).length;

    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await dispatch(deleteTestimonial(id)).unwrap();
        } catch (error) {
            toast.error(
                error || "Failed to delete testimonial"
            );
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div>
                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Testimonials
                        </h1>

                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage customer reviews and ratings
                        </p>
                    </div>

                    <Link
                        to="/admin/addreview"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-semibold hover:bg-[#2818D9] transition"
                    >
                        <Plus size={18} />
                        Add Review
                    </Link>
                </div>

                {/* =================================================
                    STATS
                ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* TOTAL */}

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Total Reviews
                        </p>

                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {totalReviews}
                        </h3>
                    </div>

                    {/* AVERAGE */}

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Average Rating
                        </p>

                        <h3 className="flex items-center gap-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {averageRating}

                            <Star
                                size={19}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        </h3>
                    </div>

                    {/* PUBLISHED */}

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Published Reviews
                        </p>

                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {publishedReviews}
                        </h3>
                    </div>
                </div>

                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                        />

                        <input
                            type="text"
                            placeholder="Search testimonials..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                        />
                    </div>
                </div>

                {/* =================================================
                    TABLE
                ================================================= */}

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    {/* TABLE HEADER */}

                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <MessageSquare
                            size={19}
                            className="text-[#3420FF]"
                        />

                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Customer Testimonials
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Member
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Role
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Rating
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Review
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Date
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
                                {/* LOADING */}

                                {loading &&
                                testimonials.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-16 text-[#778387]"
                                        >
                                            Loading testimonials...
                                        </td>
                                    </tr>
                                ) : filteredTestimonials.length >
                                  0 ? (
                                    filteredTestimonials.map(
                                        (item) => (
                                            <tr
                                                key={item._id}
                                                className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition"
                                            >
                                                {/* MEMBER */}

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* IMAGE / INITIALS */}

                                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#3420FF]/10 text-[#3420FF] flex items-center justify-center font-semibold text-sm shrink-0">
                                                            {item.image ? (
                                                                <img
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name ||
                                                                        "Testimonial"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.style.display =
                                                                            "none";
                                                                        e.currentTarget.parentElement.classList.add(
                                                                            "bg-[#3420FF]/10"
                                                                        );
                                                                        e.currentTarget.parentElement.innerHTML =
                                                                            `<span>${(
                                                                                item.initials ||
                                                                                item.name
                                                                                    ?.slice(
                                                                                        0,
                                                                                        2
                                                                                    ) ||
                                                                                "U"
                                                                            ).toUpperCase()}</span>`;
                                                                    }}
                                                                />
                                                            ) : (
                                                                (
                                                                    item.initials ||
                                                                    item.name?.slice(
                                                                        0,
                                                                        2
                                                                    ) ||
                                                                    "U"
                                                                ).toUpperCase()
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                                {item.name ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* ROLE */}

                                                <td className="px-5 py-4">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                        {item.role ||
                                                            "-"}
                                                    </span>
                                                </td>

                                                {/* RATING */}

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1">
                                                        {[
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5,
                                                        ].map(
                                                            (
                                                                star
                                                            ) => (
                                                                <Star
                                                                    key={
                                                                        star
                                                                    }
                                                                    size={
                                                                        14
                                                                    }
                                                                    className={
                                                                        star <=
                                                                        Number(
                                                                            item.rating ||
                                                                                0
                                                                        )
                                                                            ? "fill-yellow-400 text-yellow-400"
                                                                            : "text-gray-300 dark:text-gray-600"
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </td>

                                                {/* REVIEW */}

                                                <td className="px-5 py-4 max-w-[300px]">
                                                    <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] truncate">
                                                        {item.review ||
                                                            "-"}
                                                    </p>
                                                </td>

                                                {/* DATE */}

                                                <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                    {formatDate(
                                                        item.createdAt
                                                    )}
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            item.status
                                                                ? "bg-green-500 text-white"
                                                                : "bg-yellow-500 text-white"
                                                        }`}
                                                    >
                                                        {item.status
                                                            ? "Published"
                                                            : "Inactive"}
                                                    </span>
                                                </td>

                                                {/* ACTIONS */}

                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item._id
                                                                )
                                                            }
                                                            disabled={
                                                                loading
                                                            }
                                                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 disabled:opacity-50"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]"
                                        >
                                            No testimonials
                                            found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;