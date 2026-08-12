import React, { useState } from "react";
import { Search, TrendingUp, Users, Dumbbell, Target, Eye, X, Activity } from "lucide-react";

const initialProgress = [
    { id: 1, member: "Rahul Sharma", program: "Strength Training", trainer: "John Smith", weight: "72 kg", target: "68 kg", progress: 82, workouts: 28, attendance: 94, status: "Excellent" },
    { id: 2, member: "Priya Singh", program: "Yoga & Flexibility", trainer: "Sarah Wilson", weight: "61 kg", target: "58 kg", progress: 76, workouts: 24, attendance: 91, status: "Good" },
    { id: 3, member: "Amit Kumar", program: "HIIT & Cardio", trainer: "Mike Johnson", weight: "84 kg", target: "75 kg", progress: 64, workouts: 19, attendance: 82, status: "Good" },
    { id: 4, member: "Neha Verma", program: "Pilates", trainer: "Emma Davis", weight: "57 kg", target: "55 kg", progress: 88, workouts: 31, attendance: 96, status: "Excellent" },
    { id: 5, member: "Rohit Yadav", program: "CrossFit", trainer: "John Smith", weight: "79 kg", target: "72 kg", progress: 58, workouts: 16, attendance: 74, status: "Average" },
    { id: 6, member: "Anjali Gupta", program: "Strength Training", trainer: "John Smith", weight: "65 kg", target: "60 kg", progress: 71, workouts: 23, attendance: 88, status: "Good" },
];

const Progress = () => {
    const [progressData, setProgressData] = useState(initialProgress);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedMember, setSelectedMember] = useState(null);

    const filteredProgress = progressData.filter((item) => {
        const matchesSearch = `${item.member} ${item.program} ${item.trainer}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const averageProgress = Math.round(progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length);
    const totalWorkouts = progressData.reduce((sum, item) => sum + item.workouts, 0);
    const averageAttendance = Math.round(progressData.reduce((sum, item) => sum + item.attendance, 0) / progressData.length);
    const excellent = progressData.filter((item) => item.status === "Excellent").length;

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Progress</h1>
                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Monitor member fitness progress and performance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Average Progress</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{averageProgress}%</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Active Members</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{progressData.length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#EEF5FF] dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Users size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Workouts</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{totalWorkouts}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#FFF7E6] dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Dumbbell size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Avg. Attendance</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{averageAttendance}%</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <Target size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="relative w-full md:max-w-md">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                            <input type="text" placeholder="Search members, programs or trainers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]" />
                        </div>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-44 px-3 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]">
                            <option>All</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Average</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Activity size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Member Progress</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Member</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Program</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Weight</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Workouts</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Attendance</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Progress</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProgress.map((item) => (
                                    <tr key={item.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{item.member}</p>
                                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">{item.trainer}</p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.program}</td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{item.weight}</p>
                                            <p className="text-xs text-[#778387] mt-1">Target: {item.target}</p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.workouts}</td>
                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.attendance}%</td>

                                        <td className="px-5 py-4 min-w-[170px]">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs text-[#778387]">Progress</span>
                                                <span className="text-xs font-semibold text-[#3420FF]">{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-[#E9ECEF] dark:bg-[#303A3F] rounded-full overflow-hidden">
                                                <div className="h-full bg-[#3420FF] rounded-full transition-all" style={{ width: `${item.progress}%` }}></div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === "Excellent" ? "bg-green-500 text-white" : item.status === "Good" ? "bg-[#3420FF] text-white" : "bg-yellow-500 text-white"}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end">
                                                <button onClick={() => setSelectedMember(item)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition">
                                                    <Eye size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProgress.length === 0 && (
                        <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No progress records found.</div>
                    )}
                </div>
            </div>

            {selectedMember && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">Progress Details</h2>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">{selectedMember.member}</p>
                            </div>

                            <button onClick={() => setSelectedMember(null)} className="w-9 h-9 rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10">
                                <X size={18} className="mx-auto" />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#F8F9FB] dark:bg-[#12181B] rounded-lg p-4">
                                    <p className="text-xs text-[#778387]">Current Weight</p>
                                    <p className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{selectedMember.weight}</p>
                                </div>

                                <div className="bg-[#F8F9FB] dark:bg-[#12181B] rounded-lg p-4">
                                    <p className="text-xs text-[#778387]">Target Weight</p>
                                    <p className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{selectedMember.target}</p>
                                </div>

                                <div className="bg-[#F8F9FB] dark:bg-[#12181B] rounded-lg p-4">
                                    <p className="text-xs text-[#778387]">Total Workouts</p>
                                    <p className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{selectedMember.workouts}</p>
                                </div>

                                <div className="bg-[#F8F9FB] dark:bg-[#12181B] rounded-lg p-4">
                                    <p className="text-xs text-[#778387]">Attendance</p>
                                    <p className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{selectedMember.attendance}%</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">Overall Progress</span>
                                    <span className="text-sm font-bold text-[#3420FF]">{selectedMember.progress}%</span>
                                </div>
                                <div className="w-full h-3 bg-[#E9ECEF] dark:bg-[#303A3F] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#3420FF] rounded-full" style={{ width: `${selectedMember.progress}%` }}></div>
                                </div>
                            </div>

                            <button onClick={() => setSelectedMember(null)} className="w-full mt-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                select option{background:#fff;color:#1F272B}
                .dark select option{background:#12181B;color:#F4F6F7}
            `}</style>
        </div>
    );
};

export default Progress;