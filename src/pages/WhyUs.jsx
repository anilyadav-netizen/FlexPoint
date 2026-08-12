import React from "react";
import {
    ArrowUpRight,
    Dumbbell,
    HeartPulse,
    Users,
    Trophy,
    Check,
} from "lucide-react";

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
        <section
            id="why-us"
            className="relative w-full overflow-hidden bg-[#0d0d0d] py-2 text-white md:py-4 lg:py-6"
        >
            {/* Background Details */}

            <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#e85d3a]/5 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e85d3a]/40 to-transparent" />

            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= HEADER ================= */}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[0.9fr_1.1fr] md:items-end lg:gap-8">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[2px] w-6 bg-[#e85d3a]" />
                        </div>

                        <h2 className="whitespace-nowrap font-['Bebas_Neue'] text-[20px] leading-none tracking-[0.01em] text-white md:text-[40px] lg:text-[48px]">

                            WHY{" "}

                            <span className="text-[#e85d3a]">
                                CHOOSE US?
                            </span>

                        </h2>

                    </div>

                    {/* Right */}

                    <div className="max-w-[470px] md:justify-self-end">

                        <p className="font-['Barlow'] text-[9px] leading-[1.45] text-white/50 sm:text-[10px] md:text-[11px]">
                            Fitness is not just about looking stronger.
                            It's about becoming stronger in every part of
                            your life. Our center brings together expert
                            coaching, premium facilities and a community
                            that keeps you moving forward.
                        </p>

                    </div>

                </div>

                {/* ================= FEATURE AREA ================= */}

                <div className="mt-10 grid grid-cols-1 border-y border-white/10 sm:mt-12 md:grid-cols-2 lg:mt-14">

                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <article
                                key={reason.number}
                                className={`group relative p-4 md:p-6 transition-all duration-500 hover:bg-[#151515] lg:p-9 ${index % 2 === 0
                                    ? "md:border-r md:border-white/10"
                                    : ""
                                    } ${index < 2
                                        ? "border-b border-white/10"
                                        : ""
                                    }`}
                            >

                                {/* Number */}

                                <div className="flex items-start justify-between">

                                    <span className="font-['Bebas_Neue'] text-[40px] leading-none text-white/10 transition-colors duration-300 group-hover:text-[#e85d3a]/30 sm:text-[46px]">
                                        {reason.number}
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center border border-[#e85d3a]/40 text-[#e85d3a] transition-all duration-300 group-hover:bg-[#e85d3a] group-hover:text-white">
                                        <Icon
                                            size={18}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                </div>

                                {/* Content */}

                                <div className="mt-4 max-w-[420px] md:mt-6">

                                    <h3 className="font-['Bebas_Neue'] text-[25px] leading-none tracking-wide text-white sm:text-[28px] lg:text-[30px]">
                                        {reason.title}
                                    </h3>

                                    <p className="mt-3 font-['Barlow'] text-[10px] leading-[1.65] text-white/50 sm:text-[11px] sm:leading-[1.7]">
                                        {reason.text}
                                    </p>

                                </div>

                                {/* Bottom Line */}

                                <div className="mt-7 flex items-center gap-2 sm:mt-8">

                                    <span className="h-[2px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-10" />

                                    <span className="font-['Barlow'] text-[8px] uppercase tracking-[0.15em] text-white/25">
                                        Fitness Center Advantage
                                    </span>

                                </div>

                                {/* Hover Arrow */}

                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={1.4}
                                    className="absolute bottom-7 right-6 text-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e85d3a] sm:right-8"
                                />

                            </article>
                        );
                    })}

                </div>

                {/* ================= STATS STRIP ================= */}

                <div className="mt-8 grid grid-cols-2 border border-white/10 bg-[#111111] sm:grid-cols-4">

                    <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-5">
                        <div className="font-['Bebas_Neue'] text-[28px] leading-none text-[#e85d3a] sm:text-[34px]">
                            20K+
                        </div>
                        <p className="mt-1 font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/40">
                            Active Members
                        </p>
                    </div>

                    <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:p-5">
                        <div className="font-['Bebas_Neue'] text-[28px] leading-none text-[#e85d3a] sm:text-[34px]">
                            50+
                        </div>
                        <p className="mt-1 font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/40">
                            Expert Trainers
                        </p>
                    </div>

                    <div className="border-r border-white/10 p-4 sm:p-5">
                        <div className="font-['Bebas_Neue'] text-[28px] leading-none text-[#e85d3a] sm:text-[34px]">
                            100+
                        </div>
                        <p className="mt-1 font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/40">
                            Weekly Classes
                        </p>
                    </div>

                    <div className="p-4 sm:p-5">
                        <div className="font-['Bebas_Neue'] text-[28px] leading-none text-[#e85d3a] sm:text-[34px]">
                            10+
                        </div>
                        <p className="mt-1 font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/40">
                            Years Experience
                        </p>
                    </div>

                </div>

                {/* ================= CTA ================= */}

                <div className="mt-8 flex flex-col items-start justify-between gap-5 border-b border-white/10 pb-2 sm:mt-10 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-2">

                        <Check
                            size={14}
                            className="text-[#e85d3a]"
                        />

                        <span className="font-['Barlow'] text-[9px] text-white/45 sm:text-[10px]">
                            Your goals. Our expertise. One stronger you.
                        </span>

                    </div>

                    <a
                        href="/about"
                        className="group flex h-[40px] items-center gap-2 bg-[#e85d3a] px-6 font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                        style={{
                            clipPath:
                                "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                        }}
                    >
                        Discover Our Difference

                        <ArrowUpRight
                            size={14}
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