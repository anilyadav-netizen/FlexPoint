import React, { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, Users, CalendarDays, UserCheck } from "lucide-react";

const initialAttendance = [
    { id: 1, member: "Rahul Sharma", program: "Strength Training", trainer: "John Smith", date: "12 Aug 2026", checkIn: "07:15 AM", status: "Present" },
    { id: 2, member: "Priya Singh", program: "Yoga & Flexibility", trainer: "Sarah Wilson", date: "12 Aug 2026", checkIn: "08:05 AM", status: "Present" },
    { id: 3, member: "Amit Kumar", program: "HIIT & Cardio", trainer: "Mike Johnson", date: "12 Aug 2026", checkIn: "-", status: "Absent" },
    { id: 4, member: "Neha Verma", program: "Pilates", trainer: "Emma Davis", date: "12 Aug 2026", checkIn: "09:20 AM", status: "Present" },
    { id: 5, member: "Rohit Yadav", program: "CrossFit", trainer: "John Smith", date: "12 Aug 2026", checkIn: "10:10 AM", status: "Late" },
    { id: 6, member: "Anjali Gupta", program: "Strength Training", trainer: "John Smith", date: "11 Aug 2026", checkIn: "07:30 AM", status: "Present" },
    { id: 7, member: "Vikas Singh", program: "HIIT & Cardio", trainer: "Mike Johnson", date: "11 Aug 2026", checkIn: "-", status: "Absent" },
    { id: 8, member: "Pooja Sharma", program: "Yoga & Flexibility", trainer: "Sarah Wilson", date: "11 Aug 2026", checkIn: "08:15 AM", status: "Present" },
];

const Attandance = () => {
    const [attendance, setAttendance] = useState(initialAttendance);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [programFilter, setProgramFilter] = useState("All");

    const filteredAttendance = attendance.filter((item) => {
        const matchesSearch = `${item.member} ${item.program} ${item.trainer}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        const matchesProgram = programFilter === "All" || item.program === programFilter;
        return matchesSearch && matchesStatus && matchesProgram;
    });

    const present = attendance.filter((item) => item.status === "Present").length;
    const absent = attendance.filter((item) => item.status === "Absent").length;
    const late = attendance.filter((item) => item.status === "Late").length;
    const total = attendance.length;

    const updateStatus = (id, status) => {
        setAttendance(attendance.map((item) => {
            if (item.id !== id) return item;
            return {
                ...item,
                status,
                checkIn: status === "Present" ? item.checkIn === "-" ? "Now" : item.checkIn : "-"
            };
        }));
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Attendance</h1>
                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Track and manage member attendance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Records</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{total}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <CalendarDays size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Present</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{present}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <UserCheck size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Absent</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{absent}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
                                <XCircle size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Late</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{late}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#FFF7E6] dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Clock size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <div className="relative w-full lg:max-w-md">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                            <input type="text" placeholder="Search member, program or trainer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]" />
                        </div>

                        <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} className="w-full lg:w-52 px-3 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]">
                            <option>All</option>
                            <option>Strength Training</option>
                            <option>HIIT & Cardio</option>
                            <option>Yoga & Flexibility</option>
                            <option>CrossFit</option>
                            <option>Pilates</option>
                        </select>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full lg:w-40 px-3 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]">
                            <option>All</option>
                            <option>Present</option>
                            <option>Absent</option>
                            <option>Late</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Users size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Attendance Records</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Member</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Program</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Trainer</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Date</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Check In</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Mark Attendance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredAttendance.map((item) => (
                                    <tr key={item.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{item.member}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.program}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.trainer}</p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.date}</td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{item.checkIn}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === "Present" ? "bg-green-500 text-white" : item.status === "Late" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => updateStatus(item.id, "Present")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${item.status === "Present" ? "bg-green-500 text-white" : "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20"}`}>
                                                    Present
                                                </button>
                                                <button onClick={() => updateStatus(item.id, "Absent")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${item.status === "Absent" ? "bg-red-500 text-white" : "bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"}`}>
                                                    Absent
                                                </button>
                                                <button onClick={() => updateStatus(item.id, "Late")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${item.status === "Late" ? "bg-yellow-500 text-white" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20"}`}>
                                                    Late
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAttendance.length === 0 && (
                        <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No attendance records found.</div>
                    )}
                </div>
            </div>

            <style>{`
                select option{background:#fff;color:#1F272B}
                .dark select option{background:#12181B;color:#F4F6F7}
            `}</style>
        </div>
    );
};

export default Attandance;