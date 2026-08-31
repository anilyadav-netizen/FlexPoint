import React from "react";
import {
    UserRound,
    Dumbbell,
    HeartPulse,
    Users,
    Check,
    ArrowRight,
} from "lucide-react";

import AboutImage from "../assets/Images/About.png";

const About = () => {
    const benefits = [
        {
            icon: UserRound,
            title: "EXPERT TRAINERS",
            text: "Certified professionals dedicated to your success",
        },
        {
            icon: Dumbbell,
            title: "PREMIUM EQUIPMENT",
            text: "Top-quality equipment for safe and effective workouts",
        },
        {
            icon: HeartPulse,
            title: "FLEXIBLE CLASSES",
            text: "100+ classes every week for all levels",
        },
        {
            icon: Users,
            title: "SUPPORTIVE COMMUNITY",
            text: "A positive environment that keeps you motivated",
        },
    ];

    const features = [
        "State-of-the-art infrastructure",
        "Personalized programs for all goals",
        "Nutrition guidance and wellness support",
        "Friendly and motivating environment",
    ];

    return (
        <section
            id="about"
            className="w-full overflow-hidden bg-[#0d0d0d] py-5 text-white sm:py-7 md:py-9 lg:py-10"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.35fr_1.15fr] lg:items-center lg:gap-6 xl:gap-8">

                    {/* =================================================
                        WHY CHOOSE US
                    ================================================= */}

                    <div className="order-2 lg:order-1">

                        {/* Heading */}

                        <h2 className="whitespace-nowrap text-[27px] font-bold leading-none tracking-tight text-white sm:text-[30px] md:text-[34px] lg:text-[30px] xl:text-[34px]">
                            WHY CHOOSE{" "}
                            <span className="text-[#e85d3a]">
                                US?
                            </span>
                        </h2>

                        {/* Benefits */}

                        <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">

                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <div
                                        key={benefit.title}
                                        className="group flex items-start gap-2"
                                    >

                                        {/* Icon */}

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center text-[#e85d3a] sm:h-10 sm:w-10">
                                            <Icon
                                                size={24}
                                                strokeWidth={1.5}
                                            />
                                        </div>

                                        {/* Text */}

                                        <div className="pt-0.5">

                                            <h3 className="text-[14px] font-bold uppercase tracking-wide text-white md:text-[16px]">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-1 max-w-[230px] text-[12px] leading-[1.5] text-white/60 md:text-[14px]">
                                                {benefit.text}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    {/* =================================================
                        CENTER IMAGE
                    ================================================= */}

                    <div className="order-1 lg:order-2">

                        <div className="group relative overflow-hidden border border-white/10 bg-[#151515] rounded-md">

                            <img
                                src={AboutImage}
                                alt="Fitness Center Training"
                                className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[310px] md:h-[350px] lg:h-[270px] xl:h-[300px]"
                            />

                            {/* Image Overlay */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                            {/* Orange Bottom Line */}

                            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e85d3a]" />

                        </div>
                    </div>

                    {/* =================================================
                        ABOUT CONTENT
                    ================================================= */}

                    <div className="order-3">

                        {/* Heading */}

                        <h2 className="text-[27px] font-bold leading-none tracking-tight text-white sm:text-[30px] md:text-[34px] lg:text-[30px] xl:text-[34px]">
                            ABOUT OUR{" "}
                            <span className="text-[#e85d3a]">
                                FITNESS CENTER
                            </span>
                        </h2>

                        {/* Description */}

                        <p className="mt-4 max-w-[480px] text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
                            We're more than a gym. We're a community that
                            believes in helping you transform your body,
                            improve your health and uplift your life.
                        </p>

                        {/* =================================================
                            FEATURES
                        ================================================= */}

                        <div className="mt-5 space-y-3">

                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2.5"
                                >

                                    <Check
                                        size={14}
                                        strokeWidth={2.5}
                                        className="shrink-0 text-[#e85d3a]"
                                    />

                                    <span className="text-[14px] text-white/75 md:text-[15px]">
                                        {feature}
                                    </span>

                                </div>
                            ))}

                        </div>

                        {/* =================================================
                            CTA
                        ================================================= */}

                        <div className="mt-5 sm:mt-6">

                            <a
                                href="/about"
                                className="group inline-flex h-[40px] items-center gap-2 bg-[#e85d3a] px-6 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49] sm:h-[42px] sm:px-7 sm:text-[11px]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Learn More

                                <ArrowRight
                                    size={14}
                                    strokeWidth={1.8}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;