
import React, { useState } from "react";
import { Plus, Search, Trash2, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const initialReviews = [
    { id: 1, name: "Rahul Sharma", program: "Strength Training", rating: 5, review: "Amazing training experience. The workouts are well planned and effective.", date: "11 Aug 2026", status: "Published" },
    { id: 2, name: "Priya Singh", program: "Yoga & Flexibility", rating: 5, review: "The yoga sessions are peaceful and really helped improve my flexibility.", date: "10 Aug 2026", status: "Published" },
    { id: 3, name: "Amit Kumar", program: "HIIT & Cardio", rating: 4, review: "Great high intensity sessions. Trainers are very supportive.", date: "09 Aug 2026", status: "Published" },
    { id: 4, name: "Neha Verma", program: "Zumba", rating: 5, review: "Very energetic classes. I really enjoy every Zumba session.", date: "08 Aug 2026", status: "Pending" },
];

const Testimonials = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [search, setSearch] = useState("");
    const [programFilter, setProgramFilter] = useState("All");

    const programs = ["All", "Strength Training", "HIIT & Cardio", "Yoga & Flexibility", "CrossFit", "Zumba", "Pilates"];

    const filteredReviews = reviews.filter((item) => {
        const matchesSearch = `${item.name} ${item.review} ${item.program}`.toLowerCase().includes(search.toLowerCase());
        const matchesProgram = programFilter === "All" || item.program === programFilter;
        return matchesSearch && matchesProgram;
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            setReviews(reviews.filter((item) => item.id !== id));
        }
    };

    const getProgramClass = (program) => {
        const classes = {
            "Strength Training": "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
            "HIIT & Cardio": "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
            "Yoga & Flexibility": "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
            CrossFit: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
            Zumba: "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
            Pilates: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
        };
        return classes[program] || "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Program Reviews</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage customer reviews and ratings for each fitness program</p>
                    </div>

                    <Link to="/admin/addreview" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-semibold hover:bg-[#2818D9] transition">
                        <Plus size={18} /> Add Review
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Reviews</p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{reviews.length}</h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Average Rating</p>
                        <h3 className="flex items-center gap-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                            {reviews.length ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1) : "0.0"}
                            <Star size={19} className="fill-yellow-400 text-yellow-400" />
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Published Reviews</p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{reviews.filter((item) => item.status === "Published").length}</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                            />
                        </div>

                        <select
                            value={programFilter}
                            onChange={(e) => setProgramFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]"
                        >
                            {programs.map((program) => <option key={program}>{program}</option>)}
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <MessageSquare size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Program Reviews</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Member</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Program</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Rating</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Review</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Date</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredReviews.map((item) => (
                                    <tr key={item.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{item.name}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getProgramClass(item.program)}`}>
                                                {item.program}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} size={14} className={star <= item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 max-w-[300px]">
                                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] truncate">{item.review}</p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.date}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === "Published" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end items-center">
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
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

                    {filteredReviews.length === 0 && <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No reviews found.</div>}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
