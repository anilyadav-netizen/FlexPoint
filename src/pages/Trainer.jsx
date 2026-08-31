import React, { useEffect, useState } from "react";
import {
    Dumbbell,
    HeartPulse,
    Users,
    Award,
    PersonStanding,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../redux/Slicer/trainerSlice";

const iconMap = {
    Dumbbell,
    HeartPulse,
    Users,
    Award,
    PersonStanding,
};

const Trainer = () => {
    const dispatch = useDispatch();

    const { trainers, loading, error } = useSelector(
        (state) => state.trainer
    );

    const [activePage, setActivePage] = useState(0);

    // ============================
    // GET ACTIVE TRAINERS
    // ============================
    useEffect(() => {
        dispatch(getTrainers(true));
    }, [dispatch]);

    // ============================
    // PAGINATION
    // ============================
    const trainersPerPage = 6;

    const totalPages = Math.ceil(
        trainers.length / trainersPerPage
    );

    const currentTrainers = trainers.slice(
        activePage * trainersPerPage,
        activePage * trainersPerPage + trainersPerPage
    );

    // ============================
    // RESET PAGE IF DATA CHANGES
    // ============================
    useEffect(() => {
        if (
            totalPages > 0 &&
            activePage >= totalPages
        ) {
            setActivePage(0);
        }
    }, [totalPages, activePage]);

    return (
        <section
            id="trainers"
            className="w-full overflow-hidden border-t border-white/10 bg-[#0d0d0d] py-2 text-white md:py-5 lg:py-6"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= HEADER ================= */}

                <div className="flex items-center justify-between">
                    <h2 className="font-['Bebas_Neue'] text-[20px] leading-none tracking-[0.02em] text-white md:text-[35px] lg:text-[40px]">
                        MEET OUR{" "}
                        <span className="text-[#e85d3a]">
                            EXPERT TRAINERS
                        </span>
                    </h2>
                </div>

                {/* ================= LOADING ================= */}

                {loading && (
                    <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[205px] animate-pulse bg-[#151515] border border-white/10 sm:h-[225px] md:h-[240px] lg:h-[205px] xl:h-[220px]"
                            />
                        ))}
                    </div>
                )}

                {/* ================= ERROR ================= */}

                {!loading && error && (
                    <div className="mt-8 py-10 text-center">
                        <p className="font-['Barlow'] text-sm text-white/50">
                            Unable to load trainers.
                        </p>
                    </div>
                )}

                {/* ================= NO TRAINERS ================= */}

                {!loading &&
                    !error &&
                    trainers.length === 0 && (
                        <div className="mt-8 py-10 text-center">
                            <p className="font-['Barlow'] text-sm text-white/50">
                                No trainers available at the moment.
                            </p>
                        </div>
                    )}

                {/* ================= TRAINERS ================= */}

                {!loading &&
                    !error &&
                    currentTrainers.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:mt-4 lg:grid-cols-6 lg:gap-4">

                            {currentTrainers.map((trainer) => {
                                const TrainerIcon =
                                    iconMap[trainer.icon] || Dumbbell;

                                return (
                                    <article
                                        key={trainer._id}
                                        className="group relative h-[205px] overflow-hidden rounded-md border border-white/15 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] sm:h-[225px] md:h-[240px] lg:h-[205px] xl:h-[220px]"
                                    >

                                        {/* ================= IMAGE ================= */}

                                        <img
                                            src={trainer.image}
                                            alt={`${trainer.name} - ${trainer.role}`}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover object-top grayscale-[10%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                        />

                                        {/* ================= OVERLAY ================= */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                                        {/* ================= ORANGE GLOW ================= */}

                                        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#e85d3a]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* ================= TRAINER ICON ================= */}

                                        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center text-[#e85d3a]">
                                            <TrainerIcon
                                                size={19}
                                                strokeWidth={1.5}
                                            />
                                        </div>

                                        {/* ================= CONTENT ================= */}

                                        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 text-center sm:p-3.5">

                                            <h3 className=" text-[17px] leading-none tracking-wide text-white md:text-[19px] lg:text-[18px] xl:text-[20px]">
                                                {trainer.name}
                                            </h3>

                                            <p className="mt-1 text-[12px] font-medium text-white/65 md:text-[14px]">
                                                {trainer.role}
                                            </p>

                                            <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/45 md:text-[12px]">
                                                {trainer.specialty}
                                            </p>

                                            {/* Orange line */}

                                            <div className="mx-auto mt-2 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-10" />

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    )}

                {/* ================= PAGINATION ================= */}

                {!loading &&
                    !error &&
                    totalPages > 1 && (
                        <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5">

                            {Array.from({
                                length: totalPages,
                            }).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setActivePage(index)
                                    }
                                    aria-label={`Go to trainer page ${index + 1}`}
                                    className={`h-[4px] transition-all duration-300 ${activePage === index
                                        ? "w-7 bg-[#e85d3a]"
                                        : "w-4 bg-white/25 hover:bg-white/50"
                                        }`}
                                />
                            ))}

                        </div>
                    )}

            </div>
        </section>
    );
};

export default Trainer;