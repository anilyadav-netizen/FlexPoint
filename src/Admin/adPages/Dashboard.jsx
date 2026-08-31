import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../../redux/Slicer/authSlice";
import { getPrograms } from "../../redux/Slicer/programSlice";
import { getTrainers } from "../../redux/Slicer/trainerSlice";

// =====================================================
// DUMMY REVENUE DATA
// =====================================================

const revenueData = [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 58000 },
    { month: "Mar", revenue: 49000 },
    { month: "Apr", revenue: 72000 },
    { month: "May", revenue: 65000 },
    { month: "Jun", revenue: 88000 },
    { month: "Jul", revenue: 96000 },
    { month: "Aug", revenue: 92147 },
];

// =====================================================
// MEMBER GROWTH DATA
// =====================================================

const memberData = [
    { month: "Jan", members: 1 },
    { month: "Feb", members: 2 },
    { month: "Mar", members: 2 },
    { month: "Apr", members: 3 },
    { month: "May", members: 3 },
    { month: "Jun", members: 4 },
    { month: "Jul", members: 4 },
    { month: "Aug", members: 5 },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // =====================================================
    // REDUX DATA
    // =====================================================

    const { users = [] } = useSelector(
        (state) => state.auth
    );

    const { programs = [] } = useSelector(
        (state) => state.program
    );

    const { trainers = [] } = useSelector(
        (state) => state.trainer
    );

    // =====================================================
    // FETCH LIVE DATA
    // =====================================================

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getPrograms());
        dispatch(getTrainers());
    }, [dispatch]);

    // =====================================================
    // MEMBERS
    // =====================================================

    const totalMembers = Array.isArray(users)
        ? users.length
        : 0;

    const activeMembers = Array.isArray(users)
        ? users.filter(
              (user) =>
                  user.isActive !== false &&
                  user.status !== false &&
                  user.status !== "Inactive"
          ).length
        : 0;

    const premiumMembers = Array.isArray(users)
        ? users.filter((user) => {
              const plan =
                  user.plan ||
                  user.membershipPlan ||
                  user.membership ||
                  "";

              return (
                  typeof plan === "string" &&
                  plan.toLowerCase().includes("premium")
              );
          }).length
        : 0;

    // =====================================================
    // TRAINERS
    // =====================================================

    const totalTrainers = Array.isArray(trainers)
        ? trainers.length
        : 0;

    const activeTrainers = Array.isArray(trainers)
        ? trainers.filter(
              (trainer) =>
                  trainer.isActive !== false
          ).length
        : 0;

    // =====================================================
    // PROGRAMS
    // =====================================================

    const totalPrograms = Array.isArray(programs)
        ? programs.length
        : 0;

    const activePrograms = Array.isArray(programs)
        ? programs.filter(
              (program) =>
                  program.isActive !== false
          ).length
        : 0;

    // =====================================================
    // STATS CARDS
    // =====================================================

    const stats = [
        {
            title: "Total Members",
            value: totalMembers,
            change: "Live",
            icon: Users,
            color: "#2679D1",
            bg: "#EEF6FF",
            path: "/admin/members",
        },

        {
            title: "Active Trainers",
            value: activeTrainers,
            change: "Live",
            icon: UserRound,
            color: "#38C79A",
            bg: "#ECFBF5",
            path: "/admin/adtrainers",
        },

        {
            title: "Total Programs",
            value: totalPrograms,
            change: "Live",
            icon: Dumbbell,
            color: "#C03BB7",
            bg: "#FAEFF9",
            path: "/admin/adprogram",
        },

        {
            title: "Premium Members",
            value: premiumMembers,
            change: "Live",
            icon: Crown,
            color: "#E7B84B",
            bg: "#FFF8E8",
            path: "/admin/premium",
        },
    ];

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Dashboard
                    </h1>

                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                        Welcome back! Here's what's happening at your fitness center.
                    </p>
                </div>

                <button
                    className="flex items-center gap-2 w-fit px-4 py-2.5 bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-lg text-sm text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                >
                    <CalendarCheck
                        size={16}
                        className="text-[#3420FF]"
                    />

                    Today
                </button>
            </div>

            {/* =====================================================
                STATS
            ===================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {stats.map(
                    ({
                        title,
                        value,
                        change,
                        icon: Icon,
                        color,
                        bg,
                        path,
                    }) => (

                        <div
                            key={title}
                            onClick={() => navigate(path)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" ||
                                    e.key === " "
                                ) {
                                    navigate(path);
                                }
                            }}
                            className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-300"
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
                                    from live data
                                </span>

                            </div>
                        </div>
                    )
                )}

            </div>

            {/* =====================================================
                EXTRA LIVE SUMMARY
            ===================================================== */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">

                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                        Active Members
                    </p>

                    <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                        {activeMembers}
                    </p>

                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">

                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                        Total Trainers
                    </p>

                    <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                        {totalTrainers}
                    </p>

                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">

                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                        Active Programs
                    </p>

                    <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                        {activePrograms}
                    </p>

                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">

                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                        Total Programs
                    </p>

                    <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                        {totalPrograms}
                    </p>

                </div>

            </div>

            {/* =====================================================
                CHARTS
            ===================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

                {/* =====================================================
                    REVENUE
                ===================================================== */}

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

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
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
                                        `₹${Number(
                                            value
                                        ).toLocaleString()}`,
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

                {/* =====================================================
                    MEMBER GROWTH
                ===================================================== */}

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

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
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
                                    cursor={{
                                        fill: "#222D31",
                                    }}
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
                                    radius={[
                                        5,
                                        5,
                                        0,
                                        0,
                                    ]}
                                    barSize={22}
                                />

                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>

            {/* =====================================================
                BOTTOM SECTION
            ===================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

                {/* =====================================================
                    REVENUE SUMMARY
                ===================================================== */}

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
                                    style={{
                                        width: "78%",
                                    }}
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

                {/* =====================================================
                    LIVE DATA SUMMARY
                ===================================================== */}

                <div className="xl:col-span-2 bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
                            <MessageSquare size={18} />
                        </div>

                        <div>

                            <h3 className="font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                Fitness Center Overview
                            </h3>

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA]">
                                Current live statistics
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                        <div className="rounded-lg bg-[#F8F9FB] dark:bg-[#222D31] p-4">

                            <Users
                                size={20}
                                className="text-[#2679D1]"
                            />

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-3">
                                Members
                            </p>

                            <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                {totalMembers}
                            </p>

                        </div>

                        <div className="rounded-lg bg-[#F8F9FB] dark:bg-[#222D31] p-4">

                            <UserRound
                                size={20}
                                className="text-[#38C79A]"
                            />

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-3">
                                Trainers
                            </p>

                            <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                {totalTrainers}
                            </p>

                        </div>

                        <div className="rounded-lg bg-[#F8F9FB] dark:bg-[#222D31] p-4">

                            <Dumbbell
                                size={20}
                                className="text-[#C03BB7]"
                            />

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-3">
                                Programs
                            </p>

                            <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                {totalPrograms}
                            </p>

                        </div>

                        <div className="rounded-lg bg-[#F8F9FB] dark:bg-[#222D31] p-4">

                            <Crown
                                size={20}
                                className="text-[#E7B84B]"
                            />

                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-3">
                                Premium
                            </p>

                            <p className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                {premiumMembers}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;