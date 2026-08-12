import React from "react";
import { FaCheck } from "react-icons/fa";

const Terms = () => {
    return (
        <main className="bg-[#0d0d0d] text-white ">

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

                            TERMS{" "}

                            <span className="text-[#e85d3a]">
                                & CONDITIONS.
                            </span>

                        </h1>

                        {/* Description */}

                        <p className="mx-auto mt-5 max-w-[680px] font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                            These terms explain the rules and conditions that apply
                            when you access or use our website, services and fitness
                            programs.
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
                                    href="#acceptance"
                                    className="border-l-2 border-[#e85d3a] py-2 pl-4 font-['Barlow'] text-[14px] text-white"
                                >
                                    Acceptance of Terms
                                </a>

                                <a
                                    href="#services"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Our Services
                                </a>

                                <a
                                    href="#responsibilities"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    User Responsibilities
                                </a>

                                <a
                                    href="#payments"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Payments & Memberships
                                </a>

                                <a
                                    href="#liability"
                                    className="border-l-2 border-transparent py-2 pl-4 font-['Barlow'] text-[14px] text-white/45 transition-colors hover:text-white"
                                >
                                    Liability
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
                                By accessing or using Fitness Centers, you agree
                                to follow these Terms & Conditions. Please read
                                them carefully before using our website or services.
                            </p>

                        </div>


                        {/* ================= 01 ================= */}

                        <section
                            id="acceptance"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                01
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                ACCEPTANCE OF TERMS
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                By visiting our website, submitting an enquiry,
                                booking a consultation or using any of our services,
                                you acknowledge that you have read, understood and
                                agreed to these Terms & Conditions.
                            </p>

                            <p className="mt-3 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                If you do not agree with these terms, please do not
                                use our website or services.
                            </p>

                        </section>


                        {/* ================= 02 ================= */}

                        <section
                            id="services"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                02
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                OUR SERVICES
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Fitness Centers provides fitness-related services,
                                training programs, consultations and other wellness
                                services as described on our website.
                            </p>

                            <ul className="mt-4 space-y-3">

                                {[
                                    "Fitness and personal training programs.",
                                    "Consultations and fitness assessments.",
                                    "Training sessions and scheduled programs.",
                                    "Other fitness-related services offered by us.",
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
                            id="responsibilities"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                03
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                USER RESPONSIBILITIES
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                When using our website or services, you agree to
                                provide accurate information and use our services
                                responsibly.
                            </p>

                            <ul className="mt-4 space-y-3">

                                {[
                                    "Provide accurate and up-to-date information.",
                                    "Follow reasonable instructions provided by our trainers.",
                                    "Respect our staff, trainers and other members.",
                                    "Use our website and services only for lawful purposes.",
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


                        {/* ================= 04 ================= */}

                        <section
                            id="payments"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                04
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                PAYMENTS & MEMBERSHIPS
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Memberships, training packages and other paid
                                services may be subject to specific pricing,
                                payment and cancellation terms communicated at
                                the time of purchase or booking.
                            </p>

                            <p className="mt-3 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Prices, availability and service offerings may
                                change from time to time. Any applicable terms
                                will be communicated before payment is completed.
                            </p>

                        </section>


                        {/* ================= 05 ================= */}

                        <section
                            id="liability"
                            className="mb-9 scroll-mt-24"
                        >

                            <p className="mb-2 font-['Barlow'] text-[14px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                05
                            </p>

                            <h2 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-wide sm:text-[38px]">
                                LIABILITY
                            </h2>

                            <p className="mt-4 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                Fitness activities involve physical effort and
                                individual risks. You are responsible for providing
                                accurate information about your fitness condition
                                and following appropriate professional guidance.
                            </p>

                            <p className="mt-3 font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                To the extent permitted by applicable law, Fitness
                                Centers will not be responsible for losses or damages
                                resulting from misuse of our services, failure to
                                follow instructions or circumstances outside our
                                reasonable control.
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
                                QUESTIONS ABOUT THESE TERMS?
                            </h2>

                            <p className="mt-4 max-w-[560px] font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                If you have any questions about these Terms &
                                Conditions or our services, please feel free to
                                contact our team.
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

export default Terms;
