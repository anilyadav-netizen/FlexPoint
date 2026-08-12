import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import AdminSidebar from "../adcomponents/AdminSidebar";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;

        if (path === "/admin") return "Dashboard";
        if (path.includes("/members")) return "Members";
        if (path.includes("/trainers")) return "Trainers";
        if (path.includes("/programs")) return "Programs";
        if (path.includes("/premium")) return "Premium";
        if (path.includes("/contact")) return "Contact Queries";
        if (path.includes("/website/hero")) return "Hero";
        if (path.includes("/website/banner")) return "Banner";
        if (path.includes("/profile")) return "My Profile";
        if (path.includes("/settings")) return "Settings";

        return "Admin Panel";
    };

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            isDarkMode
        );

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="h-screen flex overflow-hidden admin-bg transition-colors duration-300">

            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isDarkMode={isDarkMode}
                toggleDarkMode={() =>
                    setIsDarkMode((prev) => !prev)
                }
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col h-screen">

                {/* TOP NAVBAR */}
                <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 admin-card border-b admin-border shadow-sm transition-colors duration-300">

                    {/* Left */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="lg:hidden p-2.5 rounded-lg admin-hover transition"
                        >
                            <FaBars
                                size={20}
                                className="admin-text"
                            />
                        </button>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold admin-text">
                                {getPageTitle()}
                            </h2>

                            <p className="hidden sm:block text-xs admin-muted mt-0.5">
                                Fitness Center Admin Panel
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* Theme Button */}
                        <button
                            onClick={() =>
                                setIsDarkMode(
                                    (prev) => !prev
                                )
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-lg admin-hover border admin-border transition"
                            title={
                                isDarkMode
                                    ? "Light Mode"
                                    : "Dark Mode"
                            }
                        >
                            {isDarkMode ? (
                                <FaSun
                                    size={18}
                                    className="text-[#E7B84B]"
                                />
                            ) : (
                                <FaMoon
                                    size={18}
                                    className="admin-secondary"
                                />
                            )}
                        </button>

                        {/* Admin */}
                        <div className="flex items-center gap-2">

                            <img
                                src="https://i.pravatar.cc/100?img=12"
                                alt="Admin"
                                className="w-9 h-9 rounded-full object-cover border admin-border"
                            />

                            <div className="hidden md:block">
                                <p className="text-sm font-semibold admin-text">
                                    Admin
                                </p>

                                <p className="text-[11px] admin-muted">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto admin-bg transition-colors duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;