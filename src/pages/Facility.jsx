import React from "react";

import image1 from "../assets/Images/image1.jpg";
import image2 from "../assets/Images/image2.jpg";
import image3 from "../assets/Images/image3.jpg";
import image4 from "../assets/Images/image4.jpg";
import image5 from "../assets/Images/image5.jpg";
import image6 from "../assets/Images/image6.jpg";

const Facility = () => {
    const facilities = [
        {
            title: "SPACIOUS GYM",
            image: image1,
        },
        {
            title: "CARDIO ZONE",
            image: image2,
        },
        {
            title: "YOGA STUDIO",
            image: image3,
        },
        {
            title: "FUNCTIONAL AREA",
            image: image4,
        },
        {
            title: "LOCKER ROOMS",
            image: image5,
        },
        {
            title: "NUTRITION BAR",
            image: image6,
        },
    ];

    return (
        <section
            id="facilities"
            className="w-full overflow-hidden border-t border-white/10 bg-[#0d0d0d] py-2 text-white md:py-4 lg:py-6"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= HEADING ================= */}

                <div className="mb-4 flex items-center sm:mb-5">

                    <h2 className="whitespace-nowrap font-['Bebas_Neue'] text-[25px] leading-none tracking-[0.02em] text-white sm:text-[29px] md:text-[33px] lg:text-[37px]">
                        PREMIUM{" "}
                        <span className="text-[#e85d3a]">
                            FACILITIES
                        </span>
                    </h2>

                </div>

                {/* ================= FACILITIES GRID ================= */}

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-2.5 xl:gap-3">

                    {facilities.map((facility) => (
                        <article
                            key={facility.title}
                            className="group relative h-[130px] overflow-hidden border border-white/15 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 sm:h-[155px] md:h-[165px] lg:h-[135px] xl:h-[145px]"
                        >

                            {/* ================= IMAGE ================= */}

                            <img
                                src={facility.image}
                                alt={facility.title}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* ================= OVERLAY ================= */}

                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/25 to-black/5" />

                            {/* Hover orange overlay */}

                            <div className="absolute inset-0 bg-[#e85d3a]/0 transition-colors duration-300 group-hover:bg-[#e85d3a]/10" />

                            {/* ================= TITLE ================= */}

                            <div className="absolute bottom-0 left-0 right-0 z-10 px-2.5 pb-3 text-center sm:px-3 sm:pb-3.5">

                                <h3 className="font-['Bebas_Neue'] text-[14px] leading-none tracking-wide text-white sm:text-[16px] md:text-[17px] lg:text-[14px] xl:text-[16px]">
                                    {facility.title}
                                </h3>

                            </div>

                            {/* Orange bottom line */}

                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Facility;