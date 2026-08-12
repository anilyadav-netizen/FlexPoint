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
            className="w-full overflow-hidden bg-[#0d0d0d] py-2 text-white md:py-4 lg:py-6"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= MAIN CONTENT ================= */}

                <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.9fr_1.35fr_1.15fr] lg:items-center lg:gap-5 xl:gap-7">

                    {/* ================= WHY CHOOSE US ================= */}

                    <div className="order-2 lg:order-1">

                        <h2 className="font-['Bebas_Neue'] text-[27px] leading-none tracking-[0.02em] text-white sm:text-[30px] md:text-[34px] lg:text-[30px] xl:text-[34px]">
                            WHY CHOOSE{" "}
                            <span className="text-[#e85d3a]">
                                US?
                            </span>
                        </h2>

                        <div className="mt-5 space-y-4 sm:mt-6 md:mt-7">

                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <div
                                        key={benefit.title}
                                        className="group flex items-start gap-3"
                                    >

                                        {/* Icon */}

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#e85d3a] sm:h-9 sm:w-9">
                                            <Icon
                                                size={23}
                                                strokeWidth={1.4}
                                            />
                                        </div>

                                        {/* Text */}

                                        <div className="pt-0.5">

                                            <h3 className="font-['Barlow'] text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-0.5 max-w-[180px] font-['Barlow'] text-[8px] leading-[1.45] text-white/55 sm:text-[9px]">
                                                {benefit.text}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    {/* ================= CENTER IMAGE ================= */}

                    <div className="order-1 lg:order-2">

                        <div className="group relative overflow-hidden border border-white/10 bg-[#151515]">

                            <img
                                src={AboutImage}
                                alt="Fitness Center Training"
                                className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[300px] md:h-[350px] lg:h-[255px] xl:h-[285px]"
                            />

                            {/* Image overlay */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                            {/* Orange bottom line */}

                            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e85d3a]" />

                        </div>

                    </div>

                    {/* ================= ABOUT CONTENT ================= */}

                    <div className="order-3">

                        <h2 className="font-['Bebas_Neue'] text-[27px] leading-none tracking-[0.02em] text-white sm:text-[30px] md:text-[34px] lg:text-[30px] xl:text-[34px]">
                            ABOUT OUR{" "}
                            <span className="text-[#e85d3a]">
                                FITNESS CENTER
                            </span>
                        </h2>

                        <p className="mt-3 max-w-[440px] font-['Barlow'] text-[10px] leading-[1.6] text-white/65 sm:text-[11px] sm:leading-[1.65]">
                            We're more than a gym. We're a community that
                            believes in helping you transform your body,
                            improve your health and uplift your life.
                        </p>

                        {/* Features */}

                        <div className="mt-4 space-y-2">

                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2"
                                >

                                    <Check
                                        size={12}
                                        strokeWidth={2.5}
                                        className="shrink-0 text-[#e85d3a]"
                                    />

                                    <span className="font-['Barlow'] text-[9px] text-white/75 sm:text-[10px]">
                                        {feature}
                                    </span>

                                </div>
                            ))}

                        </div>

                        {/* CTA */}

                        <div className="mt-4 sm:mt-5">

                            <a
                                href="/about"
                                className="group inline-flex h-[38px] items-center gap-2 bg-[#e85d3a] px-5 font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Learn More

                                <ArrowRight
                                    size={13}
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