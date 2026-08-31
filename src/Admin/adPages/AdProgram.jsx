import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Dumbbell,
    CheckCircle,
    Users,
    RefreshCw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getPrograms,
    deleteProgram,
    clearProgramError,
} from "../../redux/Slicer/programSlice";

const AdProgram = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // =====================================================
    // REDUX STATE
    // IMPORTANT:
    // programSlice me field "programs" hai, "program" nahi
    // =====================================================
    const {
        programs,
        loading,
        error,
    } = useSelector((state) => state.program);

    const [search, setSearch] = useState("");

    // =====================================================
    // GET ALL PROGRAMS
    // =====================================================
    useEffect(() => {
        dispatch(getPrograms());
    }, [dispatch]);

    // =====================================================
    // SAFETY
    // =====================================================
    const programList = Array.isArray(programs) ? programs : [];

    // =====================================================
    // SEARCH
    // =====================================================
    const filteredPrograms = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        if (!searchValue) {
            return programList;
        }

        return programList.filter((item) => {
            const searchableText = `
                ${item?.title || ""}
                ${item?.subtitle || ""}
                ${item?.description || ""}
                ${item?.icon || ""}
                ${item?.isActive ? "active" : "inactive"}
            `.toLowerCase();

            return searchableText.includes(searchValue);
        });
    }, [programList, search]);

    // =====================================================
    // DELETE PROGRAM
    // =====================================================
    const handleDelete = async (id) => {
        if (!id) {
            console.error("Program ID is missing");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this program?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteProgram(id)).unwrap();

            // Redux already removes the deleted item.
            // Fresh API data is not required here.
        } catch (error) {
            console.error("Delete program error:", error);
        }
    };

    // =====================================================
    // REFRESH
    // =====================================================
    const handleRefresh = () => {
        dispatch(getPrograms());
    };

    // =====================================================
    // COUNTS
    // =====================================================
    const totalPrograms = programList.length;

    const activePrograms = programList.filter(
        (item) =>
            item?.isActive === true ||
            item?.isActive === "true"
    ).length;

    // Program model me members field nahi hai
    const totalMembers = 0;

    // =====================================================
    // EDIT
    // =====================================================
    const handleEdit = (id) => {
        if (!id) return;

        navigate(`/admin/addprogram?edit=${id}`);
    };

    // =====================================================
    // IMAGE ERROR
    // =====================================================
    const handleImageError = (e) => {
        e.currentTarget.style.display = "none";

        const parent = e.currentTarget.parentElement;

        if (parent) {
            const fallback = parent.querySelector(
                ".program-image-fallback"
            );

            if (fallback) {
                fallback.classList.remove("hidden");
            }
        }
    };

    // =====================================================
    // DATE FORMAT
    // =====================================================
    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Programs
                        </h1>

                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage all fitness programs
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        {/* Refresh */}
                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={loading}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F1F3F4] dark:hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Refresh"
                        >
                            <RefreshCw
                                size={17}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />
                        </button>

                        {/* Add Program */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/addprogram")
                            }
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3420FF] text-white rounded-lg text-sm font-medium hover:bg-[#2818D9] transition"
                        >
                            <Plus size={17} />
                            Add Program
                        </button>
                    </div>
                </div>

                {/* =====================================================
                    ERROR
                ===================================================== */}
                {error && (
                    <div className="flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() =>
                                dispatch(clearProgramError())
                            }
                            className="text-xs font-semibold hover:underline"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* =====================================================
                    STATS
                ===================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

                    {/* Total Programs */}
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                    Total Programs
                                </p>

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                    {totalPrograms}
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
                                <Dumbbell size={19} />
                            </div>
                        </div>
                    </div>

                    {/* Active Programs */}
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                    Active Programs
                                </p>

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                    {activePrograms}
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]">
                                <CheckCircle size={19} />
                            </div>
                        </div>
                    </div>

                    {/* Total Members */}
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                    Total Members
                                </p>

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                    {totalMembers}
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-[#FFF8E8] flex items-center justify-center text-[#E7B84B]">
                                <Users size={19} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    TABLE CONTAINER
                ===================================================== */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm overflow-hidden">

                    {/* =================================================
                        SEARCH
                    ================================================= */}
                    <div className="p-4 sm:p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">

                        <div className="relative max-w-sm">

                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                            />

                            <input
                                type="text"
                                placeholder="Search program..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#9AA3A6] outline-none focus:border-[#3420FF]"
                            />
                        </div>
                    </div>

                    {/* =================================================
                        LOADING
                    ================================================= */}
                    {loading && programList.length === 0 ? (
                        <div className="py-16 flex flex-col items-center justify-center">

                            <RefreshCw
                                size={28}
                                className="animate-spin text-[#3420FF] mb-3"
                            />

                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                Loading programs...
                            </p>
                        </div>
                    ) : filteredPrograms.length === 0 ? (

                        /* =================================================
                            EMPTY STATE
                        ================================================= */
                        <div className="py-16 text-center">

                            <div className="w-12 h-12 mx-auto rounded-xl bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF] mb-3">
                                <Dumbbell size={22} />
                            </div>

                            <h3 className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                {search
                                    ? "No programs found"
                                    : "No programs available"}
                            </h3>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                {search
                                    ? "Try searching with another keyword."
                                    : "Create your first fitness program."}
                            </p>

                            {!search && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/admin/addprogram"
                                        )
                                    }
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#3420FF] text-white rounded-lg text-xs font-medium hover:bg-[#2818D9] transition"
                                >
                                    <Plus size={15} />
                                    Add Program
                                </button>
                            )}
                        </div>
                    ) : (

                        /* =================================================
                            PROGRAM TABLE
                        ================================================= */
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1050px]">

                                <thead className="bg-[#F8F9FB] dark:bg-[#1C2529]">

                                    <tr className="text-left">

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Program
                                        </th>

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Description
                                        </th>

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Icon
                                        </th>

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Status
                                        </th>

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Created
                                        </th>

                                        <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredPrograms.map(
                                        (item) => (
                                            <tr
                                                key={item?._id}
                                                className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                                            >

                                                {/* =================================================
                                                    PROGRAM
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        {/* Image */}
                                                        <div className="relative w-10 h-10 flex-shrink-0">

                                                            {item?.image ? (
                                                                <img
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.title ||
                                                                        "Program"
                                                                    }
                                                                    className="w-10 h-10 rounded-md object-cover border border-[#E2E6E8] dark:border-[#303A3F]"
                                                                    onError={
                                                                        handleImageError
                                                                    }
                                                                />
                                                            ) : null}

                                                            {/* Fallback */}
                                                            <div
                                                                className={`program-image-fallback ${
                                                                    item?.image
                                                                        ? "hidden"
                                                                        : ""
                                                                } w-10 h-10 rounded-md bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]`}
                                                            >
                                                                <Dumbbell
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Name */}
                                                        <div className="min-w-0">

                                                            <p className="text-sm font-bold text-[#1F272B] dark:text-[#F4F6F7] truncate max-w-[220px]">
                                                                {item?.title ||
                                                                    "Untitled Program"}
                                                            </p>

                                                            <p className="text-xs font-medium text-[#3420FF] mt-0.5 truncate max-w-[220px]">
                                                                {item?.subtitle ||
                                                                    "No subtitle"}
                                                            </p>

                                                        </div>

                                                    </div>
                                                </td>

                                                {/* =================================================
                                                    DESCRIPTION
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] max-w-[300px] truncate">
                                                        {item?.description ||
                                                            "No description"}
                                                    </p>

                                                </td>

                                                {/* =================================================
                                                    ICON
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <span className="inline-flex px-2.5 py-1 rounded-md bg-[#F5F7F9] dark:bg-[#12181B] border border-[#E2E6E8] dark:border-[#303A3F] text-xs font-medium text-[#606E6E] dark:text-[#AEB7BA]">
                                                        {item?.icon ||
                                                            "—"}
                                                    </span>

                                                </td>

                                                {/* =================================================
                                                    STATUS
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                                            item?.isActive ===
                                                                true ||
                                                            item?.isActive ===
                                                                "true"
                                                                ? "bg-[#ECFBF5] text-[#38C79A]"
                                                                : "bg-[#FFF0F0] text-[#E05252]"
                                                        }`}
                                                    >
                                                        {item?.isActive ===
                                                            true ||
                                                        item?.isActive ===
                                                            "true"
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>

                                                </td>

                                                {/* =================================================
                                                    CREATED
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <span className="text-xs text-[#606E6E] dark:text-[#AEB7BA]">
                                                        {formatDate(
                                                            item?.createdAt
                                                        )}
                                                    </span>

                                                </td>

                                                {/* =================================================
                                                    ACTIONS
                                                ================================================= */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-2">

                                                        {/* EDIT */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item?._id
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-[#FFF8E8] text-[#E7B84B] hover:bg-[#FFF1C7] transition"
                                                            title="Edit Program"
                                                        >
                                                            <Edit
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                        </button>

                                                        {/* DELETE */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item?._id
                                                                )
                                                            }
                                                            disabled={
                                                                loading
                                                            }
                                                            className="p-2 rounded-lg bg-[#FFF0F0] text-[#E05252] hover:bg-[#FFE0E0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Delete Program"
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
                                    )}

                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* =====================================================
                    RESULT INFO
                ===================================================== */}
                {programList.length > 0 && (
                    <div className="flex items-center justify-between mt-3 px-1">

                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                            Showing{" "}
                            <span className="font-semibold">
                                {filteredPrograms.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold">
                                {programList.length}
                            </span>{" "}
                            programs
                        </p>

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="text-xs text-[#3420FF] font-medium hover:underline"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdProgram;