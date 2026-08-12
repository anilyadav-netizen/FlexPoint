import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Dumbbell, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import image1 from "../../assets/Images/image1.jpg";
import image2 from "../../assets/Images/image2.jpg";
import image3 from "../../assets/Images/image3.jpg";
import image4 from "../../assets/Images/image4.jpg";
import image5 from "../../assets/Images/image5.jpg";
import image6 from "../../assets/Images/image6.jpg";

const initialPrograms = [
    { id: 1, title: "STRENGTH", subtitle: "TRAINING", description: "Build muscle, increase strength", image: image1, members: 86, status: "Active" },
    { id: 2, title: "HIIT &", subtitle: "CARDIO", description: "Burn fat & improve endurance", image: image2, members: 72, status: "Active" },
    { id: 3, title: "YOGA &", subtitle: "FLEXIBILITY", description: "Improve flexibility & reduce stress", image: image3, members: 64, status: "Active" },
    { id: 4, title: "FUNCTIONAL", subtitle: "TRAINING", description: "Train for everyday performance", image: image4, members: 58, status: "Active" },
    { id: 5, title: "GROUP", subtitle: "CLASSES", description: "Fun & effective workouts", image: image5, members: 91, status: "Active" },
    { id: 6, title: "PILATES &", subtitle: "CORE", description: "Strengthen core & improve posture", image: image6, members: 47, status: "Active" },
];

const AdProgram = () => {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState(initialPrograms);
    const [search, setSearch] = useState("");

    const filteredPrograms = programs.filter((program) =>
        `${program.title} ${program.subtitle} ${program.description}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this program?")) {
            setPrograms(programs.filter((program) => program.id !== id));
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Programs</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage all fitness programs</p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/addprogram")}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3420FF] text-white rounded-lg text-sm font-medium hover:bg-[#2818D9] transition"
                    >
                        <Plus size={17} />
                        Add Program
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">Total Programs</p>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">{programs.length}</h2>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]"><Dumbbell size={19} /></div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">Active Programs</p>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">{programs.filter((program) => program.status === "Active").length}</h2>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]"><CheckCircle size={19} /></div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">Total Members</p>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">{programs.reduce((sum, program) => sum + program.members, 0)}</h2>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#FFF8E8] flex items-center justify-center text-[#E7B84B]"><Users size={19} /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <div className="relative max-w-sm">
                            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                            <input
                                type="text"
                                placeholder="Search program..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#9AA3A6] outline-none focus:border-[#3420FF]"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-[#F8F9FB] dark:bg-[#1C2529]">
                                <tr className="text-left">
                                    <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">Program</th>
                                    <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">Description</th>
                                    <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">Members</th>
                                    <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredPrograms.map((program) => (
                                    <tr key={program.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={program.image} alt={program.title} className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-[#1F272B] dark:text-[#F4F6F7]">{program.title}</p>
                                                    <p className="text-xs font-medium text-[#3420FF] mt-0.5">{program.subtitle}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{program.description}</td>
                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{program.members}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${program.status === "Active" ? "bg-[#ECFBF5] text-[#38C79A]" : "bg-[#FFF0F0] text-[#E05252]"}`}>
                                                {program.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 rounded-lg bg-[#FFF8E8] text-[#E7B84B] hover:bg-[#FFF1C7] transition">
                                                    <Edit size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(program.id)} className="p-2 rounded-lg bg-[#FFF0F0] text-[#E05252] hover:bg-[#FFE0E0] transition">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPrograms.length === 0 && <div className="text-center py-16 text-[#606E6E] dark:text-[#AEB7BA]">No programs found.</div>}
                </div>
            </div>
        </div>
    );
};

export default AdProgram;