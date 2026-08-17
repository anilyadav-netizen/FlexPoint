import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dumbbell,
    HeartPulse,
    Leaf,
    CircleGauge,
    Users,
    PersonStanding,
    ArrowRight,
} from "lucide-react";
import { getPrograms } from "../redux/Slicer/programSlice";

const iconMap = {
    Dumbbell,
    HeartPulse,
    Leaf,
    CircleGauge,
    Users,
    PersonStanding,
};

const ProgramPage = () => {
    const dispatch = useDispatch();

    const { program, loading, error } = useSelector(
        (state) => state.program
    );

    // Backend data ko safely array me convert
    const programs = Array.isArray(program) ? program : [];

    useEffect(() => {
        dispatch(getPrograms(true));
    }, [dispatch]);

    // Sirf active programs
    const activePrograms = programs.filter(
        (item) => item.isActive === true
    );

    return (
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-10 sm:px-10 md:py-14 lg:px-16 xl:px-[7%]">

                    <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.7fr] lg:gap-16">

                        {/* LEFT */}

                        <div>

                            <div className="mb-3 flex items-center gap-3">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[13px]">
                                    Fitness Programs
                                </span>

                            </div>

                            <h1 className="max-w-[850px] font-['Bebas_Neue'] text-[38px] leading-[0.82] tracking-wide sm:text-[48px] md:text-[60px]">

                                FIND YOUR.

                                <span className="text-[#e85d3a]">
                                    {" "}PROGRAM.
                                </span>

                            </h1>

                        </div>

                        {/* RIGHT */}

                        <div className="max-w-[500px] lg:justify-self-end">

                            <p className="font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
                                Explore our training programs designed to help
                                you build strength, improve performance and
                                achieve your fitness goals.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">

                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        {activePrograms.length} Programs
                                    </span>

                                </div>

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">

                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        Expert Training
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                PROGRAMS
            ===================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-8 sm:px-10 md:py-10 lg:px-16 xl:px-[7%]">

                    {/* HEADER */}

                    <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Explore Training
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[30px] leading-[0.85] tracking-wide sm:text-[38px] md:text-[45px]">

                                OUR

                                <span className="text-[#e85d3a]">
                                    {" "}PROGRAMS
                                </span>

                            </h2>

                        </div>

                        <p className="max-w-[430px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                            Diverse training options for every fitness level
                            and goal.
                        </p>

                    </div>

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading && (

                        <div className="flex min-h-[350px] items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                                <p className="mt-4 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
                                    Loading Programs...
                                </p>

                            </div>

                        </div>

                    )}

                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {!loading && error && (

                        <div className="flex min-h-[350px] items-center justify-center">

                            <p className="font-['Barlow'] text-sm text-red-400">
                                {error}
                            </p>

                        </div>

                    )}

                    {/* =================================================
                        EMPTY
                    ================================================= */}

                    {!loading &&
                        !error &&
                        activePrograms.length === 0 && (

                            <div className="border border-white/10 bg-[#151515] py-24 text-center">

                                <p className="font-['Bebas_Neue'] text-[30px] text-white/40">
                                    NO PROGRAMS AVAILABLE.
                                </p>

                                <p className="mt-2 font-['Barlow'] text-[12px] text-white/30 sm:text-[13px]">
                                    Programs will appear here once added
                                    from the admin panel.
                                </p>

                            </div>
                        )}

                    {/* =================================================
                        PROGRAM GRID
                    ================================================= */}

                    {!loading &&
                        !error &&
                        activePrograms.length > 0 && (

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {activePrograms.map((item) => {

                                    const Icon =
                                        iconMap[item.icon] || Dumbbell;

                                    return (

                                        <article
                                            key={item._id}
                                            className="group relative h-[330px] overflow-hidden border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                                        >

                                            {/* IMAGE */}

                                            {item.image ? (

                                                <img
                                                    src={item.image}
                                                    alt={`${item.title || ""} ${item.subtitle || ""}`}
                                                    loading="lazy"
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />

                                            ) : (

                                                <div className="absolute inset-0 bg-[#151515]" />

                                            )}

                                            {/* OVERLAY */}

                                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-[#080808]/95" />

                                            <div className="absolute inset-0 bg-[#e85d3a]/0 transition-colors duration-300 group-hover:bg-[#e85d3a]/5" />

                                            {/* CONTENT */}

                                            <div className="relative z-10 flex h-full flex-col justify-between p-5">

                                                {/* ICON */}

                                                <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/20 text-[#e85d3a] backdrop-blur-sm">

                                                    <Icon
                                                        size={25}
                                                        strokeWidth={1.5}
                                                    />

                                                </div>

                                                {/* BOTTOM */}

                                                <div>

                                                    <h3 className="font-['Bebas_Neue'] text-[28px] leading-[0.88] tracking-wide text-white">

                                                        {item.title}

                                                        {item.subtitle && (
                                                            <>
                                                                <br />

                                                                <span className="text-white">
                                                                    {item.subtitle}
                                                                </span>
                                                            </>
                                                        )}

                                                    </h3>

                                                    {item.description && (

                                                        <p className="mt-3 font-['Barlow'] text-[11px] leading-[1.55] text-white/55">

                                                            {item.description}

                                                        </p>

                                                    )}

                                                    <div className="mt-4 flex items-center justify-between">

                                                        <span className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                                            Active Program
                                                        </span>

                                                        <span className="flex h-7 w-7 items-center justify-center text-[#e85d3a] transition-transform duration-300 group-hover:translate-x-1">

                                                            <ArrowRight
                                                                size={17}
                                                                strokeWidth={1.7}
                                                            />

                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* ACCENT */}

                                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                                        </article>

                                    );
                                })}

                            </div>
                        )}

                </div>

            </section>

            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-8 sm:px-10 md:py-10 lg:px-16 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:py-10 lg:px-14">

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">

                                <p className="mb-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.14em] text-[#e85d3a]">
                                    Start Your Journey
                                </p>

                                <h2 className="font-['Bebas_Neue'] text-[30px] leading-[0.85] tracking-wide sm:text-[40px] md:text-[48px]">

                                    READY TO

                                    <span className="text-[#e85d3a]">
                                        {" "}TRAIN?
                                    </span>

                                </h2>

                                <p className="mt-3 max-w-[560px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                                    Choose a program that fits your goals and
                                    start building a stronger version of yourself.
                                </p>

                            </div>

                            <a
                                href="/contact"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Get Started

                                <ArrowRight
                                    size={10}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </a>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default ProgramPage;