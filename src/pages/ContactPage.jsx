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

    // ==========================
    // HANDLE INPUT CHANGE
    // ==========================
    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // ==========================
    // HANDLE FORM SUBMIT
    // ==========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("FORM SUBMITTED");
        console.log("FORM DATA:", formData);

        const { name, mobile, email, message } = formData;

        // ==========================
        // VALIDATION
        // ==========================
        if (
            !name.trim() ||
            !mobile.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            console.log("VALIDATION FAILED");

            toast.error("Please fill all the fields");
            return;
        }

        // ==========================
        // API PAYLOAD
        // ==========================
        const contactData = {
            name: name.trim(),
            mobile: mobile.trim(),
            email: email.trim(),
            message: message.trim(),
        };

        console.log("API PAYLOAD:", contactData);

        try {
            // ==========================
            // API CALL
            // ==========================
            const response = await dispatch(
                createContact(contactData)
            ).unwrap();

            console.log("API SUCCESS:", response);

            toast.success(
                response?.message || "Message sent successfully"
            );

            // ==========================
            // RESET FORM
            // ==========================
            setFormData({
                name: "",
                mobile: "",
                email: "",
                message: "",
            });
        } catch (err) {
            console.error("API ERROR:", err);

            toast.error(
                typeof err === "string"
                    ? err
                    : err?.message || "Failed to send message"
            );
        }
    };

    return (
        <main className="mt-[0px] w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="border-b border-white/10">
                <div className="mx-auto w-full max-w-[110rem] px-6 py-4 sm:px-10 md:py-7 lg:px-16 xl:px-[7%]">

                    <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e85d3a] sm:text-[13px]">
                                    Get In Touch
                                </span>
                            </div>

                            <h1 className="font-['Bebas_Neue'] text-[24px] leading-[0.82] tracking-[0.015em] md:text-[40px] lg:text-[52px]">
                                LET'S GET

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

                        <div className="max-w-[400px] lg:justify-self-end">
                            <p className="font-['Barlow'] text-[13px] leading-6 text-white/50 sm:text-[15px] sm:leading-7">
                                Have a question about our programs,
                                membership or training sessions? Reach out
                                to our team and we'll help you find the right
                                way to get started.
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">

                                <div className="border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        Quick Response
                                    </span>
                                </div>

                                <div className="border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        Visit Our Center
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTACT INFO
            ====================================================== */}
            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto grid w-full max-w-[110rem] grid-cols-1 sm:grid-cols-3">

                    {/* PHONE */}
                    <a
                        href="tel:+919876543210"
                        className="group border-b border-white/10 px-6 py-5 transition-colors duration-300 hover:bg-[#151515] sm:border-b-0 sm:border-r"
                    >
                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                <FaPhoneAlt size={16} />
                            </div>

                            <div>
                                <p className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                    Call Us
                                </p>

                                <p className="mt-1 font-['Barlow'] text-[13px] font-medium text-white/80">
                                    +91 98765 43210
                                </p>
                            </div>

                        </div>
                    </a>

                    {/* EMAIL */}
                    <a
                        href="mailto:hello@fitcenter.com"
                        className="group border-b border-white/10 px-6 py-5 transition-colors duration-300 hover:bg-[#151515] sm:border-b-0 sm:border-r"
                    >
                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                <IoMdMail size={16} />
                            </div>

                            <div>
                                <p className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                    Email Us
                                </p>

                                <p className="mt-1 font-['Barlow'] text-[13px] font-medium text-white/80">
                                    hello@fitcenter.com
                                </p>
                            </div>

                        </div>
                    </a>

                    {/* LOCATION */}
                    <div className="group px-6 py-5 transition-colors duration-300 hover:bg-[#151515]">

                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-[#e85d3a] transition-colors duration-300 group-hover:border-[#e85d3a]">
                                <FiMapPin size={16} />
                            </div>

                            <div>
                                <p className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                    Visit Us
                                </p>

                                <p className="mt-1 font-['Barlow'] text-[13px] font-medium text-white/80">
                                    New Delhi, India
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTACT FORM
            ====================================================== */}
            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 sm:py-7 lg:px-16 lg:py-9 xl:px-[7%]">

                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

                        {/* LEFT */}
                        <div>

                            <div className="mb-5">

                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[12px]">
                                        Send A Message
                                    </span>
                                </div>

                                <h2 className="font-['Bebas_Neue'] text-[28px] leading-[0.85] tracking-wide sm:text-[34px] md:text-[42px]">
                                    HAVE A QUESTION?

                                    <span className="block text-[#e85d3a]">
                                        WE'RE HERE TO HELP.
                                    </span>
                                </h2>

                                <p className="mt-2 max-w-[560px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                                    Fill out the form below and our team will
                                    get back to you as soon as possible.
                                </p>

                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                            >

                                {/* NAME */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45"
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
                                        className="h-11 w-full border border-white/10 bg-[#151515] px-4 font-['Barlow'] text-[12px] text-white outline-none placeholder:text-white/25 transition-all duration-300 focus:border-[#e85d3a]/70"
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="mb-1.5 block font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45"
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
                                        className="h-11 w-full border border-white/10 bg-[#151515] px-4 font-['Barlow'] text-[12px] text-white outline-none placeholder:text-white/25 transition-all duration-300 focus:border-[#e85d3a]/70"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45"
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
                                        className="h-11 w-full border border-white/10 bg-[#151515] px-4 font-['Barlow'] text-[12px] text-white outline-none placeholder:text-white/25 transition-all duration-300 focus:border-[#e85d3a]/70"
                                    />
                                </div>

                                {/* MESSAGE */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="mb-1.5 block font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45"
                                    >
                                        Your Message
                                    </label>

                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help..."
                                        className="w-full resize-none border border-white/10 bg-[#151515] px-4 py-3 font-['Barlow'] text-[12px] leading-5 text-white outline-none placeholder:text-white/25 transition-all duration-300 focus:border-[#e85d3a]/70"
                                    />
                                </div>

                                {/* BUTTON */}
                                <div className="sm:col-span-2">

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group inline-flex h-[42px] items-center gap-3 bg-[#e85d3a] px-7 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#f16a49] disabled:cursor-not-allowed disabled:opacity-60"
                                        style={{
                                            clipPath:
                                                "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                                        }}
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

                            {/* REDUX ERROR */}
                            {error && (
                                <p className="mt-3 font-['Barlow'] text-[12px] text-red-400">
                                    {error}
                                </p>
                            )}

                        </div>

                        {/* =================================================
                            CONTACT DETAILS
                        ================================================== */}
                        <div className="lg:pt-1">

                            <div className="border border-white/10 bg-[#111111]">

                                <div className="border-b border-white/10 p-5 sm:p-6">

                                    <div className="mb-3 flex h-10 w-10 items-center justify-center border border-[#e85d3a]/40 text-[#e85d3a]">
                                        <BiDumbbell size={19} />
                                    </div>

                                    <h3 className="font-['Bebas_Neue'] text-[27px] leading-none tracking-wide">
                                        VISIT OUR
                                        <span className="text-[#e85d3a]">
                                            {" "}FITNESS CENTER
                                        </span>
                                    </h3>

                                    <p className="mt-2 font-['Barlow'] text-[12px] leading-5 text-white/40">
                                        Come in, meet the team and take a look
                                        around our training space before you
                                        decide where to start.
                                    </p>

                                </div>

                                {/* ADDRESS */}
                                <div className="flex gap-3 border-b border-white/10 p-5">

                                    <FiMapPin
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#e85d3a]"
                                    />

                                    <div>
                                        <p className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-white/35">
                                            Address
                                        </p>

                                        <p className="mt-1 font-['Barlow'] text-[13px] leading-5 text-white/65">
                                            24 Fitness Avenue,
                                            <br />
                                            New Delhi, India - 110001
                                        </p>
                                    </div>

                                </div>

                                {/* HOURS */}
                                <div className="flex gap-3 border-b border-white/10 p-5">

                                    <LuClock3
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#e85d3a]"
                                    />

                                    <div className="w-full">

                                        <p className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-white/35">
                                            Opening Hours
                                        </p>

                                        <div className="mt-2 space-y-1.5 font-['Barlow'] text-[12px] text-white/55">

                                            <div className="flex justify-between">
                                                <span>Monday - Friday</span>
                                                <span className="text-white/75">
                                                    6:00 AM - 10:00 PM
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Saturday</span>
                                                <span className="text-white/75">
                                                    7:00 AM - 9:00 PM
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Sunday</span>
                                                <span className="text-[#e85d3a]">
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
                                        className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaInstagram size={15} />
                                    </a>

                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaFacebookF size={14} />
                                    </a>

                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/50 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                                    >
                                        <FaLinkedinIn size={14} />
                                    </a>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                WHY CONTACT US
            ====================================================== */}
            <section className="border-y border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 sm:py-7 lg:px-16 xl:px-[7%]">

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
                                className="border border-white/10 bg-[#151515] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/50"
                            >

                                <span className="font-['Bebas_Neue'] text-[20px] text-[#e85d3a]">
                                    {item.number}
                                </span>

                                <h3 className="mt-2 font-['Bebas_Neue'] text-[21px] leading-none tracking-wide">
                                    {item.title}
                                </h3>

                                <p className="mt-2 font-['Barlow'] text-[12px] leading-5 text-white/40">
                                    {item.text}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* =====================================================
                MAP
            ====================================================== */}
            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 sm:py-7 lg:px-16 lg:py-9 xl:px-[7%]">

                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[12px]">
                                    Find Us
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[28px] leading-none tracking-wide sm:text-[38px]">
                                OUR
                                <span className="text-[#e85d3a]">
                                    {" "}LOCATION
                                </span>
                            </h2>

                        </div>

                        <p className="max-w-[420px] font-['Barlow'] text-[12px] leading-5 text-white/40">
                            We're easy to find. Visit us at our fitness center
                            in New Delhi and let's get your training started.
                        </p>

                    </div>

                    <div className="relative h-[280px] overflow-hidden border border-white/10 bg-[#151515] sm:h-[350px] lg:h-[420px]">

                        <iframe
                            title="Fitness Center Location"
                            src="https://www.google.com/maps?q=New%20Delhi%2C%20India&output=embed"
                            className="h-full w-full grayscale-[30%] opacity-80 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="absolute bottom-4 left-4 border border-white/10 bg-[#0d0d0d]/90 px-4 py-3 backdrop-blur-md">

                            <div className="flex items-center gap-2">

                                <LuMapPin
                                    size={15}
                                    className="text-[#e85d3a]"
                                />

                                <div>

                                    <p className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                                        Fitness Center
                                    </p>

                                    <p className="mt-0.5 font-['Barlow'] text-[10px] text-white/45">
                                        New Delhi, India
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 sm:py-7 lg:px-16 lg:py-9 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:flex md:items-center md:justify-between md:gap-8 md:py-10 lg:px-14">

                        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10">

                            <p className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[11px]">
                                Your Next Step
                            </p>

                            <h2 className="mt-2 font-['Bebas_Neue'] text-[27px] leading-[0.85] tracking-wide sm:text-[36px]">
                                READY TO
                                <span className="text-[#e85d3a]">
                                    {" "}START?
                                </span>
                            </h2>

                            <p className="mt-2 max-w-[500px] font-['Barlow'] text-[12px] leading-5 text-white/40">
                                Don't wait for the perfect time. Take the first
                                step toward becoming stronger, healthier and fitter.
                            </p>

                        </div>

                        <a
                            href="tel:+919876543210"
                            className="group relative z-10 mt-5 inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] md:mt-0"
                            style={{
                                clipPath:
                                    "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                            }}
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