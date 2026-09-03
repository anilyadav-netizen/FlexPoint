import React, { useState } from "react";
import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { LuMapPin, LuClock3 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createContact } from "../redux/Slicer/contactSlice";

const ContactPage = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.contact);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, mobile, email, message } = formData;

        if (
            !name.trim() ||
            !mobile.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        const contactData = {
            name: name.trim(),
            mobile: mobile.trim(),
            email: email.trim(),
            message: message.trim(),
        };

        try {
            const response = await dispatch(
                createContact(contactData)
            ).unwrap();

            toast.success(
                response?.message || "Message sent successfully"
            );

            setFormData({
                name: "",
                mobile: "",
                email: "",
                message: "",
            });
        } catch (err) {
            toast.error(
                typeof err === "string"
                    ? err
                    : err?.message || "Failed to send message"
            );
        }
    };

    return (
        <main className="mt-0 w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =========================
                HERO
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        {/* LEFT */}
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#e85d3a]" />

                                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                    Get In Touch
                                </span>
                            </div>

                            <h1 className="text-[20px] font-bold leading-tight md:text-[28px]">
                                LET&apos;S GET
                                <span className="text-[#e85d3a]">
                                    {" "}MOVING.
                                </span>
                                <br />
                                YOUR FITNESS
                                <span className="text-white/40">
                                    {" "}STARTS HERE.
                                </span>
                            </h1>
                        </div>

                        {/* RIGHT */}
                        <div className="max-w-[450px]">
                            <p className="text-[12px] leading-5 text-white/40 md:text-[14px]">
                                Have a question about our programs,
                                membership or training sessions? Reach out
                                to our team and we&apos;ll help you find the
                                right way to get started.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                                <div className="rounded-md border border-white/10 bg-[#151515] px-3 py-2">
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[10px]">
                                        Quick Response
                                    </span>
                                </div>

                                <div className="rounded-md border border-white/10 bg-[#151515] px-3 py-2">
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[10px]">
                                        Visit Our Center
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================
                CONTACT INFO
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8 lg:px-12 xl:px-[7%]">

                    <div className="grid grid-cols-1 overflow-hidden rounded-md border border-white/10 bg-[#111111] sm:grid-cols-3">

                        {/* PHONE */}
                        <a
                            href="tel:+919876543210"
                            className="group border-b border-white/10 px-5 py-4 transition-colors duration-300 hover:bg-[#151515] sm:border-b-0 sm:border-r"
                        >
                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                    <FaPhoneAlt size={13} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                        Call Us
                                    </p>

                                    <p className="mt-1 truncate text-[11px] font-medium text-white/80 md:text-[12px]">
                                        +91 98765 43210
                                    </p>
                                </div>

                            </div>
                        </a>

                        {/* EMAIL */}
                        <a
                            href="mailto:hello@fitcenter.com"
                            className="group border-b border-white/10 px-5 py-4 transition-colors duration-300 hover:bg-[#151515] sm:border-b-0 sm:border-r"
                        >
                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                    <IoMdMail size={14} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                        Email Us
                                    </p>

                                    <p className="mt-1 truncate text-[11px] font-medium text-white/80 md:text-[12px]">
                                        hello@fitcenter.com
                                    </p>
                                </div>

                            </div>
                        </a>

                        {/* LOCATION */}
                        <div className="group px-5 py-4 transition-colors duration-300 hover:bg-[#151515]">
                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                    <FiMapPin size={14} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                        Visit Us
                                    </p>

                                    <p className="mt-1 truncate text-[11px] font-medium text-white/80 md:text-[12px]">
                                        New Delhi, India
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================
                CONTACT FORM
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9 xl:px-[7%]">

                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

                        {/* =========================
                            FORM
                        ========================== */}
                        <div>

                            <div className="mb-5">

                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-[2px] w-6 bg-[#e85d3a]" />

                                    <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                        Send A Message
                                    </span>
                                </div>

                                <h2 className="text-[20px] font-bold leading-tight md:text-[28px]">
                                    HAVE A QUESTION?
                                    <span className="block text-[#e85d3a]">
                                        WE&apos;RE HERE TO HELP.
                                    </span>
                                </h2>

                                <p className="mt-2 max-w-[560px] text-[12px] leading-5 text-white/40 md:text-[14px]">
                                    Fill out the form below and our team will
                                    get back to you as soon as possible.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                            >

                                {/* NAME */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-white/45"
                                    >
                                        Your Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                        className="h-10 w-full rounded-md border border-white/10 bg-[#151515] px-3.5 text-[11px] text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#e85d3a]/70 md:text-[12px]"
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-white/45"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="mobile"
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        autoComplete="tel"
                                        className="h-10 w-full rounded-md border border-white/10 bg-[#151515] px-3.5 text-[11px] text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#e85d3a]/70 md:text-[12px]"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-white/45"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        className="h-10 w-full rounded-md border border-white/10 bg-[#151515] px-3.5 text-[11px] text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#e85d3a]/70 md:text-[12px]"
                                    />
                                </div>

                                {/* MESSAGE */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.1em] text-white/45"
                                    >
                                        Your Message
                                    </label>

                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help..."
                                        className="w-full resize-none rounded-md border border-white/10 bg-[#151515] px-3.5 py-3 text-[11px] leading-5 text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#e85d3a]/70 md:text-[12px]"
                                    />
                                </div>

                                {/* BUTTON */}
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group inline-flex h-10 items-center gap-2 rounded-md bg-[#e85d3a] px-5 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] disabled:cursor-not-allowed disabled:opacity-60 md:text-[10px]"
                                    >
                                        {loading
                                            ? "Sending..."
                                            : "Send Message"}

                                        {!loading && (
                                            <MdKeyboardArrowRight
                                                size={12}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        )}
                                    </button>
                                </div>

                            </form>

                            {error && (
                                <p className="mt-3 text-[10px] text-red-400 md:text-[11px]">
                                    {error}
                                </p>
                            )}

                        </div>

                        {/* =========================
                            CONTACT DETAILS
                        ========================== */}
                        <div className="lg:pt-1">

                            <div className="overflow-hidden rounded-md border border-white/10 bg-[#111111]">

                                {/* HEADER */}
                                <div className="border-b border-white/10 p-5 sm:p-6">

                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#e85d3a]/40 text-[#e85d3a]">
                                        <BiDumbbell size={17} />
                                    </div>

                                    <h3 className="text-[18px] font-bold leading-tight md:text-[20px]">
                                        VISIT OUR
                                        <span className="text-[#e85d3a]">
                                            {" "}FITNESS CENTER
                                        </span>
                                    </h3>

                                    <p className="mt-2 text-[12px] leading-5 text-white/40 md:text-[14px]">
                                        Come in, meet the team and take a look
                                        around our training space before you
                                        decide where to start.
                                    </p>

                                </div>

                                {/* ADDRESS */}
                                <div className="flex gap-3 border-b border-white/10 p-5">

                                    <FiMapPin
                                        size={16}
                                        className="mt-0.5 shrink-0 text-[#e85d3a]"
                                    />

                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/35">
                                            Address
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-white/65 md:text-[12px]">
                                            24 Fitness Avenue,
                                            <br />
                                            New Delhi, India - 110001
                                        </p>
                                    </div>

                                </div>

                                {/* HOURS */}
                                <div className="flex gap-3 border-b border-white/10 p-5">

                                    <LuClock3
                                        size={16}
                                        className="mt-0.5 shrink-0 text-[#e85d3a]"
                                    />

                                    <div className="w-full">

                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/35">
                                            Opening Hours
                                        </p>

                                        <div className="mt-2 space-y-1.5 text-[10px] text-white/55 md:text-[11px]">

                                            <div className="flex justify-between gap-3">
                                                <span>
                                                    Monday - Friday
                                                </span>

                                                <span className="text-right text-white/75">
                                                    6:00 AM - 10:00 PM
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3">
                                                <span>Saturday</span>

                                                <span className="text-right text-white/75">
                                                    7:00 AM - 9:00 PM
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3">
                                                <span>Sunday</span>

                                                <span className="text-right text-[#e85d3a]">
                                                    8:00 AM - 2:00 PM
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                {/* SOCIAL */}
                                <div className="flex items-center gap-2 p-5">

                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaInstagram size={14} />
                                    </a>

                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaFacebookF size={13} />
                                    </a>

                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaLinkedinIn size={13} />
                                    </a>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================
                WHY CONTACT US
            ========================== */}
            <section className="border-y border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-[7%]">

                    <div className="grid gap-3 sm:grid-cols-3">

                        {[
                            {
                                number: "01",
                                title: "TALK TO OUR TEAM",
                                text: "Get answers about memberships, programs and training.",
                            },
                            {
                                number: "02",
                                title: "VISIT THE CENTER",
                                text: "See our facilities and experience the training environment.",
                            },
                            {
                                number: "03",
                                title: "START TRAINING",
                                text: "Choose the right program and take your first step.",
                            },
                        ].map((item) => (
                            <div
                                key={item.number}
                                className="rounded-md border border-white/10 bg-[#151515] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/50"
                            >

                                <span className="text-[18px] font-bold text-[#e85d3a] md:text-[20px]">
                                    {item.number}
                                </span>

                                <h3 className="mt-2 text-[14px] font-bold leading-tight tracking-wide md:text-[16px]">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-[11px] leading-5 text-white/40 md:text-[12px]">
                                    {item.text}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================
                MAP
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9 xl:px-[7%]">

                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#e85d3a]" />

                                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                    Find Us
                                </span>
                            </div>

                            <h2 className="text-[20px] font-bold leading-tight md:text-[28px]">
                                OUR
                                <span className="text-[#e85d3a]">
                                    {" "}LOCATION
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-[450px] text-[12px] leading-5 text-white/40 md:text-[14px]">
                            We&apos;re easy to find. Visit us at our fitness
                            center in New Delhi and let&apos;s get your
                            training started.
                        </p>

                    </div>

                    <div className="relative h-[260px] overflow-hidden rounded-md border border-white/10 bg-[#151515] sm:h-[330px] lg:h-[400px]">

                        <iframe
                            title="Fitness Center Location"
                            src="https://www.google.com/maps?q=New%20Delhi%2C%20India&output=embed"
                            className="h-full w-full grayscale-[30%] opacity-80 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-[#0d0d0d]/90 px-3 py-2.5 backdrop-blur-md">

                            <div className="flex items-center gap-2">

                                <LuMapPin
                                    size={14}
                                    className="text-[#e85d3a]"
                                />

                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                                        Fitness Center
                                    </p>

                                    <p className="mt-0.5 text-[9px] text-white/45">
                                        New Delhi, India
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* =========================
                FINAL CTA
            ========================== */}
            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9 xl:px-[7%]">

                    <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#151515] px-5 py-7 sm:px-8 md:flex md:items-center md:justify-between md:gap-8 md:py-8 lg:px-12">

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10">

                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#e85d3a] md:text-[11px]">
                                Your Next Step
                            </p>

                            <h2 className="mt-2 text-[18px] font-bold leading-tight md:text-[20px]">
                                READY TO
                                <span className="text-[#e85d3a]">
                                    {" "}START?
                                </span>
                            </h2>

                            <p className="mt-2 max-w-[560px] text-[11px] leading-5 text-white/40 md:text-[12px]">
                                Don&apos;t wait for the perfect time. Take the
                                first step toward becoming stronger, healthier
                                and fitter.
                            </p>

                        </div>

                        <a
                            href="tel:+919876543210"
                            className="group relative z-10 mt-5 inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#e85d3a] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] md:mt-0 md:text-[10px]"
                        >
                            Call Now

                            <MdKeyboardArrowRight
                                size={11}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default ContactPage;