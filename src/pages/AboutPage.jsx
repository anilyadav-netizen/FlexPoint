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

    return (
        <main className="mt-[0px] overflow-hidden bg-[#0d0d0d] text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative border-b border-white/10">

                <div className="mx-auto max-w-[100rem] px-5 py-4 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

                        {/* LEFT */}

                        <div>

                            <div className="mb-5 flex items-center gap-3">

                                <span className="h-[2px] w-9 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[13px]">
                                    About Fitness Centers
                                </span>

                            </div>

                            <h1 className="font-['Bebas_Neue'] text-[32px] leading-[0.82] tracking-[0.015em]  md:text-[60px] lg:text-[80px]">

                                MORE THAN

                                <span className="block text-[#e85d3a]">
                                    A WORKOUT.
                                </span>

                            </h1>

                            <p className="mt-3 max-w-[570px] font-['Barlow'] text-[15px] leading-7 text-white/55 sm:text-[16px] sm:leading-7">
                                Fitness Centers is built for people who want
                                more from training — more strength, more
                                confidence, more energy and a healthier way
                                to live.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-4">

                                <Link
                                    to="/programs"
                                    className="group flex h-[46px] items-center gap-3 bg-[#e85d3a] px-7 font-['Barlow'] text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                                    style={{
                                        clipPath:
                                            "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                                    }}
                                >
                                    Explore Programs

                                    <FaArrowRight
                                        size={11}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />

                                </Link>

                                <Link
                                    to="/contact"
                                    className="flex h-[46px] items-center border border-white/15 px-7 font-['Barlow'] text-[13px] font-semibold uppercase tracking-[0.08em] text-white/75 transition-all duration-300 hover:border-[#e85d3a] hover:text-[#e85d3a]"
                                >
                                    Get In Touch
                                </Link>

                            </div>

                        </div>


                        {/* RIGHT IMAGE */}

                        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">

                            {/* Orange offset block */}

                            <div className="absolute -right-3 -top-3 h-full w-full border border-[#e85d3a]/40 sm:-right-4 sm:-top-4" />

                            <div className="relative h-[390px] overflow-hidden border border-white/10 bg-[#151515] sm:h-[470px] lg:h-[510px]">

                                <img
                                    src={MobileImage}
                                    alt="Fitness Center training"
                                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                {/* Image Label */}

                                <div className="absolute bottom-5 left-5">

                                    <p className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e85d3a]">
                                        EST. FOR PROGRESS
                                    </p>

                                    <p className="mt-1 font-['Bebas_Neue'] text-[28px] leading-none tracking-wide text-white">
                                        STRONGER EVERY DAY.
                                    </p>

                                </div>

                            </div>

                            {/* Floating number */}

                            <div className="absolute -bottom-5 -left-4 hidden h-[92px] w-[115px] flex-col justify-center border border-white/10 bg-[#151515] px-5 sm:flex">

                                <span className="font-['Bebas_Neue'] text-[38px] leading-none text-[#e85d3a]">
                                    10+
                                </span>

                                <span className="mt-1 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
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

                <div className="mx-auto max-w-[100rem] px-5 py-4 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="grid gap-4 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">

                        {/* Label */}

                        <div>

                            <p className="font-['Barlow'] text-[15px] font-bold uppercase tracking-[0.18em] text-[#e85d3a]">
                                01 — Our Philosophy
                            </p>

                            <div className="mt-4 h-px w-full max-w-[180px] bg-white/10" />

                        </div>


                        {/* Statement */}

                        <div>

                            <h2 className="max-w-[900px] font-['Bebas_Neue'] text-[20px] leading-[0.9] tracking-wide md:text-[40px] lg:text-[52px]">

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

                            <p className="mt-3 max-w-[720px] font-['Barlow'] text-[14px] leading-7 text-white/45 sm:text-[15px]">
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
            <section>

                <div className="mx-auto max-w-[100rem] px-5 py-4 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    {/* Heading */}

                    <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-3 flex items-center gap-3">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a]">
                                    What We Stand For
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[28px] leading-[0.85] tracking-wide md:text-[52px]">

                                BUILT AROUND
                                <span className="text-[#e85d3a]">
                                    {" "}YOU.
                                </span>

                            </h2>

                        </div>

                        <p className="max-w-[430px] font-['Barlow'] text-[14px] leading-6 text-white/40">
                            No shortcuts. No complicated promises. Just a
                            better environment to train, improve and stay
                            consistent.
                        </p>

                    </div>


                    {/* Cards */}

                    <div className="grid gap-3 md:grid-cols-3">

                        {values.map((value) => {

                            const Icon = value.icon;

                            return (
                                <article
                                    key={value.number}
                                    className="group relative overflow-hidden border border-white/10 bg-[#151515] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/50 sm:p-7"
                                >

                                    {/* Top line */}

                                    <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-full" />

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center bg-[#e85d3a] text-white">
                                            <Icon size={18} />
                                        </div>

                                        <span className="font-['Bebas_Neue'] text-[25px] text-white/15">
                                            {value.number}
                                        </span>

                                    </div>

                                    <h3 className="mt-7 font-['Bebas_Neue'] text-[27px] leading-none tracking-wide">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 font-['Barlow'] text-[14px] leading-6 text-white/40">
                                        {value.text}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">

                                        <FaCheck size={9} />

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

                <div className="mx-auto max-w-[100rem] px-5 py-3 sm:px-8 md:py-6 lg:px-12 xl:px-[7%]">

                    <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

                        <div>

                            <p className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.18em] text-[#e85d3a]">
                                02 — The Experience
                            </p>

                            <h2 className="mt-4 max-w-[720px] font-['Bebas_Neue'] text-[26px] leading-[0.84] tracking-wide md:text-[52px]">

                                TRAIN HARD.

                                <br />

                                <span className="text-[#e85d3a]">
                                    FEEL STRONG.
                                </span>

                                <br />

                                LIVE BETTER.

                            </h2>

                            <p className="mt-3 max-w-[600px] font-['Barlow'] text-[14px] leading-7 text-white/45 sm:text-[15px]">
                                From your first session to your next personal
                                best, our center is designed to keep you
                                motivated. Quality equipment, expert support
                                and a community that understands what it takes
                                to keep going.
                            </p>

                            <div className="mt-4 grid max-w-[570px] grid-cols-1 gap-3 sm:grid-cols-2">

                                {[
                                    "Premium Equipment",
                                    "Expert Coaching",
                                    "Flexible Programs",
                                    "Supportive Community",
                                ].map((item) => (

                                    <div
                                        key={item}
                                        className="flex items-center gap-3 border border-white/10 bg-[#151515] px-4 py-3"
                                    >

                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#e85d3a] text-white">
                                            <FaCheck size={8} />
                                        </span>

                                        <span className="font-['Barlow'] text-[13px] font-semibold text-white/65">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Right visual */}

                        <div className="relative">

                            <div className="absolute -bottom-3 -left-3 h-full w-full border border-[#e85d3a]/30" />

                            <div className="relative overflow-hidden border border-white/10">

                                <img
                                    src={MobileImage}
                                    alt="Fitness training experience"
                                    className="h-[390px] w-full object-cover sm:h-[470px] lg:h-[500px]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />

                                <div className="absolute bottom-5 left-5">

                                    <div className="flex items-center gap-2">

                                        <FaBolt
                                            size={12}
                                            className="text-[#e85d3a]"
                                        />

                                        <span className="font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.15em] text-white">
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

                <div className="mx-auto max-w-[100rem] px-5 py-4 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-10 sm:px-10 md:py-12 lg:px-14">

                        {/* Decorative orange block */}

                        <div className="absolute right-0 top-0 h-full w-[5px] bg-[#e85d3a]" />

                        <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[720px]">

                                <p className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.18em] text-[#e85d3a]">
                                    Ready To Begin?
                                </p>

                                <h2 className="mt-3 font-['Bebas_Neue'] text-[26px] leading-[0.85] tracking-wide md:text-[52px]">

                                    YOUR STRONGER
                                    <span className="text-[#e85d3a]">
                                        {" "}STARTS NOW.
                                    </span>

                                </h2>

                                <p className="mt-4 max-w-[570px] font-['Barlow'] text-[14px] leading-6 text-white/40">
                                    Find the program that fits your goals and
                                    take the first step toward becoming your
                                    strongest self.
                                </p>

                            </div>


                            <Link
                                to="/contact"
                                className="group flex h-[48px] shrink-0 items-center justify-center gap-3 bg-[#e85d3a] px-8 font-['Barlow'] text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                                style={{
                                    clipPath:
                                        "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                                }}
                            >

                                JOIN THE CENTER

                                <FaArrowRight
                                    size={11}
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