import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Phone,
    Dumbbell,
} from "lucide-react";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agree: false,
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!formData.agree) {
            alert("Please accept the terms and conditions.");
            return;
        }

        console.log("Signup Data:", formData);

        // Backend API call can be added here
    };

    return (
        <main className=" w-full bg-[#0d0d0d] text-white min-h-screen">

            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-5 py-125 sm:px-8 lg:px-12">

                <div className="grid w-full max-w-[1100px] overflow-hidden border border-white/10 bg-[#111111] lg:grid-cols-[0.9fr_1.1fr] mt-24">

                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <div className="relative hidden min-h-[700px] overflow-hidden bg-[#151515] lg:block">

                        <img
                            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85"
                            alt="Fitness workout"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-black/10" />

                        <div className="absolute inset-x-0 bottom-0 z-10 p-8 xl:p-10">

                            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#e85d3a]/50 bg-black/40 text-[#e85d3a] backdrop-blur-sm">
                                <Dumbbell size={20} strokeWidth={1.5} />
                            </div>

                            <p className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.15em] text-[#e85d3a]">
                                Start Your Journey
                            </p>

                            <h1 className="mt-2 font-['Bebas_Neue'] text-[48px] leading-[0.85] tracking-wide">
                                BUILD YOUR
                                <span className="block text-[#e85d3a]">
                                    BEST SELF.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-[430px] font-['Barlow'] text-[14px] leading-6 text-white/55">
                                Join our fitness community and get access to
                                expert trainers, structured programs and a
                                supportive environment.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div className="flex min-h-[700px] flex-col justify-center p-4 md:p-6 sm:p-10 lg:p-10 xl:p-14">

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
                                Create Account
                            </p>

                            <h2 className="mt-2 font-['Bebas_Neue'] text-[24px] leading-[0.85] tracking-wide md:text-[42px]">
                                JOIN THE
                                <span className="text-[#e85d3a]">
                                    {" "}COMMUNITY.
                                </span>
                            </h2>

                            <p className="mt-3 font-['Barlow'] text-[12px] leading-5 text-white/45">
                                Create your account and start your fitness
                                journey today.
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-4 space-y-4"
                        >

                            {/* Name + Phone */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Name */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                    >
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={15}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                        />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            required
                                            className="h-[46px] w-full border border-white/10 bg-[#171717] pl-10 pr-3 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#e85d3a]/70"
                                        />

                                    </div>

                                </div>


                                {/* Phone */}

                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                    >
                                        Phone
                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={15}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                        />

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                            required
                                            className="h-[46px] w-full border border-white/10 bg-[#171717] pl-10 pr-3 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#e85d3a]/70"
                                        />

                                    </div>

                                </div>

                            </div>


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
                                        size={15}
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
                                        className="h-[46px] w-full border border-white/10 bg-[#171717] pl-10 pr-3 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#e85d3a]/70"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={15}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        className="h-[46px] w-full border border-white/10 bg-[#171717] pl-10 pr-11 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#e85d3a]/70"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#e85d3a]"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={15} />
                                        ) : (
                                            <Eye size={15} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white/60"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={15}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                                    />

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        required
                                        className="h-[46px] w-full border border-white/10 bg-[#171717] pl-10 pr-11 font-['Barlow'] text-[13px] text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#e85d3a]/70"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#e85d3a]"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={15} />
                                        ) : (
                                            <Eye size={15} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Terms */}

                            <label className="flex cursor-pointer items-start gap-2 pt-1">

                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#e85d3a]"
                                />

                                <span className="font-['Barlow'] text-[10px] leading-4 text-white/40">

                                    I agree to the{" "}

                                    <Link
                                        to="/terms"
                                        className="text-[#e85d3a] hover:text-[#f16a49]"
                                    >
                                        Terms & Conditions
                                    </Link>

                                    {" "}and{" "}

                                    <Link
                                        to="/privacy"
                                        className="text-[#e85d3a] hover:text-[#f16a49]"
                                    >
                                        Privacy Policy
                                    </Link>

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
                                Create Account

                                <ArrowRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </button>

                        </form>


                        {/* Login */}

                        <div className="mt-6 border-t border-white/10 pt-5 text-center">

                            <p className="font-['Barlow'] text-[12px] text-white/40">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ml-1 font-semibold text-[#e85d3a] transition-colors hover:text-[#f16a49]"
                                >
                                    Sign In
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default SignupPage;