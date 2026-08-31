
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dumbbell, HeartPulse, Leaf, CircleGauge, Users, PersonStanding, ArrowRight } from "lucide-react";
import { getPrograms } from "../redux/Slicer/programSlice";

const iconMap = { Dumbbell, HeartPulse, Leaf, CircleGauge, Users, PersonStanding };

const ProgramPage = () => {
    const dispatch = useDispatch();

    const { programs, loading, error } = useSelector((state) => state.program);

    const programList = Array.isArray(programs) ? programs : [];

    useEffect(() => {
        dispatch(getPrograms(true));
    }, [dispatch]);

    const activePrograms = programList.filter(
        (item) => item?.isActive === true || item?.isActive === "true"
    );

    return (
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* HERO */}
          

            {/* PROGRAMS */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-7 sm:px-8 md:py-9 lg:px-16 xl:px-[7%]">

                    {/* HEADER */}
                    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[12px]">
                                    Explore Training
                                </span>
                            </div>

                            <h2 className="text-[14px] font-bold leading-tight tracking-wide text-white sm:text-[15px] md:text-[16px] lg:text-[18px]">
                                OUR <span className="text-[#e85d3a]">PROGRAMS</span>
                            </h2>
                        </div>

                        <p className="max-w-[430px] text-[12px] leading-[1.7] text-white/45 sm:text-[13px] md:text-[14px]">
                            Diverse training options for every fitness level and goal.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />
                                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
                                    Loading Programs...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <div className="flex min-h-[300px] items-center justify-center rounded-md border border-white/10 bg-[#151515]">
                            <p className="text-[13px] text-red-400">{error}</p>
                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading && !error && activePrograms.length === 0 && (
                        <div className="rounded-md border border-white/10 bg-[#151515] py-20 text-center">
                            <p className="text-[15px] font-bold text-white/40 sm:text-[16px]">
                                NO PROGRAMS AVAILABLE.
                            </p>

                            <p className="mt-2 text-[12px] text-white/30 sm:text-[13px]">
                                Programs will appear here once added from the admin panel.
                            </p>
                        </div>
                    )}

                    {/* PROGRAM GRID */}
                    {!loading && !error && activePrograms.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {activePrograms.map((item) => {
                                const Icon = iconMap[item?.icon] || Dumbbell;

                                return (
                                    <article
                                        key={item?._id}
                                        className="group relative h-[330px] overflow-hidden rounded-md border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                                    >
                                        {/* IMAGE */}
                                        {item?.image ? (
                                            <img
                                                src={item.image}
                                                alt={`${item?.title || ""} ${item?.subtitle || ""}`.trim() || "Fitness Program"}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
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
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/20 text-[#e85d3a] backdrop-blur-sm">
                                                <Icon size={24} strokeWidth={1.5} />
                                            </div>

                                            {/* BOTTOM */}
                                            <div>
                                                <h3 className="text-[15px] font-bold leading-tight tracking-wide text-white sm:text-[16px] md:text-[17px] lg:text-[18px]">
                                                    {item?.title || "Fitness Program"}

                                                    {item?.subtitle && (
                                                        <>
                                                            <br />
                                                            <span className="text-white">
                                                                {item.subtitle}
                                                            </span>
                                                        </>
                                                    )}
                                                </h3>

                                                {item?.description && (
                                                    <p className="mt-3 line-clamp-3 text-[12px] leading-[1.6] text-white/55 sm:text-[13px]">
                                                        {item.description}
                                                    </p>
                                                )}

                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#e85d3a] sm:text-[11px]">
                                                        Active Program
                                                    </span>

                                                    <span className="flex h-8 w-8 items-center justify-center rounded-md text-[#e85d3a] transition-transform duration-300 group-hover:translate-x-1">
                                                        <ArrowRight size={17} strokeWidth={1.7} />
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

            {/* CTA */}
            <section className="border-t border-white/10">
                <div className="mx-auto w-full max-w-[110rem] px-5 py-7 sm:px-8 md:py-9 lg:px-16 xl:px-[7%]">
                    <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#151515] px-5 py-7 sm:px-8 md:py-9 lg:px-12">

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[12px]">
                                    Start Your Journey
                                </p>

                                <h2 className="text-[14px] font-bold leading-tight tracking-wide text-white sm:text-[15px] md:text-[16px] lg:text-[18px]">
                                    READY TO <span className="text-[#e85d3a]">TRAIN?</span>
                                </h2>

                                <p className="mt-3 max-w-[560px] text-[12px] leading-[1.7] text-white/45 sm:text-[13px] md:text-[14px]">
                                    Choose a program that fits your goals and start building
                                    a stronger version of yourself.
                                </p>
                            </div>

                            <a
                                href="/contact"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-[#e85d3a] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                            >
                                Get Started

                                <ArrowRight
                                    size={12}
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
