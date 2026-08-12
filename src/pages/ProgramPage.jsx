import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Dumbbell,
    HeartPulse,
    Leaf,
    CircleGauge,
    Users,
    PersonStanding,
    Flame,
    Zap,
    Move,
    Shield,
    UserRound,
} from "lucide-react";

import image1 from "../assets/Images/image1.jpg";
import image2 from "../assets/Images/image2.jpg";
import image3 from "../assets/Images/image3.jpg";
import image4 from "../assets/Images/image4.jpg";
import image5 from "../assets/Images/image5.jpg";
import image6 from "../assets/Images/image6.jpg";

const ProgramPage = () => {
    const programs = [
        {
            number: "01",
            title: "STRENGTH",
            subtitle: "TRAINING",
            description:
                "Build lean muscle, increase strength and develop a stronger foundation through progressive resistance training.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: Dumbbell,
            image: image1,
        },
        {
            number: "02",
            title: "HIIT &",
            subtitle: "CARDIO",
            description:
                "High-intensity sessions designed to improve cardiovascular fitness, burn calories and build endurance.",
            level: "Intermediate",
            duration: "30–45 Min",
            icon: HeartPulse,
            image: image2,
        },
        {
            number: "03",
            title: "YOGA &",
            subtitle: "FLEXIBILITY",
            description:
                "Improve mobility, flexibility and body awareness while reducing stress and supporting recovery.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: Leaf,
            image: image3,
        },
        {
            number: "04",
            title: "FUNCTIONAL",
            subtitle: "TRAINING",
            description:
                "Movement-focused training that improves balance, coordination, stability and everyday performance.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: CircleGauge,
            image: image4,
        },
        {
            number: "05",
            title: "GROUP",
            subtitle: "CLASSES",
            description:
                "Train together in energetic instructor-led sessions that keep you motivated, active and accountable.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: Users,
            image: image5,
        },
        {
            number: "06",
            title: "PILATES &",
            subtitle: "CORE",
            description:
                "Build core strength, improve posture and develop better control through focused movement training.",
            level: "Beginner",
            duration: "45–50 Min",
            icon: PersonStanding,
            image: image6,
        },
        {
            number: "07",
            title: "WEIGHT",
            subtitle: "LOSS",
            description:
                "Structured workouts combining strength and conditioning to support sustainable fat loss and fitness.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: Flame,
            image: image1,
        },
        {
            number: "08",
            title: "CROSS",
            subtitle: "TRAINING",
            description:
                "A balanced combination of strength, cardio and functional movements for complete physical fitness.",
            level: "Intermediate",
            duration: "45–60 Min",
            icon: Zap,
            image: image2,
        },
        {
            number: "09",
            title: "MOBILITY &",
            subtitle: "RECOVERY",
            description:
                "Restore movement quality, release stiffness and help your body recover between demanding sessions.",
            level: "All Levels",
            duration: "30–45 Min",
            icon: Move,
            image: image3,
        },
        {
            number: "10",
            title: "BOXING &",
            subtitle: "CONDITIONING",
            description:
                "Improve speed, coordination and conditioning through boxing-inspired movement and high-energy drills.",
            level: "Intermediate",
            duration: "45–60 Min",
            icon: Shield,
            image: image4,
        },
        {
            number: "11",
            title: "PERSONAL",
            subtitle: "TRAINING",
            description:
                "One-to-one coaching built around your goals, fitness level, movement patterns and training needs.",
            level: "All Levels",
            duration: "45–60 Min",
            icon: UserRound,
            image: image5,
        },
        {
            number: "12",
            title: "ATHLETIC",
            subtitle: "PERFORMANCE",
            description:
                "Performance-focused training designed to develop power, speed, agility and overall athletic ability.",
            level: "Advanced",
            duration: "60 Min",
            icon: Dumbbell,
            image: image6,
        },
    ];

    return (
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative border-b border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-3 sm:px-10 md:py-6 lg:px-16 xl:px-[7%]">

                    <div className="grid items-end gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">

                        {/* Left */}

                        <div>

                            <div className="mb-4 flex items-center gap-2">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e85d3a] sm:text-[14px]">
                                    Fitness Center Programs
                                </span>

                            </div>

                            <h1 className="max-w-[900px] font-['Bebas_Neue'] text-[24px] leading-[0.82] tracking-[0.015em] md:text-[36px] lg:text-[48px]">

                                TRAIN YOUR

                                <span className="text-[#e85d3a]">
                                    {" "}WAY.
                                </span>

                                <br />

                                FIND YOUR
                                <span className="text-white/45">
                                    {" "}STRENGTH.
                                </span>

                            </h1>

                        </div>

                        {/* Right */}

                        <div className="max-w-[500px] lg:justify-self-end">

                            <p className="font-['Barlow'] text-[14px] leading-6 text-white/55 sm:text-[15px] sm:leading-7">
                                From building strength and losing weight to improving
                                mobility and performance, our programs are designed
                                to meet you where you are and take you further.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2.5">

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">
                                    <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.08em] text-white/70">
                                        12+ Programs
                                    </span>
                                </div>

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">
                                    <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.08em] text-white/70">
                                        All Fitness Levels
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                INTRO STRIP
            ====================================================== */}

            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto grid w-full max-w-[110rem] grid-cols-2 sm:grid-cols-4">

                    <div className="border-r border-white/10 px-5 py-7 text-center sm:py-9">
                        <p className="font-['Bebas_Neue'] text-[36px] leading-none text-[#e85d3a] sm:text-[44px]">
                            12+
                        </p>

                        <p className="mt-2 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[12px]">
                            Training Programs
                        </p>
                    </div>

                    <div className="border-r border-white/10 px-5 py-7 text-center sm:py-9">
                        <p className="font-['Bebas_Neue'] text-[36px] leading-none text-[#e85d3a] sm:text-[44px]">
                            45+
                        </p>

                        <p className="mt-2 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[12px]">
                            Weekly Sessions
                        </p>
                    </div>

                    <div className="border-r border-white/10 px-5 py-7 text-center sm:py-9">
                        <p className="font-['Bebas_Neue'] text-[36px] leading-none text-[#e85d3a] sm:text-[44px]">
                            6
                        </p>

                        <p className="mt-2 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[12px]">
                            Training Styles
                        </p>
                    </div>

                    <div className="px-5 py-7 text-center sm:py-9">
                        <p className="font-['Bebas_Neue'] text-[36px] leading-none text-[#e85d3a] sm:text-[44px]">
                            100%
                        </p>

                        <p className="mt-2 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[12px]">
                            Focused On You
                        </p>
                    </div>

                </div>

            </section>


            {/* =====================================================
                ALL PROGRAMS
            ====================================================== */}

            <section className="w-full">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-4 sm:px-10 md:py-7 lg:px-16 xl:px-[7%]">

                    {/* Header */}

                    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-3 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[13px]">
                                    Explore Every Option
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[24px] leading-[0.85] tracking-wide md:text-[50px]">

                                OUR COMPLETE

                                <span className="text-[#e85d3a]">
                                    {" "}PROGRAMS
                                </span>

                            </h2>

                        </div>

                        <p className="max-w-[470px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px]">
                            Choose a program based on your current fitness level,
                            personal goals and the kind of training you enjoy.
                        </p>

                    </div>


                    {/* Program Grid */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {programs.map((program) => {

                            const Icon = program.icon;

                            return (
                                <article
                                    key={program.number}
                                    className="group relative overflow-hidden border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                                >

                                    {/* Image */}

                                    <div className="relative h-[240px] overflow-hidden sm:h-[250px] lg:h-[230px] xl:h-[250px]">

                                        <img
                                            src={program.image}
                                            alt={`${program.title} ${program.subtitle}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/35 to-black/5" />

                                        {/* Number */}

                                        <div className="absolute left-4 top-4">

                                            <span className="font-['Bebas_Neue'] text-[22px] text-white/50">
                                                {program.number}
                                            </span>

                                        </div>

                                        {/* Icon */}

                                        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/30 text-[#e85d3a] backdrop-blur-sm">

                                            <Icon
                                                size={18}
                                                strokeWidth={1.5}
                                            />

                                        </div>

                                        {/* Title */}

                                        <div className="absolute bottom-4 left-5 right-5">

                                            <h3 className="font-['Bebas_Neue'] text-[31px] leading-[0.82] tracking-wide">

                                                {program.title}

                                                <span className="block text-[#e85d3a]">
                                                    {program.subtitle}
                                                </span>

                                            </h3>

                                        </div>

                                    </div>


                                    {/* Content */}

                                    <div className="p-5">

                                        <p className="font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px]">
                                            {program.description}
                                        </p>


                                        {/* Meta */}

                                        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">

                                            <span className="bg-[#1d1d1d] px-3 py-1.5 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.05em] text-white/55">
                                                {program.level}
                                            </span>

                                            <span className="bg-[#1d1d1d] px-3 py-1.5 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.05em] text-white/55">
                                                {program.duration}
                                            </span>

                                        </div>


                                        {/* Learn More */}

                                        <div className="mt-5 flex items-center justify-between">

                                            <span className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.1em] text-[#e85d3a]">
                                                Explore Program
                                            </span>

                                            <span className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white">

                                                <ArrowRight
                                                    size={13}
                                                    strokeWidth={1.6}
                                                />

                                            </span>

                                        </div>

                                    </div>


                                    {/* Bottom Accent */}

                                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                                </article>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* =====================================================
                TRAINING APPROACH
            ====================================================== */}

            <section className="border-y border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-4 sm:px-10 md:py-7 lg:px-16 lg:py-9 xl:px-[7%]">

                    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">

                        {/* Left */}

                        <div>

                            <div className="mb-3 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Our Approach
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[24px] leading-[0.82] tracking-wide md:text-[50px]">

                                MORE THAN

                                <span className="block text-[#e85d3a]">
                                    A WORKOUT.
                                </span>

                            </h2>

                            <p className="mt-3 max-w-[500px] font-['Barlow'] text-[14px] leading-6 text-white/45 sm:text-[15px] sm:leading-7">
                                Every program has a purpose. We combine structured
                                training, proper technique and consistent progression
                                to help you build results that last.
                            </p>

                        </div>


                        {/* Right */}

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {[
                                {
                                    number: "01",
                                    title: "START WHERE YOU ARE",
                                    text: "Programs are suitable for different experience levels so you can train with confidence.",
                                },
                                {
                                    number: "02",
                                    title: "TRAIN WITH PURPOSE",
                                    text: "Every session is built around a clear training goal instead of random exercises.",
                                },
                                {
                                    number: "03",
                                    title: "PROGRESS CONSISTENTLY",
                                    text: "Build strength, endurance and movement quality through progressive training.",
                                },
                                {
                                    number: "04",
                                    title: "KEEP MOVING FORWARD",
                                    text: "Your training can evolve as your fitness, goals and abilities change.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="border border-white/10 bg-[#151515] p-5 transition-colors duration-300 hover:border-[#e85d3a]/50"
                                >

                                    <span className="font-['Bebas_Neue'] text-[20px] text-[#e85d3a]">
                                        {item.number}
                                    </span>

                                    <h3 className="mt-3 font-['Bebas_Neue'] text-[22px] leading-none tracking-wide">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2.5 font-['Barlow'] text-[13px] leading-5 text-white/40">
                                        {item.text}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ====================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-4 sm:px-10 md:py-6 lg:px-16 lg:py-9 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-10 sm:px-10 md:px-12 md:py-12 lg:px-16">

                        {/* Background Accent */}

                        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">

                                <p className="mb-3 font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[13px]">
                                    Find Your Program
                                </p>

                                <h2 className="font-['Bebas_Neue'] text-[24px] leading-[0.85] tracking-wide md:text-[52px]">

                                    READY TO

                                    <span className="text-[#e85d3a]">
                                        {" "}GET STARTED?
                                    </span>

                                </h2>

                                <p className="mt-3 max-w-[560px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px]">
                                    Not sure which program is right for you?
                                    Talk to our team and find a training option
                                    that fits your goals and fitness level.
                                </p>

                            </div>


                            <Link
                                to="/contact"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Start Training

                                <ArrowRight
                                    size={12}
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

export default ProgramPage;