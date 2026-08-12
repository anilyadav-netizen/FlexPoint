import React from "react";
import image1 from "../assets/Images/image1.jpg";
import image2 from "../assets/Images/image2.jpg";
import image3 from "../assets/Images/image3.jpg";
import image4 from "../assets/Images/image4.jpg";
import image5 from "../assets/Images/image5.jpg";
import image6 from "../assets/Images/image6.jpg";

import {
    Dumbbell,
    HeartPulse,
    Leaf,
    CircleGauge,
    Users,
    PersonStanding,
    ArrowRight,
} from "lucide-react";

const Program = () => {
    const programs = [
        {
            title: "STRENGTH",
            subtitle: "TRAINING",
            description: (
                <>
                    Build muscle,
                    <br />
                    increase strength
                </>
            ),
            icon: Dumbbell,
            image: image1,
        },

        {
            title: "HIIT &",
            subtitle: "CARDIO",
            description: (
                <>
                    Burn fat & improve
                    <br />
                    endurance
                </>
            ),
            icon: HeartPulse,
            image: image2,
        },

        {
            title: "YOGA &",
            subtitle: "FLEXIBILITY",
            description: (
                <>
                    Improve flexibility
                    <br />
                    & reduce stress
                </>
            ),
            icon: Leaf,
            image: image3,
        },

        {
            title: "FUNCTIONAL",
            subtitle: "TRAINING",
            description: (
                <>
                    Train for everyday
                    <br />
                    performance
                </>
            ),
            icon: CircleGauge,
            image: image4,
        },

        {
            title: "GROUP",
            subtitle: "CLASSES",
            description: (
                <>
                    Fun & effective
                    <br />
                    workouts
                </>
            ),
            icon: Users,
            image: image5,
        },

        {
            title: "PILATES &",
            subtitle: "CORE",
            description: (
                <>
                    Strengthen core
                    <br />
                    & improve posture
                </>
            ),
            icon: PersonStanding,
            image: image6,
        },
    ];

    return (
        <section
            id="programs"
            className="w-full overflow-hidden bg-[#0d0d0d] py-3 text-white sm:py-4 md:py-6 lg:py-8"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= SECTION HEADING ==Ad=============== */}

                <div className="mb-6 text-center sm:mb-7 md:mb-8">

                    <h2 className="font-['Bebas_Neue'] text-[30px] leading-none tracking-[0.01em] text-white sm:text-[34px] md:text-[38px] lg:text-[42px]">
                        EXPLORE OUR{" "}
                        <span className="text-[#e85d3a]">
                            PROGRAMS
                        </span>
                    </h2>

                    <p className="mt-1.5 font-['Barlow'] text-[11px] leading-5 text-white/60 sm:text-[12px]">
                        Diverse training options for every fitness level and
                        goal.
                    </p>

                </div>

                {/* ================= PROGRAM GRID ================= */}

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-2.5 xl:gap-3">

                    {programs.map((program) => {
                        const Icon = program.icon;

                        return (
                            <article
                                key={program.title}
                                className="group relative h-[235px] overflow-hidden border border-white/15 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] sm:h-[245px] md:h-[255px] lg:h-[188px] xl:h-[205px]"
                            >

                                {/* Background Image */}

                                <img
                                    src={program.image}
                                    alt={`${program.title} ${program.subtitle}`}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Image Overlay */}

                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[#080808]/95" />

                                {/* Extra Hover Overlay */}

                                <div className="absolute inset-0 bg-[#e85d3a]/0 transition-colors duration-300 group-hover:bg-[#e85d3a]/5" />

                                {/* ================= CARD CONTENT ================= */}

                                <div className="relative z-10 flex h-full flex-col justify-between p-3.5 sm:p-4 lg:p-3 xl:p-3.5">

                                    {/* Icon */}

                                    <div className="flex h-7 w-7 items-center justify-center text-[#e85d3a] sm:h-8 sm:w-8 lg:h-7 lg:w-7">
                                        <Icon
                                            size={24}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Bottom Content */}

                                    <div>

                                        <h3 className="font-['Bebas_Neue'] text-[22px] leading-[0.88] tracking-wide text-white sm:text-[24px] lg:text-[19px] xl:text-[21px]">
                                            {program.title}
                                            <br />
                                            <span className="text-white">
                                                {program.subtitle}
                                            </span>
                                        </h3>

                                        <p className="mt-2 font-['Barlow'] text-[9px] leading-[1.45] text-white/65 sm:text-[10px] lg:mt-1.5 lg:text-[8px] xl:text-[9px]">
                                            {program.description}
                                        </p>

                                        {/* Arrow */}

                                        <div className="mt-2.5 flex justify-end sm:mt-3 lg:mt-2">
                                            <span className="flex h-5 w-5 items-center justify-center text-[#e85d3a] transition-transform duration-300 group-hover:translate-x-1">
                                                <ArrowRight
                                                    size={17}
                                                    strokeWidth={1.7}
                                                />
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                {/* Orange Bottom Accent */}

                                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                            </article>
                        );
                    })}

                </div>

                {/* ================= VIEW ALL BUTTON ================= */}

                <div className="mt-5 flex justify-center sm:mt-6 md:mt-7">

                    <a
                        href="/programs"
                        className="group flex h-[40px] items-center gap-2 border border-[#e85d3a] bg-transparent px-6 font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#e85d3a] hover:text-white sm:h-[42px] sm:px-7 sm:text-[10px]"
                        style={{
                            clipPath:
                                "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                        }}
                    >
                        View All Programs

                        <ArrowRight
                            size={14}
                            strokeWidth={1.6}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>

                </div>

            </div>
        </section>
    );
};

export default Program;