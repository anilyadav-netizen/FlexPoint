import React from "react";
import {
    Users,
    UserRound,
    Dumbbell,
    Crown,
    MessageSquare,
    TrendingUp,
    CalendarCheck,
    IndianRupee,
    MoreHorizontal,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 58000 },
    { month: "Mar", revenue: 49000 },
    { month: "Apr", revenue: 72000 },
    { month: "May", revenue: 65000 },
    { month: "Jun", revenue: 88000 },
    { month: "Jul", revenue: 96000 },
    { month: "Aug", revenue: 92000 },
];

const memberData = [
    { month: "Jan", members: 420 },
    { month: "Feb", members: 560 },
    { month: "Mar", members: 510 },
    { month: "Apr", members: 680 },
    { month: "May", members: 620 },
    { month: "Jun", members: 790 },
    { month: "Jul", members: 850 },
    { month: "Aug", members: 920 },
];

const Dashboard = () => {
    const stats = [
        {
            title: "Total Members",
            value: "1,248",
            change: "+12.5%",
            icon: Users,
            color: "#2679D1",
            bg: "#EEF6FF",
        },
        {
            title: "Active Trainers",
            value: "18",
            change: "+4.2%",
            icon: UserRound,
            color: "#38C79A",
            bg: "#ECFBF5",
        },
        {
            title: "Programs",
            value: "24",
            change: "+8.4%",
            icon: Dumbbell,
            color: "#C03BB7",
            bg: "#FAEFF9",
        },
        {
            title: "Premium Members",
            value: "386",
            change: "+15.8%",
            icon: Crown,
            color: "#E7B84B",
            bg: "#FFF8E8",
        },
    ];

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Dashboard
                    </h1>

                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                        Welcome back! Here's what's happening at your fitness center.
                    </p>
                </div>

                <button className="flex items-center gap-2 w-fit px-4 py-2.5 bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-lg text-sm text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition">
                    <CalendarCheck size={16} className="text-[#3420FF]" />
                    Today
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map(({ title, value, change, icon: Icon, color, bg }) => (
                    <div
                        key={title}
                        className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                                    {title}
                                </p>

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                                    {value}
                                </h2>
                            </div>

                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                    backgroundColor: bg,
                                    color: color,
                                }}
                            >
                                <Icon size={19} />
                            </div>
                        </div>

                        <div className="flex items-center gap-1 mt-4 text-xs sm:text-sm text-[#38C79A]">
                            <TrendingUp size={14} />

                            <span className="font-medium">
                                {change}
                            </span>

                            <span className="text-[#9AA3A6] dark:text-[#778387] ml-1">
                                from last month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

                {/* Revenue */}
                <div className="xl:col-span-2 bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm transition-colors duration-300">

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Revenue Overview
                            </h3>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                Monthly revenue performance
                            </p>
                        </div>

                        <button className="p-1.5 rounded-lg text-[#778387] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>

                                <defs>
                                    <linearGradient
                                        id="revenueGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#38C79A"
                                            stopOpacity={0.3}
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="#38C79A"
                                            stopOpacity={0.02}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    stroke="#303A3F"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#778387",
                                        fontSize: 11,
                                    }}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#778387",
                                        fontSize: 11,
                                    }}
                                    tickFormatter={(value) =>
                                        `₹${value / 1000}k`
                                    }
                                />

                                <Tooltip
                                    contentStyle={{
                                        border: "1px solid #303A3F",
                                        borderRadius: "10px",
                                        background: "#1C2529",
                                        color: "#F4F6F7",
                                    }}
                                    formatter={(value) => [
                                        `₹${value.toLocaleString()}`,
                                        "Revenue",
                                    ]}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#38C79A"
                                    strokeWidth={3}
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Member Growth */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm transition-colors duration-300">

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Member Growth
                            </h3>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                Monthly active members
                            </p>
                        </div>

                        <button className="p-1.5 rounded-lg text-[#778387] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={memberData}>

                                <CartesianGrid
                                    stroke="#303A3F"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#778387",
                                        fontSize: 10,
                                    }}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#778387",
                                        fontSize: 10,
                                    }}
                                />

                                <Tooltip
                                    cursor={{ fill: "#222D31" }}
                                    contentStyle={{
                                        border: "1px solid #303A3F",
                                        borderRadius: "10px",
                                        background: "#1C2529",
                                        color: "#F4F6F7",
                                    }}
                                />

                                <Bar
                                    dataKey="members"
                                    fill="#2679D1"
                                    radius={[5, 5, 0, 0]}
                                    barSize={22}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

                {/* Revenue Summary */}
                <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Revenue Summary
                            </h3>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                Current financial overview
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]">
                            <IndianRupee size={18} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                                    Monthly Target
                                </span>

                                <span className="text-xs font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                    78%
                                </span>
                            </div>

                            <div className="h-2 bg-[#E7EAED] dark:bg-[#222D31] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#38C79A] rounded-full"
                                    style={{ width: "78%" }}
                                />
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-xs text-[#9AA3A6] dark:text-[#778387]">
                                    This Month
                                </p>

                                <p className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                                    ₹96,147
                                </p>
                            </div>

                            <span className="text-xs font-medium text-[#38C79A]">
                                +15.8%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Queries */}
                <div className="xl:col-span-2 bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
                                <MessageSquare size={18} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                    Recent Queries
                                </h3>

                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                                    Latest contact requests
                                </p>
                            </div>
                        </div>

                        <button className="text-xs font-medium text-[#3420FF] hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        {[
                            ["Rahul Sharma", "Membership enquiry"],
                            ["Priya Singh", "Personal training"],
                            ["Aman Verma", "Premium plan"],
                            ["Neha Gupta", "Program enquiry"],
                        ].map(([name, query], index) => (
                            <div
                                key={name}
                                className="flex items-center justify-between py-3 border-b border-[#E7EAED] dark:border-[#303A3F]"
                            >
                                <div className="flex items-center gap-3 min-w-0">

                                    <div className="w-9 h-9 shrink-0 rounded-full bg-[#F1F2FD] dark:bg-[#222D31] flex items-center justify-center text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        {name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] truncate">
                                            {name}
                                        </p>

                                        <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-0.5 truncate">
                                            {query}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`w-2 h-2 shrink-0 rounded-full ${
                                        index === 0
                                            ? "bg-[#C03BB7]"
                                            : index === 1
                                            ? "bg-[#2679D1]"
                                            : index === 2
                                            ? "bg-[#38C79A]"
                                            : "bg-[#E7B84B]"
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;