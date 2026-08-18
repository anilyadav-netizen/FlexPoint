import React, { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Users,
    Crown,
    UserCheck,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../Api/Api";
import { getAllUsers } from "../../redux/Slicer/authSlice";

const Members = () => {
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(
        (state) => state.auth
    );

    const [search, setSearch] = useState("");

    // View modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    // Delete loading
    const [deleteLoading, setDeleteLoading] = useState(null);

    // ================= GET ALL USERS =================

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // ================= SEARCH =================

    const filteredUsers = users.filter((user) => {
        const searchValue = search.toLowerCase();

        return (
            user.name?.toLowerCase().includes(searchValue) ||
            user.email?.toLowerCase().includes(searchValue) ||
            user.role?.toLowerCase().includes(searchValue)
        );
    });

    // ================= STATS =================

    const totalMembers = users.length;

    const activeMembers = users.filter(
        (user) =>
            user.status?.toLowerCase() === "active" ||
            user.isActive === true
    ).length;

    const premiumMembers = users.filter(
        (user) =>
            user.plan?.toLowerCase() === "premium" ||
            user.membership?.toLowerCase() === "premium"
    ).length;

    // ================= DATE FORMAT =================

    const formatDate = (date) => {
        if (!date) return "—";

        const formattedDate = new Date(date);

        if (Number.isNaN(formattedDate.getTime())) {
            return "—";
        }

        return formattedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // ================= VIEW USER =================

    const handleView = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    // ================= EDIT USER =================

    const handleEdit = (user) => {
        setEditUser({
            ...user,
            name: user.name || "",
            email: user.email || "",
            role: user.role || "user",
            plan: user.plan || user.membership || "",
            trainer: user.trainer?.name || user.trainer || "",
            status:
                user.status ||
                (user.isActive === false ? "Inactive" : "Active"),
        });

        setShowEditModal(true);
    };

    // ================= UPDATE USER =================

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!editUser?.name?.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!editUser?.email?.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            setUpdateLoading(true);

            const userId = editUser._id || editUser.id;

            const updateData = {
                name: editUser.name,
                email: editUser.email,
                role: editUser.role,
                plan: editUser.plan,
                trainer: editUser.trainer,
                status: editUser.status,
                isActive: editUser.status === "Active",
            };

            await API.put(`/auth/users/${userId}`, updateData);

            toast.success("Member updated successfully");

            setShowEditModal(false);
            setEditUser(null);

            // Refresh users
            dispatch(getAllUsers());
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update member"
            );
        } finally {
            setUpdateLoading(false);
        }
    };

    // ================= DELETE USER =================

    const handleDelete = async (user) => {
        const userId = user._id || user.id;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleteLoading(userId);

            await API.delete(`/auth/users/${userId}`);

            toast.success("Member deleted successfully");

            // Refresh users
            dispatch(getAllUsers());
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete member"
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between gap-3 mb-5">

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Members
                    </h1>

                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                        Manage all gym members
                    </p>
                </div>

                <Link
                    to="/admin/addmembers"
                    className="flex items-center gap-2 shrink-0 px-4 py-2.5 bg-[#3420FF] text-white rounded-lg text-sm hover:bg-[#2818D9] transition"
                >
                    <Plus size={17} />
                    Add Member
                </Link>

            </div>

            {/* ================= STATS ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">

                {/* Total Members */}

                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition-all duration-300">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                Total Members
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                {totalMembers}
                            </h2>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
                            <Users size={19} />
                        </div>

                    </div>

                </div>

                {/* Premium Members */}

                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition-all duration-300">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                Premium Members
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                {premiumMembers}
                            </h2>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-[#FFF8E8] flex items-center justify-center text-[#E7B84B]">
                            <Crown size={19} />
                        </div>

                    </div>

                </div>

                {/* Active Members */}

                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition-all duration-300">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                Active Members
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                {activeMembers}
                            </h2>

                        </div>

                        <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]">
                            <UserCheck size={19} />
                        </div>

                    </div>

                </div>

            </div>

            {/* ================= TABLE ================= */}

            <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm overflow-hidden mt-4">

                {/* Search */}

                <div className="p-4 sm:p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">

                    <div className="relative max-w-sm">

                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                        />

                        <input
                            type="text"
                            placeholder="Search member..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#9AA3A6] outline-none focus:border-[#3420FF] transition"
                        />

                    </div>

                </div>

                {/* Error */}

                {error && (
                    <div className="px-5 py-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/20">
                        {error}
                    </div>
                )}

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                        <thead className="bg-[#F8F9FB] dark:bg-[#1C2529]">

                            <tr className="text-left">

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Member
                                </th>

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Plan
                                </th>

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Trainer
                                </th>

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Join Date
                                </th>

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Status
                                </th>

                                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {/* Loading */}

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-5 py-10 text-center text-sm text-[#778387] dark:text-[#AEB7BA]"
                                    >
                                        Loading members...
                                    </td>

                                </tr>

                            ) : filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-5 py-10 text-center text-sm text-[#778387] dark:text-[#AEB7BA]"
                                    >
                                        {search
                                            ? "No members found"
                                            : "No members registered yet"}
                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user) => {

                                    const userStatus =
                                        user.status ||
                                        (user.isActive === false
                                            ? "Inactive"
                                            : "Active");

                                    const userId =
                                        user._id || user.id;

                                    return (

                                        <tr
                                            key={userId}
                                            className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                                        >

                                            {/* MEMBER */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-full bg-[#EEF6FF] text-[#2679D1] flex items-center justify-center text-sm font-semibold">
                                                        {user.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "U"}
                                                    </div>

                                                    <div>

                                                        <span className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                                            {user.name || "Unknown User"}
                                                        </span>

                                                        <span className="block text-xs text-[#778387] dark:text-[#8F9A9E] mt-0.5">
                                                            {user.email || "—"}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* PLAN */}

                                            <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                {user.plan ||
                                                    user.membership ||
                                                    "—"}
                                            </td>

                                            {/* TRAINER */}

                                            <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                {user.trainer?.name ||
                                                    user.trainer ||
                                                    "—"}
                                            </td>

                                            {/* JOIN DATE */}

                                            <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                {formatDate(
                                                    user.createdAt ||
                                                    user.joinDate ||
                                                    user.join
                                                )}
                                            </td>

                                            {/* STATUS */}

                                            <td className="px-5 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        userStatus.toLowerCase() ===
                                                        "active"
                                                            ? "bg-[#ECFBF5] text-[#38C79A]"
                                                            : "bg-[#FFF0F0] text-[#E05252]"
                                                    }`}
                                                >
                                                    {userStatus}
                                                </span>

                                            </td>

                                            {/* ACTIONS */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-2">

                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(user)
                                                        }
                                                        className="p-2 rounded-lg bg-[#EEF6FF] text-[#2679D1] hover:bg-[#DCEEFF] transition"
                                                        title="View Member"
                                                    >
                                                        <Eye size={15} />
                                                    </button>

                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(user)
                                                        }
                                                        className="p-2 rounded-lg bg-[#FFF8E8] text-[#E7B84B] hover:bg-[#FFF1C7] transition"
                                                        title="Edit Member"
                                                    >
                                                        <Edit size={15} />
                                                    </button>

                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(user)
                                                        }
                                                        disabled={
                                                            deleteLoading ===
                                                            userId
                                                        }
                                                        className="p-2 rounded-lg bg-[#FFF0F0] text-[#E05252] hover:bg-[#FFE0E0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="Delete Member"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    );
                                })
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ================================================= */}
            {/* VIEW MEMBER MODAL */}
            {/* ================================================= */}

            {showViewModal && selectedUser && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowViewModal(false)}
                >

                    <div
                        className="w-full max-w-md bg-white dark:bg-[#1C2529] rounded-2xl shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">

                            <div>

                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    Member Details
                                </h2>

                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                    Complete member information
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowViewModal(false)
                                }
                                className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#273136] text-[#606E6E] dark:text-[#AEB7BA]"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Body */}

                        <div className="p-5">

                            <div className="flex items-center gap-4 mb-6">

                                <div className="w-14 h-14 rounded-full bg-[#EEF6FF] text-[#2679D1] flex items-center justify-center text-xl font-bold">
                                    {selectedUser.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                                <div>

                                    <h3 className="text-lg font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedUser.name || "Unknown User"}
                                    </h3>

                                    <p className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        {selectedUser.email || "—"}
                                    </p>

                                </div>

                            </div>

                            <div className="space-y-4">

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        User ID
                                    </span>

                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] break-all text-right">
                                        {selectedUser._id ||
                                            selectedUser.id ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        Role
                                    </span>

                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedUser.role || "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        Plan
                                    </span>

                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedUser.plan ||
                                            selectedUser.membership ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        Trainer
                                    </span>

                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedUser.trainer?.name ||
                                            selectedUser.trainer ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        Join Date
                                    </span>

                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {formatDate(
                                            selectedUser.createdAt
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">

                                    <span className="text-sm text-[#778387] dark:text-[#AEB7BA]">
                                        Status
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            (
                                                selectedUser.status ||
                                                "Active"
                                            ).toLowerCase() ===
                                            "active"
                                                ? "bg-[#ECFBF5] text-[#38C79A]"
                                                : "bg-[#FFF0F0] text-[#E05252]"
                                        }`}
                                    >
                                        {selectedUser.status ||
                                            (selectedUser.isActive === false
                                                ? "Inactive"
                                                : "Active")}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end p-5 border-t border-[#E7EAED] dark:border-[#303A3F]">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowViewModal(false)
                                }
                                className="px-4 py-2 rounded-lg bg-[#3420FF] text-white text-sm hover:bg-[#2818D9] transition"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* ================================================= */}
            {/* EDIT MEMBER MODAL */}
            {/* ================================================= */}

            {showEditModal && editUser && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => {
                        if (!updateLoading) {
                            setShowEditModal(false);
                        }
                    }}
                >

                    <div
                        className="w-full max-w-lg bg-white dark:bg-[#1C2529] rounded-2xl shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">

                            <div>

                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    Edit Member
                                </h2>

                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                    Update member information
                                </p>

                            </div>

                            <button
                                type="button"
                                disabled={updateLoading}
                                onClick={() =>
                                    setShowEditModal(false)
                                }
                                className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#273136] text-[#606E6E] dark:text-[#AEB7BA] disabled:opacity-50"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleUpdate}
                            className="p-5 space-y-4"
                        >

                            {/* Name */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={editUser.name}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                />

                            </div>

                            {/* Email */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                />

                            </div>

                            {/* Role */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Role
                                </label>

                                <select
                                    value={editUser.role}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                >
                                    <option value="user">
                                        User
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>

                                </select>

                            </div>

                            {/* Plan */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Plan
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Premium"
                                    value={editUser.plan}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            plan: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                />

                            </div>

                            {/* Trainer */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Trainer
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Amit"
                                    value={editUser.trainer}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            trainer: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                />

                            </div>

                            {/* Status */}

                            <div>

                                <label className="block text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mb-1.5">
                                    Status
                                </label>

                                <select
                                    value={editUser.status}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            status: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>

                            {/* Buttons */}

                            <div className="flex justify-end gap-3 pt-3">

                                <button
                                    type="button"
                                    disabled={updateLoading}
                                    onClick={() =>
                                        setShowEditModal(false)
                                    }
                                    className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F5F7F9] dark:hover:bg-[#273136] transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm hover:bg-[#2818D9] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updateLoading
                                        ? "Updating..."
                                        : "Update Member"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Members;