import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Dumbbell,
} from "lucide-react";

const LoginPage = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Data:", formData);

        // Backend API call can be added here

        // Example:
        // navigate("/");
    };

    return (
        <main className=" w-full bg-[#0d0d0d] text-white">

            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

                <div className="grid w-full max-w-[1050px] overflow-hidden border border-white/10 bg-[#111111] lg:grid-cols-2">

                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <div className="relative hidden min-h-[650px] overflow-hidden bg-[#151515] lg:block">

                        {/* Background */}

                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85"
                            alt="Fitness training"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/45 to-black/10" />

                        {/* Orange Glow */}

                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#e85d3a]/20 blur-3xl" />

                        {/* Content */}

                        <div className="absolute inset-x-0 bottom-0 z-10 p-8 xl:p-10">

                            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#e85d3a]/50 bg-black/40 text-[#e85d3a] backdrop-blur-sm">
                                <Dumbbell size={20} strokeWidth={1.5} />
                            </div>

                            <p className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.15em] text-[#e85d3a]">
                                Welcome Back
                            </p>

                            <h1 className="mt-2 max-w-[450px] font-['Bebas_Neue'] text-[48px] leading-[0.85] tracking-wide">
                                TRAIN HARD.
                                <span className="block text-[#e85d3a]">
                                    LIVE STRONG.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-[430px] font-['Barlow'] text-[14px] leading-6 text-white/55">
                                Sign in to manage your membership, track your
                                progress and continue your fitness journey.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div className="flex min-h-[650px] flex-col justify-center p-6 sm:p-10 md:p-12 lg:p-10 xl:p-14">

                        {/* Brand */}

                        <Link
                            to="/"
                            className="font-['Bebas_Neue'] text-[30px] tracking-wide text-white"
                        >
                            FIT<span className="text-[#e85d3a]">ZONE</span>
                        </Link>


                        {/* Heading */}

                        <div className="mt-3">

                            <p className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.15em] text-[#e85d3a]">
                                Member Login
                            </p>

                            <h2 className="mt-2 font-['Bebas_Neue'] text-[38px] leading-[0.85] tracking-wide sm:text-[44px]">
                                WELCOME
                                <span className="text-[#e85d3a]">
                                    {" "}BACK.
                                </span>
                            </h2>

                            <p className="mt-3 font-['Barlow'] text-[13px] leading-5 text-white/45">
                                Enter your details to access your account.
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                >
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={16}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        className="h-[48px] w-full border border-white/10 bg-[#171717] pl-11 pr-4 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#e85d3a]/70"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label
                                        htmlFor="password"
                                        className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="font-['Barlow'] text-[10px] font-semibold text-[#e85d3a] transition-colors hover:text-[#f16a49]"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                <div className="relative">

                                    <Lock
                                        size={16}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        className="h-[48px] w-full border border-white/10 bg-[#171717] pl-11 pr-12 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#e85d3a]/70"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-[#e85d3a]"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Remember */}

                            <label className="flex cursor-pointer items-center gap-2">

                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="h-3.5 w-3.5 accent-[#e85d3a]"
                                />

                                <span className="font-['Barlow'] text-[11px] text-white/40">
                                    Remember me
                                </span>

                            </label>


                            {/* Submit */}

                            <button
                                type="submit"
                                className="group flex h-[48px] w-full items-center justify-center gap-3 bg-[#e85d3a] font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(3% 0, 100% 0, 97% 100%, 0 100%)",
                                }}
                            >
                                Sign In

                                <ArrowRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>

                        </form>


                        {/* Signup */}

                        <div className="mt-7 border-t border-white/10 pt-6 text-center">

                            <p className="font-['Barlow'] text-[12px] text-white/40">

                                Don't have an account?

                                <Link
                                    to="/signup"
                                    className="ml-1 font-semibold text-[#e85d3a] transition-colors hover:text-[#f16a49]"
                                >
                                    Create Account
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default LoginPage;