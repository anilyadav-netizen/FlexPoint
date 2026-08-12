import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const Privacy = () => {
    return (
        <main className=" bg-[#0d0d0d] text-white">

            {/* ================= HERO ================= */}

            <section className="border-b border-white/10">

                <div className="mx-auto max-w-[90rem] px-6 py-2 sm:px-10 lg:px-16 md:py-8 xl:px-[7%]">

                    <div className="mx-auto max-w-[95rem] text-center">

                        {/* Small Label */}

                        <div className="mb-4 flex items-center justify-center gap-2 mt-6">

                            <span className="h-[2px] w-7 bg-[#e85d3a]" />

                            <span className="font-['Barlow'] text-[14px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                Fitness Centers
                            </span>

                            <span className="h-[2px] w-7 bg-[#e85d3a]" />

                        </div>

                        {/* Heading */}

                        <h1 className="font-['Bebas_Neue'] text-[25px] leading-[0.9] tracking-[0.02em] md:text-[34px]">

                            PRIVACY{" "}

                            <span className="text-[#e85d3a]">
                                POLICY.
                            </span>

                        </h1>

                        {/* Description */}

                        <p className="mx-auto mt-5 max-w-[680px] font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                            Your privacy matters to us. This policy explains how
                            Fitness Centers collects, uses and protects your
                            information when you use our website and services.
                        </p>

                        {/* Updated */}

                        <p className="mt-4 font-['Barlow'] text-[14px] font-medium uppercase tracking-[0.08em] text-white/35">
                            Last updated: August 4, 2026
                        </p>

                    </div>

                </div>

            </section>

            {/* ================= CONTENT ================= */}

            <section className="mx-auto max-w-[90rem] px-6 py-2 sm:px-10 lg:px-16 md:py-8 xl:px-[7%]">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,820px)] lg:justify-center lg:gap-14 xl:grid-cols-[230px_minmax(0,820px)]">

                    {/* ================= SIDEBAR ================= */}

                    <aside className="hidden lg:block">

                        <div className="sticky top-24">

                            <p className="mb-4 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                On this page
                            </p>

                            <nav className="flex flex-col border-l border-white/10">

                                <a
                                    href="#information"
                                    className="border-l-2 border-[#e85d3a] py-2 pl-4 font-['Barlow'] text-[14px] text-white"
                                >
                                    Information We Collect
                                </a>

                                <a
                                    href="#use"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    How We Use Information
                                </a>

                                <a
                                    href="#sharing"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Information Sharing
                                </a>

                                <a
                                    href="#security"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Data Security
                                </a>

                                <a
                                    href="#rights"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Your Rights
                                </a>

                                <a
                                    href="#contact"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Contact Us
                                </a>

                            </nav>

                        </div>

                    </aside>

                    {/* ================= MAIN CONTENT ================= */}

                    <article className="w-full max-w-[820px]">

                        {/* ================= INTRO ================= */}

                        <div className="mb-8 border-l-2 border-[#e85d3a] bg-[#151515] px-5 py-5 sm:px-6">

                            <p className="font-['Barlow'] text-[14px] leading-6 text-white/60 sm:text-[15px] sm:leading-7">
                                We respect your privacy and are committed to
                                protecting the personal information you share
                                with us. This policy describes the information
                                we collect and how we use it.
                            </p>

                        </div>

                        {/* ================= 01 ================= */}

                        <section
                            id="information"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                01
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                INFORMATION WE COLLECT
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                When you contact us, book a consultation or
                                request our services, we may collect information
                                such as your name, email address, phone number
                                and information relevant to your fitness goals.
                            </p>

                            <p className="mt-3 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                We may also collect basic technical information
                                about how you interact with our website, such as
                                browser type, device information and pages visited.
                            </p>

                        </section>

                        {/* ================= 02 ================= */}

                        <section
                            id="use"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                02
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                HOW WE USE YOUR INFORMATION
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Information you provide may be used to respond
                                to enquiries, schedule consultations, provide
                                fitness services and communicate with you about
                                your experience.
                            </p>

                            <ul className="mt-4 space-y-3">

                                {[
                                    "Respond to your questions and enquiries.",
                                    "Manage consultations and training sessions.",
                                    "Improve our website and services.",
                                    "Send relevant service-related communication.",
                                ].map((item) => (

                                    <li
                                        key={item}
                                        className="flex gap-3 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7"
                                    >

                                        <span className="mt-2 flex h-4 w-4 shrink-0 items-center justify-center bg-[#e85d3a]">

                                            <FaCheck
                                                size={8}
                                                className="text-white"
                                            />

                                        </span>

                                        {item}

                                    </li>

                                ))}

                            </ul>

                        </section>

                        {/* ================= 03 ================= */}

                        <section
                            id="sharing"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                03
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                INFORMATION SHARING
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                We do not sell your personal information. We may
                                share information with trusted service providers
                                when necessary to operate our website, process
                                bookings or provide requested services.
                            </p>

                        </section>

                        {/* ================= 04 ================= */}

                        <section
                            id="security"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                04
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                DATA SECURITY
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                We take reasonable steps to protect personal
                                information from unauthorized access, misuse,
                                alteration or disclosure. However, no method of
                                transmitting information online can be guaranteed
                                to be completely secure.
                            </p>

                        </section>

                        {/* ================= 05 ================= */}

                        <section
                            id="rights"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                05
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                YOUR RIGHTS
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Depending on applicable law, you may have rights
                                regarding the personal information we hold about
                                you, including requesting access, correction or
                                deletion of your information.
                            </p>

                        </section>

                        {/* ================= CONTACT ================= */}

                        <section
                            id="contact"
                            className="scroll-mt-24 border border-white/10 bg-[#151515] p-6 sm:p-8"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                06 · CONTACT
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                QUESTIONS ABOUT PRIVACY?
                            </h2>

                            <p className="mt-4 max-w-[560px] font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                If you have questions about this Privacy Policy
                                or how your information is handled, we'd be happy
                                to help.
                            </p>

                            <a
                                href="mailto:hello@fitnesscenters.com"
                                className="mt-5 inline-flex items-center bg-[#e85d3a] px-6 py-3 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Contact Us
                            </a>

                        </section>

                    </article>

                </div>

            </section>

        </main>
    );
};

export default Privacy;