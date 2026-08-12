import React from "react";
import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    const quickLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "About Us",
            path: "/about",
        },
        {
            name: "Programs",
            path: "/programs",
        },
        {
            name: "Trainers",
            path: "/trainers",
        },
       
        {
            name: "Blog",
            path: "/blog",
        },
        {
            name: "Contact",
            path: "/contact",
        },
    ];

    const services = [
        "Strength Training",
        "HIIT & Cardio",
        "Yoga & Flexibility",
        "Functional Training",
        "Group Classes",
    ];

    return (
        <footer className="w-full overflow-hidden border-t border-white/10 bg-[#090909] text-white">

            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= MAIN FOOTER ================= */}

                <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:py-12">

                    {/* ================= BRAND ================= */}

                    <div className="sm:col-span-2 md:col-span-1">

                        <a
                            href="/"
                            className="inline-block font-['Bebas_Neue'] text-[20px] leading-[0.82] tracking-wide"
                        >
                            FITNESS
                            <span className="block text-[#e85d3a]">
                                CENTERS
                            </span>
                        </a>

                        <p className="mt-2 max-w-[280px] font-['Barlow'] text-[14px] leading-[1.65] text-white/50">
                            Train harder. Live stronger. Build a healthier
                            lifestyle with expert coaching, premium facilities
                            and a community that keeps you moving.
                        </p>

                        {/* Social Icons */}

                        <div className="mt-6 flex items-center gap-2.5">

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            >
                                <FaInstagram size={15} />
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            >
                                <FaFacebookF size={14} />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            >
                                <FaLinkedinIn size={15} />
                            </a>

                        </div>

                    </div>

                    {/* ================= QUICK LINKS ================= */}

                    <div>

                <h3 className="font-['Barlow'] text-[15px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                    Quick Links
                </h3>

                <ul className="mt-5 space-y-3">

                    {quickLinks.map((item) => (
                        <li key={item.path}>

                            <Link
                                to={item.path}
                                className="group flex w-fit items-center gap-2 font-['Barlow'] text-[14px] text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                {item.name}

                                <FaArrowUpRightFromSquare
                                    size={10}
                                    className="translate-y-[1px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                />

                            </Link>

                        </li>
                    ))}

                </ul>

            </div>

                    {/* ================= SERVICES ================= */}

                    <div>

                        <h3 className="font-['Barlow'] text-[15px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                            Our Services
                        </h3>

                        <ul className="mt-5 space-y-3">

                            {services.map((item) => (
                                <li key={item}>

                                    <a
                                        href="#"
                                        className="font-['Barlow'] text-[14px] text-white/55 transition-colors duration-300 hover:text-white"
                                    >
                                        {item}
                                    </a>

                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* ================= CONTACT ================= */}

                    <div>

                        <h3 className="font-['Barlow'] text-[15px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                            Get In Touch
                        </h3>

                        <div className="mt-5 space-y-4">

                            {/* Address */}

                            <div className="flex items-start gap-3">

                                <FaMapMarkerAlt
                                    size={15}
                                    className="mt-1 shrink-0 text-[#e85d3a]"
                                />

                                <p className="font-['Barlow'] text-[14px] leading-5 text-white/55">
                                    24 Fitness Avenue,
                                    <br />
                                    New Delhi, India
                                </p>

                            </div>

                            {/* Phone */}

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 font-['Barlow'] text-[14px] text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                <FaPhoneAlt
                                    size={13}
                                    className="text-[#e85d3a]"
                                />

                                +91 98765 43210
                            </a>

                            {/* Email */}

                            <a
                                href="mailto:hello@fitnesscenters.com"
                                className="flex items-center gap-3 font-['Barlow'] text-[14px] text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                <FaEnvelope
                                    size={14}
                                    className="text-[#e85d3a]"
                                />

                                hello@fitnesscenters.com
                            </a>

                        </div>

                        {/* CTA */}

                        <a
                            href="/contact"
                            className="group mt-6 flex h-11 w-fit items-center gap-2 bg-[#e85d3a] px-6 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                            style={{
                                clipPath:
                                    "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                            }}
                        >
                            Start Your Journey

                            <FaArrowUpRightFromSquare
                                size={12}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />

                        </a>

                    </div>

                </div>

                {/* ================= BOTTOM BAR ================= */}

                <div className="flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">

                    <p className="font-['Barlow'] text-[14px] text-white/35">
                        © 2026 Fitness Centers. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5">

                        <a
                            href="/privacy"
                            className="font-['Barlow'] text-[14px] text-white/35 transition-colors duration-300 hover:text-white"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="/terms"
                            className="font-['Barlow'] text-[14px] text-white/35 transition-colors duration-300 hover:text-white"
                        >
                            Terms & Conditions
                        </a>

                    </div>

                </div>

            </div>

            {/* ================= ORANGE BOTTOM ACCENT ================= */}

            <div className="h-[2px] w-full bg-[#e85d3a]" />

        </footer>
    );
};

export default Footer;