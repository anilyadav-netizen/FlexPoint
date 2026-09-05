import React, { useEffect, useRef, useState } from "react";
import {
    Menu,
    X,
    Phone,
    ArrowUpRight,
    User,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/Slicer/authSlice";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const navItems = [
        { name: "HOME", path: "/" },
        { name: "PROGRAMS", path: "/programs" },
        { name: "ABOUT US", path: "/about" },
        { name: "TRAINERS", path: "/trainers" },
        { name: "BLOG", path: "/blog" },
        { name: "GALLERY", path: "/gallery" },
        { name: "CONTACT", path: "/contact" },
    ];

    // =====================================================
    // USER DATA
    // =====================================================

    const userName =
        user?.name ||
        user?.fullName ||
        user?.username ||
        "User";

    const userEmail = user?.email || "";

    const userInitial =
        userName?.trim()?.charAt(0)?.toUpperCase() || "U";

    // =====================================================
    // CLOSE DROPDOWN ON OUTSIDE CLICK
    // =====================================================

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // =====================================================
    // BODY SCROLL
    // =====================================================

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {
        setProfileOpen(false);
        setIsOpen(false);

        await dispatch(logoutUser());

        navigate("/", { replace: true });
    };

    // =====================================================
    // CLOSE MOBILE MENU
    // =====================================================

    const handleNavClick = () => {
        setIsOpen(false);
        setProfileOpen(false);
    };

    return (
        <>
            {/* =================================================
          NAVBAR
      ================================================== */}

            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur-md">
                <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">

                    {/* =================================================
              LOGO
          ================================================== */}

                    <NavLink
                        to="/"
                        onClick={handleNavClick}
                        className="flex shrink-0 items-center gap-2.5"
                    >
                        <div className="relative flex h-11 w-9 items-center justify-center">
                            <div className="absolute left-0 top-1 h-8 w-3 -skew-x-[25deg] rounded-sm bg-[#e85d3a]" />

                            <div className="absolute left-[7px] top-0 h-9 w-3 -skew-x-[25deg] rounded-sm border-t-[5px] border-white" />
                        </div>

                        <div className="font-['Bebas_Neue'] leading-[0.85] tracking-wide">
                            <span className="block text-[20px] text-white">
                                FITNESS
                            </span>

                            <span className="block text-[20px] text-[#e85d3a]">
                                CENTERS
                            </span>
                        </div>
                    </NavLink>

                    {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

                    <div className="hidden h-full items-center lg:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `group relative flex h-full items-center px-4 font-['Barlow'] text-[13px] font-semibold tracking-wide transition-colors duration-300 ${isActive
                                        ? "text-[#e85d3a]"
                                        : "text-white/85 hover:text-[#e85d3a]"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.name}

                                        <span
                                            className={`absolute bottom-[20px] left-1/2 h-[2px] -translate-x-1/2 bg-[#e85d3a] transition-all duration-300 ${isActive
                                                ? "w-7"
                                                : "w-0 group-hover:w-7"
                                                }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================== */}

                    <div className="hidden items-center gap-6 xl:flex">

                        {/* PHONE */}

                        <a
                            href="tel:+919999999999"
                            className="flex items-center gap-2 font-['Barlow'] text-[13px] font-medium text-white/90 transition-colors duration-300 hover:text-[#e85d3a]"
                        >
                            <Phone
                                size={16}
                                strokeWidth={2}
                                className="text-[#e85d3a]"
                            />

                            <span>+91 9999999999</span>
                        </a>

                        {/* =================================================
                AUTH STATE

                IMPORTANT:
                checkingAuth ko yahan use nahi kiya gaya.
                Agar Redux me user hai to profile show hogi.
            ================================================== */}

                        {isAuthenticated && user ? (
                            <div ref={profileRef} className="relative">
                                {/* PROFILE BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen((prev) => !prev)}
                                    className="flex items-center justify-center rounded-full transition-all duration-300 hover:ring-2 hover:ring-[#e85d3a]/40"
                                >
                                    {/* AVATAR */}
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e85d3a] font-['Barlow'] text-[14px] font-bold text-white">
                                        {userInitial}
                                    </span>
                                </button>

                                {/* PROFILE DROPDOWN */}
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -8,
                                                scale: 0.97,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -8,
                                                scale: 0.97,
                                            }}
                                            transition={{ duration: 0.18 }}
                                            className="absolute right-0 top-[52px] w-[230px] overflow-hidden rounded-xl border border-white/10 bg-[#151515] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                                        >
                                            {/* USER INFO */}
                                            <div className="border-b border-white/10 p-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e85d3a] font-['Barlow'] text-[15px] font-bold text-white">
                                                        {userInitial}
                                                    </span>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-['Barlow'] text-[13px] font-semibold text-white">
                                                            {userName}
                                                        </p>

                                                        <p className="mt-0.5 truncate font-['Barlow'] text-[10px] text-white/40">
                                                            {userEmail || "Fitness Member"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* USER ACCOUNT */}
                                            <div className="flex items-center gap-3 px-4 py-3 font-['Barlow'] text-[12px] font-medium text-white/70">
                                                <User size={15} className="text-[#e85d3a]" />
                                                <span>Fitness Member</span>
                                            </div>

                                            {/* LOGOUT */}
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-3 font-['Barlow'] text-[12px] font-medium text-red-400 transition-colors hover:bg-red-500/5"
                                            >
                                                <LogOut size={15} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* =================================================
                                JOIN NOW
                            ================================================== */

                            <NavLink
                                to="/login"
                                className="group relative flex h-[43px] min-w-[120px] items-center justify-center overflow-hidden bg-[#e85d3a] px-6 font-['Bebas_Neue'] text-[17px] tracking-wide text-white transition-all duration-300 hover:bg-[#f06a49]"
                                style={{
                                    clipPath:
                                        "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                                }}
                            >
                                <span className="relative z-10">
                                    JOIN NOW
                                </span>

                                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                            </NavLink>
                        )}
                    </div>

                    {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex h-10 w-10 items-center justify-center border border-white/10 text-white transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a]/5 hover:text-[#e85d3a] lg:hidden"
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                    >
                        <Menu
                            size={22}
                            strokeWidth={1.8}
                        />
                    </button>
                </nav>
            </header>

            {/* =================================================
          MOBILE SIDEBAR
      ================================================== */}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* OVERLAY */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[2px] lg:hidden"
                        />

                        {/* SIDEBAR */}

                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 32,
                            }}
                            className="fixed right-0 top-0 z-[70] flex h-screen w-[88%] max-w-[390px] flex-col border-l border-white/10 bg-[#111111] shadow-[-20px_0_60px_rgba(0,0,0,0.45)] lg:hidden"
                        >
                            {/* SIDEBAR HEADER */}

                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
                                <NavLink
                                    to="/"
                                    onClick={handleNavClick}
                                    className="flex items-center gap-2.5"
                                >
                                    <div className="relative flex h-10 w-8 items-center justify-center">
                                        <div className="absolute left-0 top-1 h-7 w-3 -skew-x-[25deg] rounded-sm bg-[#e85d3a]" />

                                        <div className="absolute left-[6px] top-0 h-8 w-3 -skew-x-[25deg] rounded-sm border-t-[4px] border-white" />
                                    </div>

                                    <div className="font-['Bebas_Neue'] leading-[0.82] tracking-wide">
                                        <span className="block text-[19px] text-white">
                                            FITNESS
                                        </span>

                                        <span className="block text-[19px] text-[#e85d3a]">
                                            CENTERS
                                        </span>
                                    </div>
                                </NavLink>

                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                    className="flex h-10 w-10 items-center justify-center border border-white/10 bg-[#171717] text-white transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a]/10 hover:text-[#e85d3a]"
                                >
                                    <X
                                        size={20}
                                        strokeWidth={1.8}
                                    />
                                </button>
                            </div>

                            {/* SIDEBAR CONTENT */}

                            <div className="flex flex-1 flex-col overflow-y-auto px-5 py-7 sm:px-6">

                                {/* =================================================
                    MOBILE USER PROFILE

                    checkingAuth intentionally removed here too.
                ================================================== */}

                                {isAuthenticated && user && (
                                    <div className="mb-6 border border-white/10 bg-[#171717] p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e85d3a] font-['Barlow'] text-[16px] font-bold text-white">
                                                {userInitial}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-['Barlow'] text-[14px] font-semibold text-white">
                                                    {userName}
                                                </p>

                                                <p className="mt-0.5 truncate font-['Barlow'] text-[10px] text-white/40">
                                                    {userEmail || "Fitness Member"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 border border-red-500/10 font-['Barlow'] text-[11px] font-semibold text-red-400 transition-colors hover:bg-red-500/5"
                                        >
                                            <LogOut size={13} />

                                            Logout
                                        </button>
                                    </div>
                                )}

                                {/* LABEL */}

                                <div className="mb-5">
                                    <span className="inline-flex items-center gap-2 border border-[#e85d3a]/30 bg-[#e85d3a]/5 px-3 py-1.5 font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.16em] text-[#e85d3a]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#e85d3a]" />

                                        Explore Fitness
                                    </span>
                                </div>

                                {/* MOBILE NAV */}

                                <div className="space-y-1.5">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.path}
                                            initial={{
                                                opacity: 0,
                                                x: 25,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay: 0.08 + index * 0.06,
                                                duration: 0.3,
                                            }}
                                        >
                                            <NavLink
                                                to={item.path}
                                                end={item.path === "/"}
                                                onClick={handleNavClick}
                                                className={({ isActive }) =>
                                                    `group flex items-center justify-between border px-4 py-4 transition-all duration-300 ${isActive
                                                        ? "border-[#e85d3a]/30 bg-[#e85d3a]/10 text-[#e85d3a]"
                                                        : "border-transparent text-white/80 hover:border-white/10 hover:bg-[#171717] hover:text-[#e85d3a]"
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <span className="flex items-center gap-3">
                                                            <span
                                                                className={`h-1.5 w-1.5 transition-all duration-300 ${isActive
                                                                    ? "scale-100 bg-[#e85d3a] opacity-100"
                                                                    : "scale-0 bg-[#e85d3a] opacity-0"
                                                                    }`}
                                                            />

                                                            <span className="font-['Barlow'] text-[14px] font-semibold tracking-[0.08em]">
                                                                {item.name}
                                                            </span>
                                                        </span>

                                                        <span
                                                            className={`flex h-7 w-7 items-center justify-center border transition-all duration-300 ${isActive
                                                                ? "border-[#e85d3a] bg-[#e85d3a] text-white"
                                                                : "border-white/10 bg-[#171717] text-white/35 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white"
                                                                }`}
                                                        >
                                                            <ArrowUpRight
                                                                size={14}
                                                                strokeWidth={1.7}
                                                            />
                                                        </span>
                                                    </>
                                                )}
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* DIVIDER */}

                                <div className="my-4 h-px bg-white/10" />

                                {/* JOIN CARD */}

                                {!isAuthenticated && (
                                    <div className="relative overflow-hidden border border-white/10 bg-[#171717] p-5">
                                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#e85d3a]/10 blur-2xl" />

                                        <div className="relative z-10">
                                            <p className="font-['Barlow'] text-[8px] font-bold uppercase tracking-[0.16em] text-[#e85d3a]">
                                                START YOUR JOURNEY
                                            </p>

                                            <h3 className="mt-1 font-['Bebas_Neue'] text-[20px] leading-[0.9] tracking-wide text-white">
                                                STRONGER BODY.
                                                <br />
                                                BETTER LIFE.
                                            </h3>

                                            <NavLink
                                                to="/login"
                                                onClick={handleNavClick}
                                                className="group mt-3 flex h-11 w-full items-center justify-center gap-2 bg-[#e85d3a] font-['Bebas_Neue'] text-[17px] tracking-wide text-white transition-colors duration-300 hover:bg-[#f06a49]"
                                                style={{
                                                    clipPath:
                                                        "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
                                                }}
                                            >
                                                JOIN NOW

                                                <ArrowUpRight
                                                    size={15}
                                                    strokeWidth={1.8}
                                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                />
                                            </NavLink>
                                        </div>
                                    </div>
                                )}

                                {/* CONTACT */}

                                <div className="mt-auto pt-4">
                                    <p className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
                                        Need Help?
                                    </p>

                                    <a
                                        href="tel:+919999999999"
                                        className="mt-1 flex items-center gap-2 font-['Barlow'] text-[12px] font-medium text-white/65 transition-colors duration-300 hover:text-[#e85d3a]"
                                    >
                                        <Phone
                                            size={14}
                                            className="text-[#e85d3a]"
                                        />

                                        +91 99999999999
                                    </a>

                                    <p className="mt-1 font-['Barlow'] text-[10px] text-white/30">
                                        Available for membership enquiries
                                    </p>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* NAVBAR SPACER */}

            <div className="h-[72px]" />
        </>
    );
};

export default Navbar;