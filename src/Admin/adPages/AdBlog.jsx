
import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const initialBlogs = [
    {
        id: 1,
        title: "5 Essential Strength Training Tips for Beginners",
        category: "Strength Training",
        author: "Admin",
        date: "11 Aug 2026",
        status: "Published",
        description: "Learn the essential strength training techniques every beginner should know.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800",
    },
    {
        id: 2,
        title: "Benefits of HIIT Cardio Workouts",
        category: "HIIT & Cardio",
        author: "Admin",
        date: "09 Aug 2026",
        status: "Published",
        description: "Discover how high intensity interval training can improve your fitness.",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800",
    },
    {
        id: 3,
        title: "How Yoga Improves Flexibility and Balance",
        category: "Yoga & Flexibility",
        author: "Admin",
        date: "07 Aug 2026",
        status: "Draft",
        description: "Explore the benefits of regular yoga practice for flexibility and balance.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    },
    {
        id: 4,
        title: "Why Zumba Is Great for Your Fitness",
        category: "Zumba",
        author: "Admin",
        date: "05 Aug 2026",
        status: "Published",
        description: "A fun and energetic way to burn calories and stay active.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    },
];

const AdBlog = () => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const categories = [
        "All",
        "Strength Training",
        "HIIT & Cardio",
        "Yoga & Flexibility",
        "CrossFit",
        "Zumba",
        "Pilates",
    ];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = `${blog.title} ${blog.category} ${blog.author}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" || blog.category === categoryFilter;

        const matchesStatus =
            statusFilter === "All" || blog.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            setBlogs(blogs.filter((blog) => blog.id !== id));
        }
    };

    const getCategoryClass = (category) => {
        const classes = {
            "Strength Training":
                "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
            "HIIT & Cardio":
                "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
            "Yoga & Flexibility":
                "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
            CrossFit:
                "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
            Zumba:
                "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
            Pilates:
                "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        };

        return (
            classes[category] ||
            "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
        );
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            Blog Management
                        </h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage fitness blogs and educational content
                        </p>
                    </div>

                    <Link
                        to="/admin/addblogs"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-semibold hover:bg-[#2818D9] transition"
                    >
                        <Plus size={18} />
                        Add Blog
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Total Blogs
                        </p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {blogs.length}
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Published
                        </p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {blogs.filter((blog) => blog.status === "Published").length}
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Drafts
                        </p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {blogs.filter((blog) => blog.status === "Draft").length}
                        </h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                            />

                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                            />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                        >
                            <option value="All">All Status</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <FileText size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Blog Posts
                        </h2>
                    </div>

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
                                        Author
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
                                        key={blog.id}
                                        className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition"
                                    >
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

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryClass(
                                                    blog.category
                                                )}`}
                                            >
                                                {blog.category}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                            {blog.author}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                            {blog.date}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    blog.status === "Published"
                                                        ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                                        : "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                }`}
                                            >
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                                                    title="View Blog"
                                                >
                                                    <Eye size={15} />
                                                </button>

                                                <button
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition"
                                                    title="Edit Blog"
                                                >
                                                    <Edit size={15} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition"
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

                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">
                            No blogs found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdBlog;
