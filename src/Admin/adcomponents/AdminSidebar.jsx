import React, { useState } from "react";
import {
    LayoutDashboard, Users, Dumbbell, UserRound, Crown, MessageSquare,
    CreditCard, ClipboardCheck, TrendingUp, Home, Star, Images, FileText,
    Settings, ChevronDown, LogOut, User, X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen, onClose }) => {
    const [openWebsite, setOpenWebsite] = useState(true);
    const [openManagement, setOpenManagement] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const mainMenu = [
        { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
        { title: "Members", icon: Users, path: "/admin/members" },
        { title: "Trainers", icon: UserRound, path: "/admin/adtrainers" },
        { title: "Programs", icon: Dumbbell, path: "/admin/adprogram" },
        { title: "Premium", icon: Crown, path: "/admin/adPremium" },
        { title: "Contact Queries", icon: MessageSquare, path: "/admin/adContact" },
    ];

    const websiteMenu = [
        { title: "Testimonials", icon: Star, path: "/admin/testimonials" },
        { title: "Gallery", icon: Images, path: "/admin/adgallery" },
        { title: "Blogs", icon: FileText, path: "/admin/adblogs" },
    ];

    const managementMenu = [
        { title: "Payments", icon: CreditCard, path: "/admin/payments" },
        { title: "Attendance", icon: ClipboardCheck, path: "/admin/attandance" },
        { title: "Progress", icon: TrendingUp, path: "/admin/progress" },
    ];

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-all duration-200 ${
            isActive
                ? "bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF] dark:text-[#7C6CFF] font-semibold"
                : "text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5 hover:text-[#1F272B] dark:hover:text-[#F4F6F7]"
        }`;

    return (
        <aside className={`fixed lg:relative top-0 left-0 z-50 w-72 h-screen shrink-0 flex flex-col bg-white dark:bg-[#1C2529] border-r border-[#E2E6E8] dark:border-[#303A3F] shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="h-16 shrink-0 px-5 flex items-center justify-between border-b border-[#E7EAED] dark:border-[#303A3F]">
                <NavLink to="/admin" className="block">
                    <h1 className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Fitness<span className="text-[#3420FF]">Center</span>
                    </h1>
                    <p className="text-[10px] text-[#778387] uppercase tracking-widest mt-0.5">Admin Panel</p>
                </NavLink>

                <button onClick={onClose} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FB] dark:hover:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA]">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-hide">
                <div className="space-y-1">
                    {mainMenu.map(({ title, icon: Icon, path }) => (
                        <NavLink key={title} to={path} end={path === "/admin"} className={linkClass}>
                            <Icon size={18} />
                            <span>{title}</span>
                        </NavLink>
                    ))}
                </div>

                <p className="px-3 mt-6 mb-2 text-[11px] font-semibold text-[#778387] uppercase tracking-wider">Website</p>

                <button onClick={() => setOpenWebsite(!openWebsite)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5 hover:text-[#1F272B] dark:hover:text-[#F4F6F7] transition">
                    <div className="flex items-center gap-3">
                        <Home size={18} />
                        <span>Website Management</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${openWebsite ? "" : "-rotate-90"}`} />
                </button>

                {openWebsite && (
                    <div className="mt-1 ml-3 pl-3 border-l border-[#E2E6E8] dark:border-[#303A3F] space-y-1">
                        {websiteMenu.map(({ title, icon: Icon, path }) => (
                            <NavLink key={title} to={path} className={linkClass}>
                                <Icon size={17} />
                                <span>{title}</span>
                            </NavLink>
                        ))}
                    </div>
                )}

                <p className="px-3 mt-6 mb-2 text-[11px] font-semibold text-[#778387] uppercase tracking-wider">Management</p>

                <button onClick={() => setOpenManagement(!openManagement)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5 hover:text-[#1F272B] dark:hover:text-[#F4F6F7] transition">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={18} />
                        <span>Management</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${openManagement ? "" : "-rotate-90"}`} />
                </button>

                {openManagement && (
                    <div className="mt-1 ml-3 pl-3 border-l border-[#E2E6E8] dark:border-[#303A3F] space-y-1">
                        {managementMenu.map(({ title, icon: Icon, path }) => (
                            <NavLink key={title} to={path} className={linkClass}>
                                <Icon size={17} />
                                <span>{title}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>

            <div className="shrink-0 p-3 border-t border-[#E7EAED] dark:border-[#303A3F]">
                <div className="relative">
                    {openProfile && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] shadow-xl">
                            <NavLink to="/admin/profile" className={linkClass}>
                                <User size={17} /> My Profile
                            </NavLink>

                            <NavLink to="/admin/settings" className={linkClass}>
                                <Settings size={17} /> Settings
                            </NavLink>

                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-red-500 hover:bg-red-500/10 transition">
                                <LogOut size={17} /> Logout
                            </button>
                        </div>
                    )}

                    <button onClick={() => setOpenProfile(!openProfile)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-white/5 transition">
                        <div className="w-10 h-10 rounded-full bg-[#3420FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            AU
                        </div>

                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[14px] font-semibold text-[#1F272B] dark:text-[#F4F6F7] truncate">Admin</p>
                            <p className="text-xs text-[#778387] truncate">admin@fitness.com</p>
                        </div>

                        <ChevronDown size={17} className={`text-[#778387] transition-transform ${openProfile ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;