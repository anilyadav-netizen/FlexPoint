import React from "react";
import { ArrowUpRight, Dumbbell, HeartPulse, Users, Trophy, Check } from "lucide-react";

const WhyUs = () => {
    const reasons = [
        {
            number: "01",
            icon: Dumbbell,
            title: "EXPERT-LED TRAINING",
            text: "Train with certified coaches who understand your goals, your body and what it takes to get real results.",
        },
        {
            number: "02",
            icon: Trophy,
            title: "RESULTS THAT MATTER",
            text: "Every program is built around measurable progress — strength, endurance, confidence and long-term fitness.",
        },
        {
            number: "03",
            icon: HeartPulse,
            title: "MORE THAN A WORKOUT",
            text: "From nutrition guidance to recovery support, we help you build a healthier lifestyle beyond the gym floor.",
        },
        {
            number: "04",
            icon: Users,
            title: "A COMMUNITY THAT MOVES",
            text: "Train alongside people who motivate, challenge and support you throughout your fitness journey.",
        },
    ];

    return (
        <section id="why-us" className="relative w-full overflow-hidden bg-[#0d0d0d] py-5 text-white md:py-7 lg:py-9">
            <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#e85d3a]/5 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e85d3a]/40 to-transparent" />

            <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-[7%]">

                {/* HEADER */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-end lg:gap-8">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[2px] w-7 bg-[#e85d3a]" />
                        </div>

                        <h2 className="whitespace-nowrap text-[14px] font-bold uppercase leading-none tracking-wide text-white sm:text-[15px] md:text-[16px] lg:text-[18px]">
                            WHY <span className="text-[#e85d3a]">CHOOSE US?</span>
                        </h2>
                    </div>

                </div>

                {/* FEATURE AREA */}
                <div className="mt-7 grid grid-cols-1 border-y border-white/10 sm:mt-9 md:grid-cols-2 lg:mt-10">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <article
                                key={reason.number}
                                className={`group relative p-5 rounded-md transition-all duration-500 hover:bg-[#151515] sm:p-6 lg:p-8 ${index % 2 === 0 ? "md:border-r md:border-white/10" : ""} ${index < 2 ? "border-b border-white/10" : ""}`}
                            >
                                {/* NUMBER + ICON */}
                                <div className="flex items-start justify-between">
                                    <span className="text-[32px] font-bold leading-none text-white/10 transition-colors duration-300 group-hover:text-[#e85d3a]/30 sm:text-[38px]">
                                        {reason.number}
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center border border-[#e85d3a]/40 text-[#e85d3a] transition-all duration-300 group-hover:bg-[#e85d3a] group-hover:text-white sm:h-10 sm:w-10">
                                        <Icon size={19} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="mt-5 max-w-[500px]">
                                    <h3 className="text-[16px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[17px] md:text-[18px]">
                                        {reason.title}
                                    </h3>

                                    <p className="mt-3 text-[13px] leading-[1.65] text-white/55 sm:text-[14px] md:text-[15px]">
                                        {reason.text}
                                    </p>
                                </div>

                                {/* BOTTOM LINE */}
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="h-[2px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-10" />

                                    <span className="text-[10px] uppercase tracking-[0.12em] text-white/25 sm:text-[11px]">
                                        Fitness Center Advantage
                                    </span>
                                </div>

                                {/* HOVER ARROW */}
                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={1.4}
                                    className="absolute bottom-7 right-6 text-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e85d3a] sm:right-8"
                                />
                            </article>
                        );
                    })}
                </div>

                {/* STATS STRIP */}
                <div className="mt-7 grid grid-cols-2 border border-white/10 bg-[#111111] sm:grid-cols-4 rounded-md">
                    <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-5">
                        <div className="text-[24px] font-bold leading-none text-[#e85d3a] sm:text-[28px]">20K+</div>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45 sm:text-[11px]">Active Members</p>
                    </div>

                    <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-5">
                        <div className="text-[24px] font-bold leading-none text-[#e85d3a] sm:text-[28px]">50+</div>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45 sm:text-[11px]">Expert Trainers</p>
                    </div>

                    <div className="border-r border-white/10 p-4 sm:p-5">
                        <div className="text-[24px] font-bold leading-none text-[#e85d3a] sm:text-[28px]">100+</div>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45 sm:text-[11px]">Weekly Classes</p>
                    </div>

                    <div className="p-4 sm:p-5">
                        <div className="text-[24px] font-bold leading-none text-[#e85d3a] sm:text-[28px]">10+</div>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45 sm:text-[11px]">Years Experience</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-3 sm:mt-8 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <Check size={15} className="text-[#e85d3a]" />

                        <span className="text-[12px] text-white/50 sm:text-[13px]">
                            Your goals. Our expertise. One stronger you.
                        </span>
                    </div>

                    <a
                        href="/about"
                        className="group flex h-[40px] items-center gap-2 bg-[#e85d3a] px-6 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49] sm:text-[11px]"
                        style={{ clipPath: "polygon(7% 0, 100% 0, 93% 100%, 0 100%)" }}
                    >
                        Discover Our Difference

                        <ArrowUpRight
                            size={15}
                            strokeWidth={1.7}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;