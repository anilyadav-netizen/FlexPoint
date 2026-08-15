import React, { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    FileText,
    RefreshCw,
    X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBlogs, deleteBlog } from "../../redux/Slicer/blogSlice";
import { getPrograms } from "../../redux/Slicer/programSlice";

const AdBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { blogs, loading, error } = useSelector(
        (state) => state.blog
    );

    const { program } = useSelector(
        (state) => state.program
    );

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // VIEW MODAL
    const [selectedBlog, setSelectedBlog] = useState(null);

    // ============================
    // GET BLOGS + PROGRAMS
    // ============================
    useEffect(() => {
        dispatch(getBlogs());
        dispatch(getPrograms());
    }, [dispatch]);

    // ============================
    // SAFETY
    // ============================
    const blogList = Array.isArray(blogs) ? blogs : [];
    const programList = Array.isArray(program) ? program : [];

    // ============================
    // DYNAMIC CATEGORIES
    // ============================
    const categories = [
        "All",
        ...programList
            .map((item) => item.title)
            .filter(Boolean)
            .filter(
                (title, index, array) =>
                    array.indexOf(title) === index
            ),
    ];

    // ============================
    // FILTER BLOGS
    // ============================
    const filteredBlogs = blogList.filter((blog) => {
        const matchesSearch =
            `${blog.title || ""} ${blog.category || ""} ${
                blog.description || ""
            }`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" ||
            blog.category?.toLowerCase() ===
                categoryFilter.toLowerCase();

        const blogStatus = blog.isPublished
            ? "Published"
            : "Draft";

        const matchesStatus =
            statusFilter === "All" ||
            blogStatus === statusFilter;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        );
    });

    // ============================
    // DELETE BLOG
    // ============================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteBlog(id)).unwrap();

            toast.success("Blog deleted successfully!");

            dispatch(getBlogs());

            // Close modal if deleted blog was open
            if (selectedBlog?._id === id) {
                setSelectedBlog(null);
            }
        } catch (error) {
            console.error("Delete blog error:", error);

            toast.error(
                error?.message || "Failed to delete blog"
            );
        }
    };

    // ============================
    // REFRESH
    // ============================
    const handleRefresh = () => {
        dispatch(getBlogs());
        dispatch(getPrograms());

        toast.info("Blogs refreshed");
    };

    // ============================
    // CATEGORY CLASS
    // ============================
    const getCategoryClass = (category) => {
        const classes = [
            "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
            "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
            "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
            "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
            "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
            "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        ];

        if (!category) {
            return "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";
        }

        const index =
            categories.findIndex(
                (item) =>
                    item.toLowerCase() ===
                    category.toLowerCase()
            ) % classes.length;

        return (
            classes[index] ||
            "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
        );
    };

    // ============================
    // COUNTS
    // ============================
    const totalBlogs = blogList.length;

    const publishedBlogs = blogList.filter(
        (blog) => blog.isPublished === true
    ).length;

    const draftBlogs = blogList.filter(
        (blog) => blog.isPublished === false
    ).length;

    // ============================
    // DATE FORMAT
    // ============================
    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ============================
    // OPEN VIEW MODAL
    // ============================
    const handleView = (blog) => {
        setSelectedBlog(blog);
    };

    // ============================
    // CLOSE VIEW MODAL
    // ============================
    const closeViewModal = () => {
        setSelectedBlog(null);
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
            <div>

                {/* ============================
                    HEADER
                ============================ */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Blog Management
                        </h1>

                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage fitness blogs and educational content
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        {/* REFRESH */}
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F1F3F4] dark:hover:bg-white/5 transition disabled:opacity-50"
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

                        {/* ADD BLOG */}
                        <Link
                            to="/admin/addblogs"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-semibold hover:bg-[#2818D9] transition"
                        >
                            <Plus size={18} />
                            Add Blog
                        </Link>
                    </div>
                </div>

                {/* ============================
                    ERROR
                ============================ */}
                {error && (
                    <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* ============================
                    STATS
                ============================ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Total Blogs
                        </p>

                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {totalBlogs}
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Published
                        </p>

                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {publishedBlogs}
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Drafts
                        </p>

                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {draftBlogs}
                        </h3>
                    </div>
                </div>

                {/* ============================
                    FILTERS
                ============================ */}
                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-3">

                        {/* SEARCH */}
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                            />

                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                            />
                        </div>

                        {/* CATEGORY */}
                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                            className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                        >
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>

                        {/* STATUS */}
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="Published">
                                Published
                            </option>

                            <option value="Draft">
                                Draft
                            </option>
                        </select>
                    </div>
                </div>

                {/* ============================
                    BLOG TABLE
                ============================ */}
                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">

                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <FileText
                            size={19}
                            className="text-[#3420FF]"
                        />

                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Blog Posts
                        </h2>
                    </div>

                    {/* LOADING */}
                    {loading && blogList.length === 0 ? (
                        <div className="py-16 flex flex-col items-center justify-center">
                            <RefreshCw
                                size={28}
                                className="animate-spin text-[#3420FF] mb-3"
                            />

                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                Loading blogs...
                            </p>
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">
                            No blogs found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">

                                <thead>
                                    <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">

                                        <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                            Blog
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                            Category
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                            Read Time
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
                                    {filteredBlogs.map((blog) => (
                                        <tr
                                            key={blog._id}
                                            className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition"
                                        >

                                            {/* BLOG */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">

                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="w-14 h-12 rounded-lg object-cover"
                                                    />

                                                    <div className="max-w-[320px]">
                                                        <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7] line-clamp-1">
                                                            {blog.title}
                                                        </p>

                                                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1 line-clamp-1">
                                                            {blog.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* CATEGORY */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryClass(
                                                        blog.category
                                                    )}`}
                                                >
                                                    {blog.category}
                                                </span>
                                            </td>

                                            {/* READ TIME */}
                                            <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                {blog.readTime || "—"}
                                            </td>

                                            {/* DATE */}
                                            <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                {formatDate(
                                                    blog.date ||
                                                        blog.createdAt
                                                )}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        blog.isPublished
                                                            ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                                            : "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                    }`}
                                                >
                                                    {blog.isPublished
                                                        ? "Published"
                                                        : "Draft"}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end items-center gap-2">

                                                    {/* VIEW */}
                                                    <button
                                                        onClick={() =>
                                                            handleView(blog)
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                                                        title="View Blog"
                                                    >
                                                        <Eye size={15} />
                                                    </button>

                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/addblogs?edit=${blog._id}`
                                                            )
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                                                        title="Edit Blog"
                                                    >
                                                        <Edit size={15} />
                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                blog._id
                                                            )
                                                        }
                                                        disabled={loading}
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition disabled:opacity-50"
                                                        title="Delete Blog"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* =====================================================
                VIEW BLOG MODAL
            ===================================================== */}
            {selectedBlog && (
                <div
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeViewModal}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-[#1C2529] rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div className="min-w-0 pr-4">
                                <h2 className="text-lg sm:text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] truncate">
                                    Blog Preview
                                </h2>

                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                    View complete blog information
                                </p>
                            </div>

                            <button
                                onClick={closeViewModal}
                                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* MODAL CONTENT */}
                        <div className="overflow-y-auto max-h-[calc(90vh-75px)]">

                            {/* IMAGE */}
                            <div className="w-full h-56 sm:h-72 md:h-80 bg-[#F1F3F4] dark:bg-[#12181B]">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-5 sm:p-7">

                                {/* CATEGORY + STATUS */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryClass(
                                            selectedBlog.category
                                        )}`}
                                    >
                                        {selectedBlog.category}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            selectedBlog.isPublished
                                                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                                : "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                                        }`}
                                    >
                                        {selectedBlog.isPublished
                                            ? "Published"
                                            : "Draft"}
                                    </span>
                                </div>

                                {/* TITLE */}
                                <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-[#1F272B] dark:text-[#F4F6F7]">
                                    {selectedBlog.title}
                                </h1>

                                {/* META */}
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    <span>
                                        Read time:{" "}
                                        <strong className="text-[#1F272B] dark:text-[#F4F6F7]">
                                            {selectedBlog.readTime || "—"}
                                        </strong>
                                    </span>

                                    <span>
                                        Published:{" "}
                                        <strong className="text-[#1F272B] dark:text-[#F4F6F7]">
                                            {formatDate(
                                                selectedBlog.date ||
                                                    selectedBlog.createdAt
                                            )}
                                        </strong>
                                    </span>
                                </div>

                                {/* DESCRIPTION */}
                                <div className="mt-6 p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                                    <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7] mb-2">
                                        Short Description
                                    </p>

                                    <p className="text-sm leading-6 text-[#606E6E] dark:text-[#AEB7BA]">
                                        {selectedBlog.description}
                                    </p>
                                </div>

                                {/* CONTENT */}
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7] mb-3">
                                        Blog Content
                                    </h3>

                                    <div className="text-sm sm:text-base leading-7 whitespace-pre-wrap text-[#606E6E] dark:text-[#C5CCCF]">
                                        {selectedBlog.content}
                                    </div>
                                </div>

                                {/* SLUG */}
                                {selectedBlog.slug && (
                                    <div className="mt-6 pt-5 border-t border-[#E7EAED] dark:border-[#303A3F]">
                                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                                            Slug
                                        </p>

                                        <p className="text-sm text-[#1F272B] dark:text-[#F4F6F7] mt-1 break-all">
                                            {selectedBlog.slug}
                                        </p>
                                    </div>
                                )}

                                {/* MODAL ACTIONS */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-7 pt-5 border-t border-[#E7EAED] dark:border-[#303A3F]">

                                    <button
                                        onClick={closeViewModal}
                                        className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5"
                                    >
                                        Close
                                    </button>

                                    <button
                                        onClick={() => {
                                            const id =
                                                selectedBlog._id;

                                            closeViewModal();

                                            navigate(
                                                `/admin/addblogs?edit=${id}`
                                            );
                                        }}
                                        className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]"
                                    >
                                        Edit Blog
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdBlog;