import React, { useState } from "react";
import {
    ArrowRight,
    Award,
    Dumbbell,
    HeartPulse,
} from "lucide-react";

const Trainer = () => {
    const [activePage, setActivePage] = useState(0);

    const trainers = [
        {
            name: "RAHUL SHARMA",
            role: "Strength Coach",
            image:
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=85",
        },
        {
            name: "ANANYA GUPTA",
            role: "Yoga Instructor",
            image:
                "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=85",
        },
        {
            name: "VIKRAM SINGH",
            role: "HIIT Specialist",
            image:
                "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=85",
        },
        {
            name: "NEHA VERMA",
            role: "Nutrition Coach",
            image:
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=85",
        },
        {
            name: "ARJUN MEHTA",
            role: "Functional Coach",
            image:
                "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=700&q=85",
        },
        {
            name: "POOJA PATEL",
            role: "Pilates Coach",
            image:
                "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=85",
        },
    ];

    const trainersPerPage = 6;
    const totalPages = Math.ceil(trainers.length / trainersPerPage);

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

                {/* ================= TRAINERS ================= */}

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:mt-4 lg:grid-cols-6 lg:gap-4">

                    {trainers
                        .slice(
                            activePage * trainersPerPage,
                            activePage * trainersPerPage + trainersPerPage
                        )
                        .map((trainer) => (
                            <article
                                key={trainer.name}
                                className="group relative h-[205px] overflow-hidden border border-white/15 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] sm:h-[225px] md:h-[240px] lg:h-[205px] xl:h-[220px]"
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

                                {/* Orange glow */}

                                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#e85d3a]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* ================= TRAINER ICON ================= */}

                                <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center text-[#e85d3a]">

                                    <Dumbbell
                                        size={19}
                                        strokeWidth={1.5}
                                    />

                                </div>

                                {/* ================= CONTENT ================= */}

                                <div className="absolute bottom-0 left-0 right-0 z-10 p-3 text-center sm:p-3.5">

                                    <h3 className="font-['Bebas_Neue'] text-[17px] leading-none tracking-wide text-white sm:text-[19px] lg:text-[18px] xl:text-[20px]">
                                        {trainer.name}
                                    </h3>

                                    <p className="mt-1 font-['Barlow'] text-[8px] font-medium text-white/65 sm:text-[9px]">
                                        {trainer.role}
                                    </p>

                                    {/* Orange line */}

                                    <div className="mx-auto mt-2 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-10" />

                                </div>

                            </article>
                        ))}

                </div>

                {/* ================= PAGINATION ================= */}

                <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5">

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActivePage(index)}
                            aria-label={`Go to trainer page ${index + 1}`}
                            className={`h-[4px] transition-all duration-300 ${activePage === index
                                    ? "w-7 bg-[#e85d3a]"
                                    : "w-4 bg-white/25 hover:bg-white/50"
                                }`}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Trainer;