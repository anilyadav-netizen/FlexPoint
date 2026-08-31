
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Dumbbell, HeartPulse, Users, Flame, Target, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../redux/Slicer/trainerSlice";

const TrainerPage = () => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState(0);

    const { trainers = [], loading, error } = useSelector((state) => state.trainer);

    useEffect(() => {
        dispatch(getTrainers());
    }, [dispatch]);

    const getTrainerIcon = (trainer) => {
        const text = `${trainer.specialty || ""} ${trainer.role || ""}`.toLowerCase();

        if (text.includes("yoga") || text.includes("mobility") || text.includes("flexibility")) return HeartPulse;
        if (text.includes("hiit") || text.includes("cardio") || text.includes("conditioning")) return Flame;
        if (text.includes("nutrition") || text.includes("fitness")) return Target;
        if (text.includes("personal") || text.includes("group")) return Users;
        if (text.includes("performance") || text.includes("pilates")) return Award;
        if (text.includes("cross") || text.includes("functional")) return ShieldCheck;

        return Dumbbell;
    };

    const activeTrainers = useMemo(() => trainers.filter((trainer) => trainer.isActive !== false), [trainers]);
    const trainersPerPage = 10;
    const totalPages = Math.ceil(activeTrainers.length / trainersPerPage);
    const currentTrainers = activeTrainers.slice(activePage * trainersPerPage, activePage * trainersPerPage + trainersPerPage);

    useEffect(() => {
        if (totalPages > 0 && activePage >= totalPages) setActivePage(0);
    }, [totalPages, activePage]);

    const totalTrainerCount = activeTrainers.length;

    const combinedExperience = useMemo(() => {
        const years = activeTrainers.reduce((total, trainer) => {
            const value = parseFloat(String(trainer.experience || "").replace(/[^\d.]/g, ""));
            return total + (Number.isNaN(value) ? 0 : value);
        }, 0);

        return years > 0 ? `${Math.round(years)}+` : "—";
    }, [activeTrainers]);

    const trainingStyles = useMemo(() => {
        const specialties = activeTrainers.map((trainer) => trainer.specialty).filter(Boolean);
        return new Set(specialties).size;
    }, [activeTrainers]);

    return (
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* HERO */}
            <section className="border-b border-white/10">
                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-7 lg:px-16 xl:px-[7%]">
                    <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />
                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e85d3a] sm:text-[12px]">
                                    Meet The Fitness Center Team
                                </span>
                            </div>

                            <h1 className="max-w-[700px] font-['Bebas_Neue'] text-[27px] leading-[0.88] tracking-wide sm:text-[32px] md:text-[38px] lg:text-[44px]">
                                TRAIN WITH <span className="text-[#e85d3a]">EXPERTS.</span>
                                <br />
                                MOVE WITH <span className="text-white/40">PURPOSE.</span>
                            </h1>
                        </div>

                        <div className="max-w-[520px] lg:justify-self-end">
                            <p className="font-['Barlow'] text-[14px] leading-6 text-white/50 sm:text-[15px]">
                                Meet the coaches behind our training floor. From strength and conditioning to mobility, yoga and performance, our trainers bring different specialties together to help you train better.
                            </p>

                            <div className="mt-4 flex flex-nowrap gap-2">
                                <div className="whitespace-nowrap rounded-md border border-white/10 bg-[#151515] px-3 py-2 sm:px-4">
                                    <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-[12px]">
                                        {totalTrainerCount}+ Trainers
                                    </span>
                                </div>

                                <div className="whitespace-nowrap rounded-md border border-white/10 bg-[#151515] px-3 py-2 sm:px-4">
                                    <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:text-[12px]">
                                        Multiple Specialties
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="border-b border-white/10 bg-[#111111]">
                <div className="mx-auto grid w-full max-w-[110rem] grid-cols-2 sm:grid-cols-4">

                    <div className="border-r border-white/10 px-4 py-6 text-center sm:py-8">
                        <p className="font-['Bebas_Neue'] text-[32px] leading-none text-[#e85d3a] sm:text-[38px]">
                            {totalTrainerCount}+
                        </p>
                        <p className="mt-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[11px]">
                            Expert Trainers
                        </p>
                    </div>

                    <div className="border-r border-white/10 px-4 py-6 text-center sm:py-8">
                        <p className="font-['Bebas_Neue'] text-[32px] leading-none text-[#e85d3a] sm:text-[38px]">
                            {combinedExperience}
                        </p>
                        <p className="mt-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[11px]">
                            Years Combined
                        </p>
                    </div>

                    <div className="border-r border-white/10 px-4 py-6 text-center sm:py-8">
                        <p className="font-['Bebas_Neue'] text-[32px] leading-none text-[#e85d3a] sm:text-[38px]">
                            {trainingStyles}+
                        </p>
                        <p className="mt-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[11px]">
                            Training Styles
                        </p>
                    </div>

                    <div className="px-4 py-6 text-center sm:py-8">
                        <p className="font-['Bebas_Neue'] text-[32px] leading-none text-[#e85d3a] sm:text-[38px]">
                            1K+
                        </p>
                        <p className="mt-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40 sm:text-[11px]">
                            Members Trained
                        </p>
                    </div>

                </div>
            </section>

            {/* TRAINER GRID */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    <div className="mb-6 flex flex-col gap-4 md:mb-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[12px]">
                                    Our Coaching Team
                                </span>
                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[26px] leading-[0.88] tracking-wide sm:text-[30px] md:text-[36px] lg:text-[40px]">
                                MEET OUR <span className="text-[#e85d3a]">EXPERT TRAINERS</span>
                            </h2>
                        </div>

                        <p className="max-w-[470px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px]">
                            Every trainer brings a different approach to the floor, but the goal remains the same — helping you become stronger, fitter and more confident.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex min-h-[280px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />
                                <p className="mt-4 font-['Barlow'] text-sm text-white/40">
                                    Loading trainers...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-5 py-12 text-center">
                            <p className="font-['Barlow'] text-sm text-red-400">{error}</p>

                            <button
                                type="button"
                                onClick={() => dispatch(getTrainers())}
                                className="mt-4 rounded-md bg-[#e85d3a] px-5 py-2.5 font-['Barlow'] text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#f16a49]"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading && !error && activeTrainers.length === 0 && (
                        <div className="rounded-lg border border-white/10 bg-[#151515] px-5 py-16 text-center">
                            <Dumbbell size={32} className="mx-auto text-[#e85d3a]" />
                            <p className="mt-4 font-['Barlow'] text-sm text-white/40">
                                No trainers available at the moment.
                            </p>
                        </div>
                    )}

                    {/* TRAINERS */}
                    {!loading && !error && activeTrainers.length > 0 && (
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">

                            {currentTrainers.map((trainer, index) => {
                                const Icon = getTrainerIcon(trainer);
                                const trainerNumber = String(activePage * trainersPerPage + index + 1).padStart(2, "0");

                                return (
                                    <article
                                        key={trainer._id || trainer.id}
                                        className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
                                    >
                                        <div className="relative h-[210px] overflow-hidden rounded-t-lg sm:h-[225px] md:h-[240px] lg:h-[205px] xl:h-[220px]">

                                            {trainer.image ? (
                                                <img
                                                    src={trainer.image}
                                                    alt={`${trainer.name} - ${trainer.role || "Trainer"}`}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover object-top grayscale-[10%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-[#202020]">
                                                    <Dumbbell size={40} strokeWidth={1} className="text-[#e85d3a]" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />
                                            <div className="absolute inset-0 bg-[#e85d3a]/0 transition-colors duration-300 group-hover:bg-[#e85d3a]/5" />

                                            <span className="absolute left-3 top-3 font-['Bebas_Neue'] text-[17px] text-white/45">
                                                {trainerNumber}
                                            </span>

                                            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-black/30 text-[#e85d3a] backdrop-blur-sm">
                                                <Icon size={15} strokeWidth={1.5} />
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <h3 className="font-['Bebas_Neue'] text-[19px] leading-none tracking-wide text-white xl:text-[21px]">
                                                    {trainer.name}
                                                </h3>

                                                <p className="mt-1 font-['Barlow'] text-[11px] font-medium text-white/65">
                                                    {trainer.role || "Fitness Trainer"}
                                                </p>

                                                <div className="mt-2 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-10" />
                                            </div>
                                        </div>

                                        <div className="p-3.5">
                                            <p className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.05em] text-[#e85d3a]">
                                                {trainer.specialty || "Fitness Training"}
                                            </p>

                                            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                                                <span className="font-['Barlow'] text-[11px] uppercase tracking-[0.05em] text-white/40">
                                                    Experience
                                                </span>

                                                <span className="font-['Barlow'] text-[11px] font-semibold text-white/65">
                                                    {trainer.experience || "—"}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />
                                    </article>
                                );
                            })}

                        </div>
                    )}

                    {/* PAGINATION */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setActivePage(index);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    aria-label={`Go to trainer page ${index + 1}`}
                                    className={`h-[4px] rounded-full transition-all duration-300 ${
                                        activePage === index
                                            ? "w-8 bg-[#e85d3a]"
                                            : "w-4 bg-white/25 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </section>

            {/* TRAINING PHILOSOPHY */}
            <section className="border-y border-white/10 bg-[#111111]">
                <div className="mx-auto w-full max-w-[110rem] px-6 py-7 sm:px-10 md:py-9 lg:px-16 xl:px-[7%]">
                    <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Our Coaching Philosophy
                                </span>
                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[26px] leading-[0.88] tracking-wide sm:text-[30px] md:text-[36px] lg:text-[40px]">
                                GREAT TRAINING <span className="block text-[#e85d3a]">STARTS WITH PEOPLE.</span>
                            </h2>

                            <p className="mt-4 max-w-[520px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px]">
                                The right coach does more than count your reps. They understand where you are, what you want to achieve and how to help you keep progressing.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {[
                                { number: "01", title: "PERSONAL ATTENTION", text: "Get guidance based on your fitness level, movement and individual goals." },
                                { number: "02", title: "PROVEN EXPERIENCE", text: "Learn from coaches with years of practical experience across different training styles." },
                                { number: "03", title: "BETTER TECHNIQUE", text: "Improve form, movement quality and confidence with proper coaching." },
                                { number: "04", title: "CONSISTENT SUPPORT", text: "Stay accountable with a team that keeps you motivated throughout your journey." },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="rounded-lg border border-white/10 bg-[#151515] p-5 transition-all duration-300 hover:border-[#e85d3a]/50 hover:-translate-y-0.5"
                                >
                                    <span className="font-['Bebas_Neue'] text-[18px] text-[#e85d3a]">
                                        {item.number}
                                    </span>

                                    <h3 className="mt-3 font-['Bebas_Neue'] text-[19px] leading-none tracking-wide">
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

            {/* CTA */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:px-12 md:py-10 lg:px-16">

                        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">
                                <p className="mb-3 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[12px]">
                                    Find Your Coach
                                </p>

                                <h2 className="font-['Bebas_Neue'] text-[26px] leading-[0.88] tracking-wide sm:text-[30px] md:text-[36px] lg:text-[40px]">
                                    READY TO TRAIN <span className="text-[#e85d3a]">SMARTER?</span>
                                </h2>

                                <p className="mt-3 max-w-[560px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px]">
                                    Not sure which trainer or program is right for you? Talk to our team and find the right starting point for your fitness goals.
                                </p>
                            </div>

                            <Link
                                to="/contact"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{ clipPath: "polygon(7% 0, 100% 0, 93% 100%, 0 100%)" }}
                            >
                                Meet Your Coach
                                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default TrainerPage;
