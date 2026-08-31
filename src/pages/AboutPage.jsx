
import React from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaCheck,
    FaDumbbell,
    FaHeartPulse,
    FaUsers,
    FaBolt,
} from "react-icons/fa6";

import MobileImage from "../assets/Images/MobileImage.png";

const AboutPage = () => {
    const values = [
        {
            number: "01",
            icon: FaDumbbell,
            title: "TRAIN WITH PURPOSE",
            text: "Every workout has a reason. We focus on smart programming, proper technique and measurable progress.",
        },
        {
            number: "02",
            icon: FaHeartPulse,
            title: "BUILD REAL HEALTH",
            text: "Strength is only one part of fitness. We help you improve energy, movement, conditioning and everyday performance.",
        },
        {
            number: "03",
            icon: FaUsers,
            title: "BELONG TO A COMMUNITY",
            text: "Train around people who motivate you, challenge you and make showing up something you actually enjoy.",
        },
    ];

    const features = [
        "Premium Equipment",
        "Expert Coaching",
        "Flexible Programs",
        "Supportive Community",
    ];

    return (
        <main className="overflow-hidden bg-[#0d0d0d] text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative border-b border-white/10">
                <div className="mx-auto max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 md:py-12 lg:px-12 lg:py-14 xl:px-[7%]">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

                        {/* LEFT CONTENT */}

                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[12px]">
                                    About Fitness Centers
                                </span>
                            </div>

                            <h1 className="max-w-[600px] font-['Bebas_Neue'] text-[36px] leading-[0.85] tracking-[0.02em] sm:text-[42px] md:text-[50px] lg:text-[56px]">
                                MORE THAN
                                <span className="block text-[#e85d3a]">
                                    A WORKOUT.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-[560px] font-['Barlow'] text-[13px] leading-6 text-white/50 sm:text-[14px] sm:leading-7">
                                Fitness Centers is built for people who want
                                more from training — more strength, more
                                confidence, more energy and a healthier way
                                to live.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link
                                    to="/programs"
                                    className="group flex h-[44px] items-center gap-3 rounded-md bg-[#e85d3a] px-6 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                                >
                                    Explore Programs

                                    <FaArrowRight
                                        size={10}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/contact"
                                    className="flex h-[44px] items-center rounded-md border border-white/15 px-6 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 transition-all duration-300 hover:border-[#e85d3a] hover:text-[#e85d3a]"
                                >
                                    Get In Touch
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}

                        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
                            <div className="absolute -right-3 -top-3 h-full w-full rounded-lg border border-[#e85d3a]/40 sm:-right-4 sm:-top-4" />

                            <div className="relative h-[350px] overflow-hidden rounded-lg border border-white/10 bg-[#151515] sm:h-[420px] md:h-[450px] lg:h-[470px]">
                                <img
                                    src={MobileImage}
                                    alt="Fitness Center training"
                                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                <div className="absolute bottom-5 left-5">
                                    <p className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e85d3a]">
                                        EST. FOR PROGRESS
                                    </p>

                                    <p className="mt-1 font-['Bebas_Neue'] text-[24px] leading-none tracking-wide text-white sm:text-[27px]">
                                        STRONGER EVERY DAY.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-3 hidden h-[82px] w-[108px] flex-col justify-center rounded-md border border-white/10 bg-[#151515] px-4 sm:flex">
                                <span className="font-['Bebas_Neue'] text-[34px] leading-none text-[#e85d3a]">
                                    10+
                                </span>

                                <span className="mt-1 font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
                                    Years Of Training
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRO / BRAND STATEMENT
            ========================================================= */}

            <section className="border-b border-white/10 bg-[#111111]">
                <div className="mx-auto max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 md:py-11 lg:px-12 lg:py-12 xl:px-[7%]">
                    <div className="grid gap-7 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">

                        {/* LABEL */}

                        <div>
                            <p className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.18em] text-[#e85d3a]">
                                01 — Our Philosophy
                            </p>

                            <div className="mt-4 h-px w-full max-w-[180px] bg-white/10" />
                        </div>

                        {/* STATEMENT */}

                        <div>
                            <h2 className="max-w-[800px] font-['Bebas_Neue'] text-[20px] leading-[0.9] tracking-wide sm:text-[25px] md:text-[32px] lg:text-[38px]">
                                WE DON'T JUST HELP YOU
                                <span className="text-[#e85d3a]">
                                    {" "}WORK OUT.
                                </span>

                                <br />

                                WE HELP YOU
                                <span className="text-white/35">
                                    {" "}MOVE BETTER.
                                </span>
                            </h2>

                            <p className="mt-4 max-w-[720px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px] sm:leading-7">
                                Our approach combines structured training,
                                experienced coaches and a motivating environment
                                to create fitness that fits into real life.
                                Whether you are starting from zero or pushing
                                toward your next milestone, there is a place
                                for you here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                VALUES SECTION
            ========================================================= */}

            <section>
                <div className="mx-auto max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 md:py-11 lg:px-12 lg:py-12 xl:px-[7%]">

                    {/* HEADING */}

                    <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[12px]">
                                    What We Stand For
                                </span>
                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[26px] leading-[0.88] tracking-wide sm:text-[31px] md:text-[36px] lg:text-[42px]">
                                BUILT AROUND
                                <span className="text-[#e85d3a]">
                                    {" "}YOU.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-[430px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px]">
                            No shortcuts. No complicated promises. Just a
                            better environment to train, improve and stay
                            consistent.
                        </p>
                    </div>

                    {/* CARDS */}

                    <div className="grid gap-3 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <article
                                    key={value.number}
                                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/50 sm:p-6"
                                >
                                    <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-full" />

                                    <div className="flex items-start justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e85d3a] text-white">
                                            <Icon size={17} />
                                        </div>

                                        <span className="font-['Bebas_Neue'] text-[23px] text-white/15">
                                            {value.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 font-['Bebas_Neue'] text-[24px] leading-none tracking-wide">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 font-['Barlow'] text-[13px] leading-6 text-white/40">
                                        {value.text}
                                    </p>

                                    <div className="mt-5 flex items-center gap-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                        <FaCheck size={8} />
                                        Built For Progress
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                EXPERIENCE SECTION
            ========================================================= */}

            <section className="border-y border-white/10 bg-[#111111]">
                <div className="mx-auto max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 md:py-11 lg:px-12 lg:py-12 xl:px-[7%]">
                    <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

                        {/* LEFT */}

                        <div>
                            <p className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[12px]">
                                02 — The Experience
                            </p>

                            <h2 className="mt-4 max-w-[620px] font-['Bebas_Neue'] text-[26px] leading-[0.86] tracking-wide sm:text-[31px] md:text-[36px] lg:text-[42px]">
                                TRAIN HARD.
                                <br />
                                <span className="text-[#e85d3a]">
                                    FEEL STRONG.
                                </span>
                                <br />
                                LIVE BETTER.
                            </h2>

                            <p className="mt-4 max-w-[600px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px] sm:leading-7">
                                From your first session to your next personal
                                best, our center is designed to keep you
                                motivated. Quality equipment, expert support
                                and a community that understands what it takes
                                to keep going.
                            </p>

                            <div className="mt-5 grid max-w-[570px] grid-cols-1 gap-3 sm:grid-cols-2">
                                {features.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-md border border-white/10 bg-[#151515] px-4 py-3"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#e85d3a] text-white">
                                            <FaCheck size={8} />
                                        </span>

                                        <span className="font-['Barlow'] text-[12px] font-semibold text-white/65 sm:text-[13px]">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}

                        <div className="relative">
                            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-lg border border-[#e85d3a]/30" />

                            <div className="relative overflow-hidden rounded-lg border border-white/10">
                                <img
                                    src={MobileImage}
                                    alt="Fitness training experience"
                                    className="h-[350px] w-full object-cover sm:h-[420px] md:h-[450px] lg:h-[470px]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />

                                <div className="absolute bottom-5 left-5">
                                    <div className="flex items-center gap-2">
                                        <FaBolt
                                            size={11}
                                            className="text-[#e85d3a]"
                                        />

                                        <span className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                                            KEEP MOVING
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section>
                <div className="mx-auto max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 md:py-11 lg:px-12 lg:py-12 xl:px-[7%]">
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-11 lg:px-14">

                        {/* ACCENT */}

                        <div className="absolute right-0 top-0 h-full w-[4px] bg-[#e85d3a]" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            {/* TEXT */}

                            <div className="max-w-[680px]">
                                <p className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.18em] text-[#e85d3a]">
                                    Ready To Begin?
                                </p>

                                <h2 className="mt-3 font-['Bebas_Neue'] text-[26px] leading-[0.88] tracking-wide sm:text-[31px] md:text-[36px] lg:text-[42px]">
                                    YOUR STRONGER
                                    <span className="text-[#e85d3a]">
                                        {" "}STARTS NOW.
                                    </span>
                                </h2>

                                <p className="mt-4 max-w-[570px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px]">
                                    Find the program that fits your goals and
                                    take the first step toward becoming your
                                    strongest self.
                                </p>
                            </div>

                            {/* BUTTON */}

                            <Link
                                to="/contact"
                                className="group flex h-[46px] shrink-0 items-center justify-center gap-3 rounded-md bg-[#e85d3a] px-7 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                            >
                                JOIN THE CENTER

                                <FaArrowRight
                                    size={10}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
